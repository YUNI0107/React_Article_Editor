import { useState, useRef, useContext, useEffect } from 'react'
import classNames from 'classnames'
import { useDrag, useDrop } from 'react-dnd'
import type { Identifier, XYCoord } from 'dnd-core'

// components
import EachContainer from './EachContainer'

// types
import { IComponentSchema } from '../../../types/editor'
import { ISchemaDragItem } from '../../../types/layout'

// context
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'
import { SchemaContext } from '../../../contexts/SchemaContextSection'

// utils
import getElementPosition from '../../../utils/getElementPosition'

// hooks
import { useWindowScroll } from '../../../hooks/useWindowScroll'

/**
 *A Component contain focus & pop up feature
 *
 * There are 2 conditions
 *
 * Element focused
 * 1. Editor button will not disappear & isButtonShow should be true
 * 2. Editor button will not hidden when mouseLeave the element
 * 3. Editor button click popup toggle
 * 4. isFocused should be true
 *
 * Element unfocused
 * 1. Editor button show when mouseEnter the element
 * 2. Editor button will hidden when mouseLeave the element
 * 3. isFocused & isPopupShow should be false
 *
 */

function FocusElement({
  schema,
  schemaIndex,
  id,
  ...props
}: {
  schema: IComponentSchema
  schemaIndex: number
  id: string
  setIsModalShow?: (isShow: boolean, index?: number) => void
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [isButtonShow, setIsButtonShow] = useState(false)
  const [isFirstClickButton, setIsFirstClickButton] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)
  const focusElement = useRef<HTMLDivElement | null>(null)
  const {
    popupPosition,
    focusElementSchema,
    setFocusElementSchema,
    setPopupPosition,
    isPopupShow,
    setIsPopupShow,
    previewMode,
    setFocusElementHeight,
    isEditorMode,
    popupState,
    setPopupState,
    setPopupChildrenIndex,
    popupChildrenIndex,
  } = useContext(EditorInfoContext)
  const { dragMoveSchema: moveSchema } = useContext(SchemaContext)

  const [{ handlerId }, drop] = useDrop<ISchemaDragItem, void, { handlerId: Identifier | null }>({
    accept: 'schema',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: ISchemaDragItem, monitor) {
      if (!dropRef.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = schemaIndex

      // Don't replace items with themselves
      if (dragIndex === hoverIndex || hoverIndex === undefined) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveSchema(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'schema',
    item: () => {
      return { id, index: schemaIndex }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isFocused,
  })

  useWindowScroll(isDragging, previewMode)

  // operation
  const popupShowHandler = (index: number | null) => {
    if (popupState === 'schema' || popupState === null) {
      if (isFirstClickButton) {
        setIsPopupShow(isFocused)
        setIsFirstClickButton(false)
      } else {
        if (
          (index === null && !popupChildrenIndex) ||
          index === popupChildrenIndex ||
          (index !== popupChildrenIndex && !isPopupShow)
        ) {
          setIsPopupShow(!isPopupShow && isFocused)
        }
      }
    }

    setPopupChildrenIndex(index !== undefined ? index : null)

    setPopupState('schema')
  }

  const elementBlur = () => {
    setIsFocused(false)
    setIsButtonShow(false)
  }

  const focusEventHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isFocused && focusElement.current) {
      setIsFocused(true)
      const elementPosition = getElementPosition(focusElement.current || null)

      setFocusElementSchema(schema)
      setPopupPosition(elementPosition)

      const target = event.target as HTMLDivElement
      const parentTarget = target.parentNode as HTMLDivElement
      if (target.dataset?.type === 'popupEdit' || parentTarget.dataset?.type === 'popupEdit') {
        setIsFirstClickButton(true)
      }
    }

    updateFocusElementHeight()
  }

  const updateFocusElementHeight = () => {
    const height = dropRef.current?.getBoundingClientRect().height || 0
    setFocusElementHeight(height)
  }

  const elementMouseLeave = () => {
    if (!isFocused) setIsButtonShow(false)
  }

  const clearFocused = () => {
    // context
    setFocusElementSchema(null)
    setIsPopupShow(false)
    // states
    setIsFocused(false)
    setIsButtonShow(false)
    setIsFirstClickButton(false)
  }

  useEffect(() => {
    // Check whether the current focusElementSchema uuid is same to this component or not
    if (focusElementSchema?.uuid !== schema.uuid) {
      elementBlur()
    }
  }, [focusElementSchema])

  useEffect(() => {
    setFocusElementHeight(0)
    clearFocused()
  }, [previewMode])

  drag(drop(dropRef))

  return (
    <div
      ref={dropRef}
      // Because Popup is not inside of the component, so use click to imitate blur event
      onClickCapture={focusEventHandler}
      onMouseEnter={() => setIsButtonShow(true)}
      onMouseLeave={elementMouseLeave}
      className={classNames('relative mb-2', { 'cursor-move': isFocused })}
      style={{ opacity: isDragging ? 0 : 1 }}
      data-handler-id={handlerId}
    >
      {/* element */}
      <div
        ref={focusElement}
        className={classNames('relative', { 'border-4 border-secondary-blue-300': isFocused })}
      >
        <EachContainer
          schema={schema}
          popupShowHandler={popupShowHandler}
          isButtonShow={isButtonShow}
          distance={popupPosition}
          isEditorMode={isEditorMode}
          {...props}
        />
      </div>
    </div>
  )
}

export default FocusElement

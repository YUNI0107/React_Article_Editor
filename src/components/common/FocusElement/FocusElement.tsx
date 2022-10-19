import { useState, useRef, useContext, useEffect } from 'react'
import classNames from 'classnames'

// components
import SingleEachContainer from './SingleEachContainer'

// types
import { IComponentSchema } from '../../../types/editor'

// context
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

// utils
import getElementPosition from '../../../utils/getElementPosition'

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

function FocusElement({ schema }: { schema: IComponentSchema }) {
  const [isFocused, setIsFocused] = useState(false)
  const [isButtonShow, setIsButtonShow] = useState(false)
  const [isFirstClickButton, setIsFirstClickButton] = useState(false)
  const focusElement = useRef<HTMLDivElement | null>(null)
  const {
    distance,
    focusElementSchema,
    setFocusElementSchema,
    setElementPosition,
    isPopupShow,
    setIsPopupShow,
    previewMode,
  } = useContext(EditorInfoContext)

  // operation
  const PopupShowHandler = () => {
    if (isFirstClickButton) {
      setIsPopupShow(isFocused)
      setIsFirstClickButton(false)
    } else {
      setIsPopupShow(!isPopupShow && isFocused)
    }
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
      setElementPosition(elementPosition)

      const target = event.target as HTMLDivElement
      if (target.dataset?.type === 'popupEdit') {
        setIsFirstClickButton(true)
      }
    }
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
    clearFocused()
  }, [previewMode])

  return (
    <div
      // Because Popup is not inside of the component, so use click to imitate blue event
      onClickCapture={focusEventHandler}
      onMouseEnter={() => setIsButtonShow(true)}
      onMouseLeave={elementMouseLeave}
      className="relative"
    >
      {/* element */}
      <div
        ref={focusElement}
        className={classNames('relative', { 'border-4 border-secondary-blue-300': isFocused })}
      >
        {(schema.groupType === 'button' ||
          schema.groupType === 'banner' ||
          schema.groupType === 'gallery') && (
          <SingleEachContainer
            schema={schema}
            PopupShowHandler={PopupShowHandler}
            isButtonShow={isButtonShow}
            distance={distance}
          />
        )}
      </div>
    </div>
  )
}

export default FocusElement

import { useState, useRef, useContext, useEffect } from 'react'
import classNames from 'classnames'

// components
import SingleEachContainer from './SingleEachContainer'

// types
import { IComponentSchema } from '../../../types/editor'

// context
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'
import { SchemaContext } from '../../../contexts/SchemaContextSection'

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
  const focusElement = useRef<HTMLDivElement | null>(null)
  const {
    distance,
    focusElementSchema,
    setFocusElementSchema,
    setElementPosition,
    isPopupShow,
    setIsPopupShow,
  } = useContext(EditorInfoContext)
  const { moveSchema, deleteSchema } = useContext(SchemaContext)

  // operation
  const PopupShowHandler = () => {
    if (!isPopupShow && isFocused) {
      setIsPopupShow(true)
    } else {
      setIsPopupShow(false)
    }
  }

  const elementBlur = () => {
    setIsPopupShow(false)
    setIsFocused(false)
    setIsButtonShow(false)
  }
  const focusEventHandler = () => {
    if (!isFocused && focusElement.current) {
      setIsFocused(true)
      const elementPosition = getElementPosition(focusElement.current || null)

      setFocusElementSchema(schema)
      setElementPosition(elementPosition)
    }
  }

  const elementMouseLeave = () => {
    if (!isFocused) setIsButtonShow(false)
  }

  useEffect(() => {
    // Check whether the current focusElementSchema uuid is same to this component or not
    if (focusElementSchema?.uuid !== schema.uuid) {
      elementBlur()
    }
  }, [focusElementSchema])

  return (
    <div
      // Because Popup is not inside of the component, so use click to imitate blue event
      onClickCapture={focusEventHandler}
      onMouseEnter={() => setIsButtonShow(true)}
      onMouseLeave={elementMouseLeave}
      tabIndex={-1}
      className="relative"
    >
      {/* element */}
      <div
        ref={focusElement}
        className={classNames('relative', { 'ring-4 ring-secondary-blue-300-blue': isFocused })}
      >
        {/* button controls */}
        <div
          className={classNames('absolute right-0 bottom-0 translate-x-[calc(100%+10px)] z-40 ', {
            hidden: !isFocused,
          })}
        >
          <button
            className="rounded-button bg-main-blue mb-2"
            onClick={() => moveSchema(schema.uuid, 'up')}
          >
            <i className="ri-arrow-up-s-line text-3xl text-white"></i>
          </button>
          <button
            className="rounded-button bg-main-blue mb-2"
            onClick={() => moveSchema(schema.uuid, 'down')}
          >
            <i className="ri-arrow-down-s-line text-3xl text-white"></i>
          </button>
          <button
            className="rounded-button bg-main-yellow"
            onClick={() => deleteSchema(schema.uuid)}
          >
            <i className="ri-close-line text-3xl text-white"></i>
          </button>
        </div>

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

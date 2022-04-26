import { useState, useRef, useContext, useEffect } from 'react'
import classNames from 'classnames'

// components
import SingleEachContainer from './SingleEachContainer'

// types
import { IComponentSchema } from '../../../types/editor'
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

function FocusElement({ scheme }: { scheme: IComponentSchema }) {
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

  // operation
  const PopupShowHandler = () => {
    if (!isPopupShow && isFocused) {
      setIsPopupShow(true)
    } else {
      setIsPopupShow(false)
    }
  }

  // const elementBlur = (event: FocusEvent<HTMLDivElement, Element>) => {
  //   // FocusEvent.relatedTarget : https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget
  //   // Reference : https://stackoverflow.com/questions/12092261/prevent-firing-the-blur-event-if-any-one-of-its-children-receives-focus

  //   console.log(event)

  //   if (!event.currentTarget.contains(event.relatedTarget)) {
  //     // Did the focus element contains in whole container
  //     // target : The EventTarget losing focus
  //     // relatedTarget : The EventTarget receiving focus
  //     // setIsPopupShow(false)
  //     // setIsFocused(false)
  //     // setIsButtonShow(false)
  //   }
  // }

  const elementBlur = () => {
    setIsPopupShow(false)
    setIsFocused(false)
    setIsButtonShow(false)
  }
  const focusEventHandler = () => {
    if (!isFocused && focusElement.current) {
      setIsFocused(true)
      const elementPosition = getElementPosition(focusElement.current || null)

      setFocusElementSchema(scheme)
      setElementPosition(elementPosition)
    }
  }

  const elementMouseLeave = () => {
    if (!isFocused) setIsButtonShow(false)
  }

  useEffect(() => {
    // Check whether the current focusElementSchema uuid is same to this component or not
    if (focusElementSchema?.uuid !== scheme.uuid) {
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
        className={classNames({ 'ring-4 ring-secondary-blue-300-blue': isFocused })}
      >
        {(scheme.groupType === 'button' ||
          scheme.groupType === 'banner' ||
          scheme.groupType === 'gallery') && (
          <SingleEachContainer
            scheme={scheme}
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

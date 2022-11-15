import { useCallback, useEffect, useContext, useState, useRef } from 'react'
import classNames from 'classnames'
import { useDrag, useDrop, XYCoord, useDragDropManager } from 'react-dnd'

// components
import Ruler from '../../../../components/layout/Ruler'
import ControllerContainer from '../../../../components/common/ControllerContainer'
import PopUp from '../../../../components/common/Popup'
import EditorSection from '../../../../components/layout/EditorSection'
import BackDevice from '../BackDevice'
import SimpleTextEditor from '../../../../components/layout/SimpleTextEditor'

// types
import { IPopupDragItem } from '../../../../types/layout'

// contexts
import { EditorInfoContext } from '../../../../contexts/EditorInfoContextSection'

// hooks
import { useScroll } from '../../../../hooks/useScroll'
import TextEditorContainer from '../../../../components/common/TextEditorContainer'

function MainEditorContainer() {
  const { previewMode, focusElementSchema, distance, isPopupShow } = useContext(EditorInfoContext)
  const { props: focusProps, uuid: focusUUid, groupType: focusGroupType } = focusElementSchema || {}
  const [popupDistance, setPopupDistance] = useState(distance)
  const { top, left } = popupDistance
  const scrollRef = useRef<HTMLDivElement | null>(null)
  // For Drag & Drop
  const { updatePosition } = useScroll(scrollRef)

  // operations
  const movePopup = useCallback(
    (top: number, left: number) => {
      setPopupDistance({ top, left })
    },
    [setPopupDistance]
  )

  // effects
  useEffect(() => {
    setPopupDistance(distance)
  }, [distance])

  const [, drop] = useDrop(
    () => ({
      accept: 'popup',
      drop(item: IPopupDragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)
        movePopup(top, left)
        return undefined
      },
    }),
    [movePopup]
  )

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'popup',
      item: { left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [left, top]
  )

  const scrollDragDropManager = useDragDropManager()
  const monitor = scrollDragDropManager.getMonitor()

  useEffect(() => {
    if (previewMode !== 'lg') {
      const unsubscribe = monitor.subscribeToOffsetChange(() => {
        const offset = monitor.getSourceClientOffset()?.y as number

        updatePosition({ position: offset, isScrollAllowed: true })
      })

      return unsubscribe
    }
  }, [monitor, updatePosition, previewMode])

  return (
    <>
      <div className="relative flex-1 flex flex-col items-center" ref={drop}>
        {/* top-ruler */}
        <Ruler />

        {/* bottom-preview */}
        <div
          className={classNames(
            'h-full border-x-[2px] border-dashed border-main-gray-300 transition-all duration-700 flex flex-col justify-center',
            {
              'w-mobile py-20': previewMode === 'sm',
              'w-tablet py-16': previewMode === 'md',
              'w-desktop': previewMode === 'lg',
            }
          )}
        >
          <div
            className={classNames('relative h-full', {
              'min-h-mobile': previewMode === 'sm',
              'min-h-tablet': previewMode === 'md',
            })}
          >
            <BackDevice />
          </div>
        </div>

        <div
          className={classNames('w-full', {
            'absolute top-0 left-1/2 z-10 -translate-x-1/2 py-20': previewMode === 'sm',
            'absolute top-0 left-1/2 z-10 -translate-x-1/2 py-16': previewMode === 'md',
          })}
        >
          <div
            className={classNames(
              'absolute top-0 left-1/2 -translate-x-1/2 bg-white h-full min-h-full w-desktop border-x-[2px] border-dashed border-main-gray-300',
              { hidden: previewMode !== 'lg' }
            )}
          ></div>

          <div
            ref={scrollRef}
            className={classNames('w-full overflow-y-auto', {
              'h-mobile': previewMode === 'sm',
              'h-tablet': previewMode === 'md',
              'h-full': previewMode === 'lg',
            })}
          >
            <div className="h-full w-full flex flex-col justify-start items-center py-4">
              <EditorSection />
            </div>
          </div>
        </div>
      </div>

      {/* controller-editor */}
      <PopUp
        isPopupShow={isPopupShow}
        popupDistance={popupDistance}
        isDragging={isDragging}
        preview={preview}
      >
        <ControllerContainer
          props={focusProps}
          uuid={focusUUid}
          groupName={focusGroupType}
          drag={drag}
        />

        <TextEditorContainer
        // props={focusProps}
        // uuid={focusUUid}
        // drag={drag}
        />
      </PopUp>

      {/* simple-text-editor */}
      <SimpleTextEditor />
    </>
  )
}

export default MainEditorContainer

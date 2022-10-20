import { useCallback, useEffect } from 'react'
import classNames from 'classnames'
import { useDrag, useDrop, XYCoord } from 'react-dnd'

// components
import Ruler from '../../../../components/layout/Ruler'
import ControllerContainer from '../../../../components/common/ControllerContainer'

// types
import EditorSection from '../../../../components/layout/EditorSection'
import BackDevice from '../BackDevice'
import PopUp from '../../../../components/common/Popup'

// contexts
import { useContext, useState } from 'react'
import { EditorInfoContext } from '../../../../contexts/EditorInfoContextSection'

// types
interface DragItem {
  type: string
  top: number
  left: number
}

function MainEditorContainer() {
  const { previewMode, focusElementSchema, distance } = useContext(EditorInfoContext)
  const {
    props: focusProps,
    controls: focusControls,
    uuid: focusUUid,
    groupType: focusGroupType,
  } = focusElementSchema || {}
  const [popupDistance, setPopupDistance] = useState(distance)
  const { top, left } = popupDistance

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
      drop(item: DragItem, monitor) {
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
          className={classNames('w-full full', {
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
            className={classNames('w-full h-full overflow-y-auto ', {
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

      <PopUp popupDistance={popupDistance} isDragging={isDragging} preview={preview}>
        <ControllerContainer
          props={focusProps}
          controls={focusControls}
          uuid={focusUUid}
          groupName={focusGroupType}
          drag={drag}
        />
      </PopUp>
    </>
  )
}

export default MainEditorContainer

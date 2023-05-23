import { useCallback, useEffect, useContext, useState, useRef, useMemo } from 'react'
import classNames from 'classnames'
import { useDrag, useDrop, XYCoord, useDragDropManager } from 'react-dnd'

// components
import Ruler from '../../../../components/layout/Ruler'
import ControllerContainer from '../../../../components/common/ControllerContainer'
import PopUp from '../../../../components/common/Popup'
import EditorSection from '../../../../components/layout/EditorSection'
import BackDevice from '../BackDevice'
import TextEditorContainer from '../../../../components/common/TextEditorContainer'

// types
import { IPopupDragItem } from '../../../../types/layout'

// contexts
import TextPopupContextSection from '../../../../contexts/TextPopupContextSection'
import { EditorInfoContext } from '../../../../contexts/EditorInfoContextSection'

// hooks
import { useScroll } from '../../../../hooks/useScroll'

// constants
import { groupTypeEnum } from '../../../../constants/enums/editorEnums'
import ModalBackground from '../../../../components/common/ModalBackground'
import GalleryControlModal from '../../../../components/controls/GalleryControlModal'

function EditorContainer({
  editorSection,
}: {
  editorSection: React.MutableRefObject<HTMLDivElement>
}) {
  const {
    previewMode,
    focusElementSchema,
    popupPosition,
    isPopupShow,
    popupState,
    popupChildrenIndex,
    isModalShow,
    setIsModalShow,
  } = useContext(EditorInfoContext)

  const { props: focusProps, uuid: focusUUid, groupType: focusGroupType } = focusElementSchema || {}

  const focusChildren =
    focusElementSchema && 'children' in focusElementSchema ? focusElementSchema.children : null
  const childUuid =
    popupChildrenIndex !== null && focusChildren
      ? focusChildren[popupChildrenIndex].uuid
      : undefined
  const groupName =
    popupChildrenIndex !== null && focusChildren
      ? focusChildren[popupChildrenIndex].groupType
      : focusGroupType

  const [popupDragDistance, setPopupDragDistance] = useState(popupPosition)
  const { top, left } = popupDragDistance
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // For Drag & Drop
  const { updatePosition } = useScroll(scrollRef)

  // memos
  const controllerName = useMemo(() => {
    const count = popupChildrenIndex !== null ? popupChildrenIndex + 1 : ''

    switch (groupName) {
      case groupTypeEnum.banner:
        return '帶狀圖片'
      case groupTypeEnum.button:
        return '按鈕設定'
      case groupTypeEnum.images:
        return `圖片群組`
      case groupTypeEnum.image:
        return `圖片設定 - ${count}`
      case groupTypeEnum.paragraph:
        return '文字段落設定'
      default:
        return '設定'
    }
  }, [groupName, popupChildrenIndex])

  // operations
  const movePopup = useCallback(
    (top: number, left: number) => {
      setPopupDragDistance({ top, left })
    },
    [setPopupDragDistance]
  )

  const handleModalClose = () => {
    setIsModalShow(false)
  }

  // effects
  useEffect(() => {
    setPopupDragDistance(popupPosition)
  }, [popupPosition])

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
    <TextPopupContextSection>
      <div className="w-full h-full overflow-y-hidden relative">
        <div
          className="relative flex-1 flex flex-col items-center min-h-[calc(100vh-80px)]"
          ref={drop}
        >
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
              className={classNames('w-full overflow-y-auto hide-scrollbar', {
                'h-mobile': previewMode === 'sm',
                'h-tablet': previewMode === 'md',
                'h-full': previewMode === 'lg',
              })}
            >
              <div
                className="h-full w-full flex flex-col justify-start items-center py-4 px-2"
                ref={editorSection}
              >
                <EditorSection />
              </div>
            </div>
          </div>
        </div>

        {/* controller-editor */}
        <PopUp
          isPopupShow={isPopupShow}
          distance={popupDragDistance}
          isDragging={isDragging}
          preview={preview}
        >
          {popupState === 'schema' && (
            <ControllerContainer
              focusProps={focusProps}
              uuid={focusUUid}
              childUuid={childUuid}
              controllerName={controllerName}
              groupName={groupName}
              drag={drag}
            />
          )}

          {popupState === 'text' && <TextEditorContainer drag={drag} />}
        </PopUp>

        <ModalBackground isModalShow={isModalShow} setIsModalShow={setIsModalShow}>
          <GalleryControlModal handleModalClose={handleModalClose} />
        </ModalBackground>
      </div>
    </TextPopupContextSection>
  )
}

export default EditorContainer

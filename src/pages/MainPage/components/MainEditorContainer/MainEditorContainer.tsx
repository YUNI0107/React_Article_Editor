import classNames from 'classnames'

// components
import Ruler from '../../../../components/layout/Ruler'
import ControllerContainer from '../../../../components/common/ControllerContainer'

// types
import EditorSection from '../../../../components/layout/EditorSection'
import BackDevice from '../BackDevice'
import PopUp from '../../../../components/common/Popup'

// contexts
import { useContext } from 'react'
import { EditorInfoContext } from '../../../../contexts/EditorInfoContextSection'

function MainEditorContainer() {
  const { previewMode, focusElementSchema } = useContext(EditorInfoContext)
  const {
    props: focusProps,
    controls: focusControls,
    uuid: focusUUid,
    groupType: focusGroupType,
  } = focusElementSchema || {}

  return (
    <>
      <div className="relative flex-1 flex flex-col items-center">
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

      <PopUp>
        <ControllerContainer
          props={focusProps}
          controls={focusControls}
          uuid={focusUUid}
          groupName={focusGroupType}
        />
      </PopUp>
    </>
  )
}

export default MainEditorContainer

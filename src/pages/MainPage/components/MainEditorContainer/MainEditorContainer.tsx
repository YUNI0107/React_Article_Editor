import classNames from 'classnames'

// components
import Ruler from '../../../../components/layout/Ruler'
import ControllerContainer from '../../../../components/common/ControllerContainer'

// types
import EditorSection from '../../../../components/layout/EditorSection'
import BackDevice from '../BackDevice'

// contexts
import { useContext } from 'react'
import { EditorInfoContext } from '../../../../contexts/EditorInfoContextSection'
import PopUp from '../../../../components/common/Popup'

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
              'w-mobile py-16': previewMode === 'sm',
              'w-tablet py-16': previewMode === 'md',
              'w-desktop': previewMode === 'lg',
            }
          )}
        >
          <div
            className={classNames('relative h-full', {
              'max-h-mobile': previewMode === 'sm',
              'max-h-tablet': previewMode === 'md',
              'h-full': previewMode === 'lg',
            })}
          >
            <div
              className={classNames('relative h-full w-full bg-white z-20 overflow-y-auto', {
                'p-4': previewMode === 'md' || previewMode === 'sm',
                'p-6': previewMode === 'lg',
              })}
            >
              <EditorSection />
            </div>
            <BackDevice />
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

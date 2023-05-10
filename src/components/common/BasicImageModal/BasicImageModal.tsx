import { useContext } from 'react'
import DemoImage from '../../../assets/default/default_1.jpg'

// types
import { PreviewModesType } from '../../../types/layout'

// context
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'
import classNames from 'classnames'

const editorClassNames: { [key in PreviewModesType]: { modal: string; closeButton: string } } = {
  lg: {
    modal: 'w-desktop',
    closeButton: 'text-5xl',
  },
  md: {
    modal: 'w-tablet',
    closeButton: 'text-4xl',
  },
  sm: {
    modal: 'w-mobile',
    closeButton: 'text-3xl',
  },
}
const realTimeClassNames = {
  modal: '',
  closeButton: '',
}

function BasicImageModal({
  imgPath,
  handleModalClose,
}: {
  imgPath?: string
  handleModalClose: () => void
}) {
  const { previewMode, isEditorMode } = useContext(EditorInfoContext)

  return (
    <div
      className={classNames(
        isEditorMode ? editorClassNames[previewMode].modal : realTimeClassNames.modal,
        'relative shadow-md border-4 border-white bg-white/25'
      )}
    >
      <div className="absolute right-3 top-3 cursor-pointer" onClick={handleModalClose}>
        <i
          className={classNames(
            'ri-close-fill text-white',
            editorClassNames[previewMode].closeButton
          )}
        ></i>
      </div>
      <img src={imgPath || DemoImage} className="w-full" />
    </div>
  )
}

export default BasicImageModal

import classNames from 'classnames'
import { useContext } from 'react'
import { Editor } from '@tiptap/react'

// contexts
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection/EditorInfoContextSection'

// types
import { IDistance } from '../../../contexts/EditorInfoContextSection/EditorInfoContextSection'

function SimpleTextEditor({ distance, editor }: { distance: IDistance; editor: Editor | null }) {
  const { top, left } = distance
  const { isPopupShow, setIsPopupShow, popupState, setPopupState } = useContext(EditorInfoContext)

  // operations
  const handleSettingClick = () => {
    if (popupState === 'text' || popupState === null) {
      setIsPopupShow(!isPopupShow)
    }

    setPopupState('text')
  }

  if (!editor) return null

  return (
    <div
      className="absolute z-20 bg-white rounded-[30px] overflow-hidden basic-shadow px-6 py-2 flex items-center -translate-y-full"
      style={{ top: `${top - 10}px`, left: `${left}px` }}
    >
      <button
        className={classNames(
          'basic-text-button mr-2',
          editor.isActive('bold') ? 'text-main-blue' : 'text-main-gray-500'
        )}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <i className="ri-bold"></i>
      </button>
      <button
        className={classNames(
          'basic-text-button mr-2',
          editor.isActive('italic') ? 'text-main-blue' : 'text-main-gray-500'
        )}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <i className="ri-italic"></i>
      </button>
      <button
        className={classNames(
          'basic-text-button mr-2',
          editor.isActive('underline') ? 'text-main-blue' : 'text-main-gray-500'
        )}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <i className="ri-underline"></i>
      </button>
      <button
        className={classNames(
          'basic-text-button mr-2',
          editor.isActive({ textAlign: 'left' }) ? 'text-main-blue' : 'text-main-gray-500'
        )}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
      >
        <i className="ri-align-left"></i>
      </button>
      <button
        className={classNames(
          'basic-text-button mr-2',
          editor.isActive({ textAlign: 'center' }) ? 'text-main-blue' : 'text-main-gray-500'
        )}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <i className="ri-align-center"></i>
      </button>
      <button
        className={classNames(
          'basic-text-button mr-2',
          editor.isActive({ textAlign: 'right' }) ? 'text-main-blue' : 'text-main-gray-500'
        )}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <i className="ri-align-right"></i>
      </button>
      <button
        className={classNames(
          'basic-text-button mr-2',
          editor.isActive('orderList') ? 'text-main-blue' : 'text-main-gray-500'
        )}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <i className="ri-list-ordered"></i>
      </button>
      <button
        className={classNames(
          'basic-text-button',
          editor.isActive('bulletList') ? 'text-main-blue' : 'text-main-gray-500'
        )}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <i className="ri-list-unordered"></i>
      </button>

      {/* line */}
      <div className="h-[24px] w-[1px] bg-main-gray-300 m-2"></div>

      <button
        className={classNames(
          'basic-text-button',
          popupState === 'text' ? 'text-main-blue' : 'text-main-gray-500'
        )}
      >
        <i className="ri-settings-4-fill" onClick={handleSettingClick}></i>
      </button>
    </div>
  )
}

export default SimpleTextEditor

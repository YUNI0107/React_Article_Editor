import classNames from 'classnames'

// types
import { IDistance } from '../../../contexts/EditorInfoContextSection/EditorInfoContextSection'
import { Editor } from '@tiptap/react'

function SimpleTextEditor({ distance, editor }: { distance: IDistance; editor: Editor | null }) {
  const { top, left } = distance

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
      <button className="basic-text-button mr-2">
        <i className="ri-italic"></i>
      </button>
      <button className="basic-text-button mr-2">
        <i className="ri-underline"></i>
      </button>
      <button className="basic-text-button mr-2">
        <i className="ri-align-left"></i>
      </button>
      <button className="basic-text-button mr-2">
        <i className="ri-align-center"></i>
      </button>
      <button className="basic-text-button mr-2">
        <i className="ri-align-right"></i>
      </button>
      <button className="basic-text-button mr-2">
        <i className="ri-list-ordered"></i>
      </button>
      <button className="basic-text-button">
        <i className="ri-list-unordered"></i>
      </button>

      {/* line */}
      <div className="h-[24px] w-[1px] bg-main-gray-300 m-2"></div>

      <button className="basic-text-button">
        <i className="ri-settings-4-fill"></i>
      </button>
    </div>
  )
}

export default SimpleTextEditor

import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link'
import Color from '@tiptap/extension-color'
import FontSize from '../../../tiptap/extension-font-size'
import LineHeight from '../../../tiptap/extension-line-height'

// utils
import { covertJsonStringContent } from '../BasicEditorContent/BasicEditorContent'

function BasicContent({ content }: { content?: string }) {
  if (!content) return null

  // Text editor data
  const extensions = [
    StarterKit,
    Underline,
    FontSize,
    LineHeight,
    TextStyle,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Link.configure({
      protocols: ['ftp', 'mailto'],
      autolink: false,
      linkOnPaste: false,
      openOnClick: false,
      HTMLAttributes: {
        class: 'editor-link',
      },
    }),
    Color.configure({
      types: ['textStyle'],
    }),
  ]

  const editor = useEditor({
    extensions,
    content,
    editable: false,
  })

  useEffect(() => {
    if (!editor) return

    const defaultContent = covertJsonStringContent(content)

    defaultContent
      .then((res) => {
        editor.commands.setContent(res)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [editor])

  return <EditorContent editor={editor} />
}

export default BasicContent

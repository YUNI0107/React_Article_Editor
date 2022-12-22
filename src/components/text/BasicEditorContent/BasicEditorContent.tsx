import { useContext, useEffect, useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import FontSize from '../../../tiptap/extension-font-size'

// types
import { IComponentSchema } from '../../../types/editor'
import { IDistance } from '../../../contexts/EditorInfoContextSection/EditorInfoContextSection'

// contexts
import { SchemaContext } from '../../../contexts/SchemaContextSection'
import { TextPopupContext } from '../../../contexts/TextPopupContextSection/TextPopupContextSection'

// utils
import getSelectionPosition from '../../../utils/getSelectionPosition'
import SimpleTextEditor from '../../layout/SimpleTextEditor'

function BasicEditorContent({
  schema,
  controlName,
}: {
  schema: IComponentSchema
  controlName: string
}) {
  const { uuid } = schema
  const { controlHandler } = useContext(SchemaContext)
  const { styleSelected, setStyleSelected, needUpdate, setNeedUpdate, setFontSize } =
    useContext(TextPopupContext)
  const [isTextMenuShow, setIsTextMenuShow] = useState(false)
  const [textMenuPosition, setTextMenuPosition] = useState<IDistance>({ top: 0, left: 0 })
  const editorElement = useRef<HTMLDivElement | null>(null)

  // Text editor data
  const extensions = [
    StarterKit,
    Underline,
    FontSize,
    TextStyle,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ]
  const defaultHTMLContent = '<p>Hello World!</p>'

  const editor = useEditor({
    extensions,
    content: defaultHTMLContent,
    onBlur({ editor, event }) {
      controlHandler?.changeValue(controlName, JSON.stringify(editor.getJSON()), uuid)
      const targetElement = event.relatedTarget

      if (!(targetElement && editorElement.current?.contains(targetElement as Node))) {
        setIsTextMenuShow(false)
      }
    },
    onUpdate({ editor }) {
      updatePopup(editor)
    },
    onSelectionUpdate({ editor, transaction }) {
      updatePopup(editor)

      if (transaction.selection.empty) {
        setIsTextMenuShow(false)
      } else {
        const element = editorElement.current
        const position = getSelectionPosition(element?.getBoundingClientRect())

        if (position) {
          setTextMenuPosition(position)
          setIsTextMenuShow(true)
        }
      }
    },
  })

  // operations
  const updatePopup = (editor: Editor) => {
    setStyleSelected({ ...styleSelected, bold: editor.isActive('bold') })
    setFontSize(editor.getAttributes('textStyle').fontSize)
  }

  useEffect(() => {
    const previousJsonString = controlHandler?.getValue(controlName, uuid) as string

    if (!previousJsonString || !editor) return

    try {
      const previousJSON = JSON.parse(previousJsonString)
      editor.commands.setContent(previousJSON)
    } catch (error) {
      console.error(error)
    }
  }, [editor])

  useEffect(() => {
    if (needUpdate && editor) {
      if (!editor?.state.selection.empty) {
        for (const key in needUpdate) {
          switch (key) {
            case 'bold':
              editor.chain().focus().toggleBold().run()
              break
            case 'fontSize':
              editor
                .chain()
                .focus()
                .setFontSize(needUpdate[key] as number)
                .run()
              break
            default:
              break
          }
        }
      }

      setNeedUpdate(null)
    }
  }, [needUpdate, editor])

  return (
    <div className="relative" ref={editorElement}>
      <EditorContent editor={editor} />
      {isTextMenuShow && <SimpleTextEditor editor={editor} distance={textMenuPosition} />}
    </div>
  )
}

export default BasicEditorContent

import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
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
  const {
    setStyleSelected,
    needUpdate,
    setNeedUpdate,
    setFontSize,
    focusTextEditorId,
    setFocusTextEditorId,
  } = useContext(TextPopupContext)
  const [isTextMenuShow, setIsTextMenuShow] = useState(false)
  const [textMenuPosition, setTextMenuPosition] = useState<IDistance>({ top: 0, left: 0 })
  const editorElement = useRef<HTMLDivElement | null>(null)
  const editorId = useMemo(() => uuidv4(), [])

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
    onFocus() {
      setFocusTextEditorId(editorId)
    },
  })

  // operations
  const updatePopup = (editor: Editor) => {
    setStyleSelected({
      bold: editor.isActive('bold'),
      italic: editor.isActive('italic'),
      underline: editor.isActive('underline'),
      alignLeft: editor.isActive({ textAlign: 'left' }),
      alignCenter: editor.isActive({ textAlign: 'center' }),
      alignRight: editor.isActive({ textAlign: 'right' }),
      listOrdered: editor.isActive('orderList'),
      listUnOrdered: editor.isActive('bulletList'),
    })
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
      if (editorId === focusTextEditorId) {
        for (const key in needUpdate) {
          switch (key) {
            case 'bold':
              editor.chain().focus().toggleBold().run()
              break
            case 'italic':
              editor.chain().focus().toggleItalic().run()
              break
            case 'underline':
              editor.chain().focus().toggleUnderline().run()
              break
            case 'alignLeft':
              editor.chain().focus().setTextAlign('left').run()
              break
            case 'alignCenter':
              editor.chain().focus().setTextAlign('center').run()
              break
            case 'alignRight':
              editor.chain().focus().setTextAlign('right').run()
              break
            case 'listOrdered':
              console.log('toggleOrderedList')
              editor.chain().focus().toggleOrderedList().run()
              break
            case 'listUnOrdered':
              console.log('toggleBulletList')
              editor.chain().focus().toggleBulletList().run()
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
  }, [needUpdate, editor, editorId])

  return (
    <div className="relative" ref={editorElement}>
      <EditorContent editor={editor} />
      {isTextMenuShow && <SimpleTextEditor editor={editor} distance={textMenuPosition} />}
    </div>
  )
}

export default BasicEditorContent

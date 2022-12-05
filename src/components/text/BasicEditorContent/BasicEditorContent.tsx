import { useContext, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// types
import { IComponentSchema } from '../../../types/editor'

// contexts
import { SchemaContext } from '../../../contexts/SchemaContextSection'
import { EditorInfoContext } from '../../../contexts/EditorInfoContextSection'

// utils
import getSelectionPosition from '../../../utils/getSelectionPosition'

function BasicEditorContent({
  schema,
  controlName,
}: {
  schema: IComponentSchema
  controlName: string
}) {
  const { uuid } = schema
  const { setIsTextMenuShow, setTextMenuPosition } = useContext(EditorInfoContext)
  const { controlHandler } = useContext(SchemaContext)
  const extensions = [StarterKit]
  const defaultHTMLContent = '<p>Hello World!</p>'

  const editor = useEditor({
    extensions,
    content: defaultHTMLContent,
    onBlur({ editor }) {
      controlHandler?.changeValue(controlName, JSON.stringify(editor.getJSON()), uuid)
    },
    onSelectionUpdate({ transaction }) {
      if (transaction.selection.empty) {
        setIsTextMenuShow(false)
      } else {
        const position = getSelectionPosition()

        if (position) {
          setTextMenuPosition(position)
          setIsTextMenuShow(true)
        }
      }
    },
  })

  useEffect(() => {
    const previousJsonString = controlHandler?.getValue(controlName, uuid) as string

    if (!previousJsonString || !editor) return

    try {
      const previousJSON = JSON.parse(previousJsonString)
      editor.commands.setContent(previousJSON)
    } catch (error) {
      console.error(error)
    }
  }, [controlHandler, editor])

  return <EditorContent editor={editor} />
}

export default BasicEditorContent

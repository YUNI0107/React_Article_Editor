// types
import { IComponentSchema } from '../../../types/editor'

// components
import BasicContent from '../BasicContent'
import BasicEditorContent from '../BasicEditorContent'

function TextContent({
  isEditorMode,
  schema,
  childUuid,
  controlName,
}: {
  isEditorMode?: boolean
  schema: IComponentSchema
  childUuid?: string
  controlName: string
}) {
  const content =
    schema.props && schema.props[controlName] && typeof schema.props[controlName] === 'string'
      ? schema.props[controlName]
      : ''

  return (
    <>
      {isEditorMode ? (
        <BasicEditorContent schema={schema} childUuid={childUuid} controlName={controlName} />
      ) : (
        <BasicContent content={content as string} />
      )}
    </>
  )
}

export default TextContent

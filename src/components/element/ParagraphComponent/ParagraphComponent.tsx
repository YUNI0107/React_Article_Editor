// components
import BasicEditorContent from '../../text/BasicEditorContent'

// types
import { IParagraph } from '../../../types/editor'

function ParagraphComponent({ schema }: { schema: IParagraph }) {
  return (
    <div className="py-4">
      <BasicEditorContent schema={schema} controlName="content" />
    </div>
  )
}

export default ParagraphComponent

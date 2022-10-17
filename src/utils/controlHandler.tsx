import { IComponentSchema, IMultipleSchema, ISingleSchema } from '../types/editor'

class ControlHandler {
  controlName: string
  schemas: Array<IComponentSchema>
  handleSchema: (newSchemas: Array<IComponentSchema>) => void

  constructor(
    controlName: string,
    schemas: Array<IComponentSchema>,
    handleSchema: (newSchemas: Array<IComponentSchema>) => void
  ) {
    this.controlName = controlName
    this.schemas = schemas
    this.handleSchema = handleSchema
  }

  changeValue(value: string, uuid: string, childUuid?: string) {
    const newSchemas = this.schemas
    const targetIndex = newSchemas.findIndex((item) => item.uuid === uuid)

    if (!childUuid) {
      const schemas = newSchemas[targetIndex] as ISingleSchema
      const targetProp = schemas.props

      if (targetProp) {
        targetProp[this.controlName] = value

        this.handleSchema(newSchemas)
      }
    } else if ('children' in newSchemas[targetIndex]) {
      {
        const schema = newSchemas[targetIndex] as IMultipleSchema
        const childrenTargetIndex = schema.children.findIndex((item) => item.uuid === childUuid)
        const targetProp = schema.children[childrenTargetIndex].props

        if (targetProp) {
          targetProp[this.controlName] = value
          this.handleSchema(newSchemas)
        }
      }
    }
  }

  getValue() {
    console.log('getValue')
  }
}

export default ControlHandler

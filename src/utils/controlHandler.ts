import { IComponentSchema, IMultipleSchema, ISingleSchema } from '../types/editor'

class ControlHandler {
  schemas: Array<IComponentSchema>
  handleSchema: (newSchemas: Array<IComponentSchema>) => void

  constructor(
    schemas: Array<IComponentSchema>,
    handleSchema: (newSchemas: Array<IComponentSchema>) => void
  ) {
    this.schemas = schemas
    this.handleSchema = handleSchema
  }

  changeValue(controlName: string, value: string, uuid: string, childUuid?: string) {
    const newSchemas = [...this.schemas]
    const targetIndex = newSchemas.findIndex((item) => item.uuid === uuid)

    if (!childUuid) {
      const schemas = newSchemas[targetIndex] as ISingleSchema
      const targetProp = schemas.props

      if (targetProp) {
        targetProp[controlName] = value

        this.handleSchema(newSchemas)
      }
    } else if ('children' in newSchemas[targetIndex]) {
      {
        const schema = newSchemas[targetIndex] as IMultipleSchema
        const childrenTargetIndex = schema.children.findIndex((item) => item.uuid === childUuid)
        const targetProp = schema.children[childrenTargetIndex].props

        if (targetProp) {
          targetProp[controlName] = value
          this.handleSchema(newSchemas)
        }
      }
    }
  }

  getValue(controlName: string, uuid: string, childUuid?: string) {
    const targetIndex = this.schemas.findIndex((item) => item.uuid === uuid)

    if (!childUuid) {
      const schemas = this.schemas[targetIndex] as ISingleSchema
      const targetProp = schemas.props

      if (targetProp) {
        return targetProp[controlName]
      }
    } else if ('children' in this.schemas[targetIndex]) {
      {
        const schema = this.schemas[targetIndex] as IMultipleSchema
        const childrenTargetIndex = schema.children.findIndex((item) => item.uuid === childUuid)
        const targetProp = schema.children[childrenTargetIndex].props

        if (targetProp) {
          return targetProp[controlName]
        }
      }
    }
  }
}

export default ControlHandler

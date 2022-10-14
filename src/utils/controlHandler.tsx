import { IComponentSchema, IMultipleSchema, ISingleSchema } from '../types/editor'

class ControlHandler {
  controlName: string
  schemes: Array<IComponentSchema>
  handleScheme: (newSchemes: Array<IComponentSchema>) => void

  constructor(
    controlName: string,
    schemes: Array<IComponentSchema>,
    handleScheme: (newSchemes: Array<IComponentSchema>) => void
  ) {
    this.controlName = controlName
    this.schemes = schemes
    this.handleScheme = handleScheme
  }

  changeValue(value: string, uuid: string, childUuid?: string) {
    const newSchemes = this.schemes
    const targetIndex = newSchemes.findIndex((item) => item.uuid === uuid)

    if (!childUuid) {
      const schemes = newSchemes[targetIndex] as ISingleSchema
      const targetProp = schemes.props

      if (targetProp) {
        targetProp[this.controlName] = value

        this.handleScheme(newSchemes)
      }
    } else if ('children' in newSchemes[targetIndex]) {
      {
        const scheme = newSchemes[targetIndex] as IMultipleSchema
        const childrenTargetIndex = scheme.children.findIndex((item) => item.uuid === childUuid)
        const targetProp = scheme.children[childrenTargetIndex].props

        if (targetProp) {
          targetProp[this.controlName] = value
          this.handleScheme(newSchemes)
        }
      }
    }
  }

  getValue() {
    console.log('getValue')
  }
}

export default ControlHandler

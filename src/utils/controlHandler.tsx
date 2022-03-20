import { IComponentSchema, IImages } from '../types/editor'

export class ControlHandler {
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

  changeValue(value: string, uuid: string, order?: number) {
    const newSchemes = this.schemes
    const targetIndex = newSchemes.findIndex((item) => item.uuid === uuid)

    if (order !== undefined && 'children' in newSchemes[targetIndex]) {
      const scheme = newSchemes[targetIndex] as IImages

      if (scheme.children[order].props) {
        // TODO: 不要用驚嘆號
        scheme.children[order].props![this.controlName] = value
        this.handleScheme(newSchemes)
      }
    }
  }
}

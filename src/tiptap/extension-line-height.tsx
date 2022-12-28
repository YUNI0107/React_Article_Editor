import '@tiptap/extension-text-style'
import { Extension } from '@tiptap/core'

export type LineHeightOptions = {
  types: string[]
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineHeight: {
      /**
       * Set the font size
       */
      setLineHeight: (size: number) => ReturnType
      /**
       * Unset the font size
       */
      unsetLineHeight: () => ReturnType
    }
  }
}

const LineHeight = Extension.create<LineHeightOptions>({
  name: 'lineHeight',

  addOptions() {
    return {
      types: ['textStyle'],
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) => element.style.lineHeight?.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) {
                return {}
              }

              return {
                style: `line-height: ${attributes.lineHeight}px`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setLineHeight:
        (lineHeight) =>
        ({ chain }) => {
          return chain().setMark('textStyle', { lineHeight }).run()
        },
      unsetLineHeight:
        () =>
        ({ chain }) => {
          return chain().setMark('textStyle', { lineHeight: null }).removeEmptyTextStyle().run()
        },
    }
  },
})

export default LineHeight

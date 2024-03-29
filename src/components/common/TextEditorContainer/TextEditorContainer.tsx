import { ConnectDragSource } from 'react-dnd'

// components
import FontLinkControl from '../../controls/textEditorControls/FontLinkControl'
import FontRecoverControl from '../../controls/textEditorControls/FontRecoverControl'
import FontSizeControl from '../../controls/textEditorControls/FontSizeControl'
import FontStyleControl from '../../controls/textEditorControls/FontStyleControl'
import LineHeightControl from '../../controls/textEditorControls/LineHeightControl'
import FontColorControl from '../../controls/textEditorControls/FontColorControl'
import PopupContainer from '../PopupContainer'

function TextEditorContainer({ drag }: { drag: ConnectDragSource }) {
  return (
    <PopupContainer title="文字設定" drag={drag}>
      <FontSizeControl />
      <FontColorControl />
      <FontStyleControl />
      <LineHeightControl />
      <FontLinkControl />

      <FontRecoverControl />
    </PopupContainer>
  )
}

export default TextEditorContainer

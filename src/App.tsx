import './App.css'
import { IComponentSchema } from './types/editor'
import ImagesComponent from './components/layout/ImagesComponent'
import ImgPathControl from './components/controls/ImgPathControl'

function App() {
  const a: IComponentSchema = {
    groupType: 'images',
    type: 'triplicate-square',
    props: {
      imgPaths: [],
    },
    controls: [ImgPathControl],
  }

  return (
    <div className="App">
      <ImagesComponent scheme={a} />
    </div>
  )
}

export default App

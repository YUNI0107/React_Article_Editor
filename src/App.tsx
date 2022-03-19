import './App.css'
import { IComponentSchema } from './types/editor'
import ImagesComponent from './components/layout/ImagesComponent'

function App() {
  const a: IComponentSchema = {
    groupType: 'images',
    type: 'triplicate-square',
    props: {
      imgPaths: ['https://miro.medium.com/max/1400/1*nUwBNo9xbZ1Yn7hAqd9oXg.png'],
    },
    controls: ['imgPathControl'],
  }

  return (
    <div className="App">
      <ImagesComponent scheme={a} />
    </div>
  )
}

export default App

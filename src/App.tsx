import logo from './logo.svg'
import './App.css'
import { IComponentSchema } from './types/editor'

function App() {
  const a: IComponentSchema = {
    groupType: 'images',
    type: 'triplicate-circle',
    childrenParagraph: [
      {
        type: 'paragraph',
        groupType: 'paragraph',
      },
    ],
  }

  console.log(a)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="bg-pink-400">
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App

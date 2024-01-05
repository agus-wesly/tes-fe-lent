import DialogForm from './components/Dialog'
import MapComponent from './components/Map'
import { CartContextProvider } from './context/MapContext'

function App() {
  return (
    <main>
      <CartContextProvider>
        <MapComponent lonLat={[0, 0]} />
        <DialogForm />
      </CartContextProvider>
    </main>
  )
}

export default App

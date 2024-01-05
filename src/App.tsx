import DialogForm from './components/Dialog'
import MapComponent from './components/Map'
import { CartContextProvider } from './context/MapContext'

function App() {
  return (
    <main>
      <CartContextProvider>
        <MapComponent />
        <DialogForm />
      </CartContextProvider>
    </main>
  )
}

export default App

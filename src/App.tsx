import DialogForm from './components/Dialog'
import MapComponent from './components/Map'
import { CartContextProvider } from './context/MapContext'

function App() {
  return (
    <CartContextProvider>
      <main className="w-screen my-10 gap-5 flex flex-col justify-center items-center">
        <h1 className="text-xl font-semibold">React Vite + Openlayer</h1>
        <MapComponent />
        <DialogForm />
      </main>
    </CartContextProvider>
  )
}

export default App

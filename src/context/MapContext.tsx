import { ReactNode, createContext, useContext, useState } from 'react'

type InitialState = {
  isDialogOpen: boolean
  setIsDialogOpen: (newVal: boolean) => void
  selectedLatitude: number
  selectedLongitude: number
  setSelectedLatitude: (newVal: number) => void
  setSelectedLongitude: (newVal: number) => void
}

export const mapContext = createContext<InitialState | null>(null)

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedLatitude, setSelectedLatitude] = useState(0)
  const [selectedLongitude, setSelectedLongitude] = useState(0)

  return (
    <mapContext.Provider
      value={{
        isDialogOpen,
        setIsDialogOpen,
        selectedLatitude,
        setSelectedLatitude,
        selectedLongitude,
        setSelectedLongitude,
      }}
    >
      {children}
    </mapContext.Provider>
  )
}

export function useMapContext() {
  const cartContext = useContext(mapContext)
  if (!cartContext)
    throw new Error('Cart context must be inside CartContext`s provider')
  return cartContext
}

import { useMapContext } from '../context/MapContext'
import useMap from '../hooks/useMap'

export default function MapComponent() {
  const { setIsDialogOpen, selectedLatitude, selectedLongitude } =
    useMapContext()
  useMap()

  return (
    <div className="w-fit overflow-y-scroll">
      <div
        key={JSON.stringify([selectedLongitude, selectedLatitude])}
        id="map"
        className="w-[90vw] aspect-video overflow-hidden relative"
      >
        <button
          onClick={() => setIsDialogOpen(true)}
          className="absolute z-[2] top-2 right-2 bg-white p-1 rounded-sm"
        >
          <img
            src="/assets/icons/setting.svg"
            className="w-5 h-5 object-contain"
          />
        </button>
      </div>
    </div>
  )
}

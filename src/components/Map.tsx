import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM.js'
import View from 'ol/View.js'
import { FullScreen, defaults as defaultControls } from 'ol/control.js'

import { useEffect } from 'react'

type Props = {}

export default function MapComponent({}: Props) {
  useEffect(() => {
    const view = new View({
      center: [11976247.343355658, -772059.0232357808],
      zoom: 5,
    })

    const initialMap = new Map({
      controls: defaultControls().extend([
        new FullScreen({
          source: 'fullscreen',
        }),
      ]),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: view,
    })

    initialMap.on('click', (event) => {
      console.log('e', event.coordinate)
    })
  }, [])

  return (
    <div id="fullscreen" className="fullscreen">
      <div id="map" className="w-[800px] aspect-video overflow-hidden"></div>
    </div>
  )
}

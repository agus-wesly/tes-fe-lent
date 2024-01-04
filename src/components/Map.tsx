import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM.js'
import View from 'ol/View.js'
import { FullScreen, defaults as defaultControls } from 'ol/control.js'
import Feature from 'ol/Feature.js'
import { fromLonLat } from 'ol/proj.js'
import Point from 'ol/geom/Point.js'

import { useEffect } from 'react'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'

type Props = {
  lonLat: Array<number>
}

export default function MapComponent({ lonLat }: Props) {
  useEffect(() => {
    const rome = new Feature({
      geometry: new Point(fromLonLat(lonLat)),
    })

    rome.setStyle(
      new Style({
        image: new Icon({
          crossOrigin: 'anonymous',
          src: '/assets/icons/pointer.png',
          width: 20,
        }),
      })
    )

    const vectorSource = new VectorSource({
      features: [rome],
    })

    const vectorLayer = new VectorLayer({
      source: vectorSource,
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
        vectorLayer,
      ],
      target: 'map',
      view: new View({
        center: fromLonLat(lonLat),
        zoom: 5,
      }),
    })

    initialMap.on('click', (event) => {
      console.log('e', event.coordinate)
    })
  }, [])

  return (
    <div id="fullscreen" className="fullscreen">
      <div id="map" className="w-[800px] aspect-video overflow-hidden relative">
        <button className="absolute z-[2] top-12 right-2 bg-white p-1 rounded-sm">
          <img
            src="/assets/icons/setting.svg"
            className="w-4 h-4 object-contain"
          />
        </button>
      </div>
    </div>
  )
}

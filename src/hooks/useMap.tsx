import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM.js'
import View from 'ol/View.js'
import Feature from 'ol/Feature.js'
import { fromLonLat } from 'ol/proj.js'
import Point from 'ol/geom/Point.js'

import { useEffect } from 'react'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { useMapContext } from '../context/MapContext'

export default function useMap() {
  const { selectedLatitude, selectedLongitude } = useMapContext()
  const lonLat = [selectedLatitude, selectedLongitude]

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

  return null
}

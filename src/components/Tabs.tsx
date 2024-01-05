import * as Tabs from '@radix-ui/react-tabs'
import Input from './Input'
import Button from './Button'
import { FormEvent, useState } from 'react'
import {
  decimalToDMSLatitude,
  decimalToDMSLongitude,
  dmsToDecimal,
} from '../utils/converter'
import { validateInput } from '../utils/validator'
import { useMapContext } from '../context/MapContext'

type Props = {}

export default function FormTabs({}: Props) {
  return (
    <Tabs.Root className="flex flex-col w-full" defaultValue="tab1">
      <Tabs.List
        className="shrink-0 flex border-b border-mauve6"
        aria-label="Manage your account"
      >
        <Tabs.Trigger
          className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative outline-none cursor-pointer"
          value="tab1"
        >
          DMS to DD
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative outline-none cursor-pointer"
          value="tab2"
        >
          DD to DMS
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        className="grow mt-4 bg-white rounded-b-md outline-none"
        value="tab1"
      >
        <DMSToDDForm />
      </Tabs.Content>
      <Tabs.Content
        className="grow mt-4 bg-white rounded-b-md outline-none"
        value="tab2"
      >
        <DDToDMSForm />
      </Tabs.Content>
    </Tabs.Root>
  )
}

type InitialDMS = {
  latitude: {
    degrees: null | number | string
    minutes: null | number | string
    seconds: null | number | string
  }
  longitude: {
    degrees: null | number | string
    minutes: null | number | string
    seconds: null | number | string
  }
}

function DMSToDDForm() {
  const { setIsDialogOpen, setSelectedLongitude, setSelectedLatitude } =
    useMapContext()

  const [initialDMSLatitude, setInitialDMSLatitude] = useState<
    InitialDMS['latitude']
  >({
    degrees: null,
    minutes: null,
    seconds: null,
  })

  const [initialDMSLongitude, setInitialDMSLongitude] = useState<
    InitialDMS['longitude']
  >({
    degrees: null,
    minutes: null,
    seconds: null,
  })

  const [convertedResultDD, setConvertedResultDD] = useState<Array<number>>([])

  const canConvert =
    Object.keys(initialDMSLatitude).every(
      (val) => initialDMSLatitude[val as keyof InitialDMS['latitude']] !== null
    ) &&
    Object.keys(initialDMSLongitude).every(
      (val) =>
        initialDMSLongitude[val as keyof InitialDMS['longitude']] !== null
    )

  function handleConvert(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!canConvert) return

    const resultLatitude = dmsToDecimal({
      degrees: initialDMSLatitude.degrees!,
      minutes: initialDMSLatitude.minutes!,
      seconds: initialDMSLatitude.seconds!,
    })

    const resultLongitude = dmsToDecimal({
      degrees: initialDMSLongitude.degrees!,
      minutes: initialDMSLongitude.minutes!,
      seconds: initialDMSLongitude.seconds!,
    })

    setConvertedResultDD([resultLatitude, resultLongitude])
  }

  function handleAddToMap() {
    if (!canConvert) return
    setSelectedLatitude(convertedResultDD[0])
    setSelectedLongitude(convertedResultDD[1])
    setIsDialogOpen(false)
  }

  return (
    <div className="flex flex-col gap-4 text-sm">
      <p className="text-neutral-900 text-lg font-medium">
        Convert Coordinate DMS to DD
      </p>

      <form onSubmit={handleConvert} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label className="text-sm  text-neutral-600">Latitude</label>
          <div className="flex">
            <Input
              id="degrees-lat"
              className="w-24"
              value={initialDMSLatitude.degrees ?? ''}
              onChange={(e) => {
                const degrees = validateInput(e.target.value, -90, 90)
                setInitialDMSLatitude((prev) => ({
                  ...prev,
                  degrees,
                }))
              }}
            />
            <span className="mr-1">°</span>
            <Input
              type="text"
              id="minutes-lat"
              className="w-24"
              value={initialDMSLatitude.minutes ?? ''}
              onChange={(e) => {
                const minutes = validateInput(e.target.value, 0, 60)
                setInitialDMSLatitude((prev) => ({
                  ...prev,
                  minutes,
                }))
              }}
            />
            <span className="mr-1">'</span>
            <Input
              type="text"
              id="seconds"
              className="w-24"
              value={initialDMSLatitude.seconds ?? ''}
              onChange={(e) => {
                const seconds = validateInput(e.target.value, 0, 60)
                setInitialDMSLatitude((prev) => ({
                  ...prev,
                  seconds,
                }))
              }}
            />
            <span>"</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm text-neutral-600" htmlFor="longitude">
            Longitude
          </label>
          <div className="flex">
            <Input
              type="text"
              name="latitude"
              id="latitude"
              className="w-24"
              value={initialDMSLongitude.degrees ?? ''}
              onChange={(e) => {
                const degrees = validateInput(e.target.value, -180, 180)
                setInitialDMSLongitude((prev) => ({
                  ...prev,
                  degrees,
                }))
              }}
            />
            <span className="mr-1">°</span>
            <Input
              type="text"
              name="latitude"
              id="latitude"
              className="w-24"
              value={initialDMSLongitude.minutes ?? ''}
              onChange={(e) => {
                const minutes = validateInput(e.target.value, 0, 60)
                setInitialDMSLongitude((prev) => ({
                  ...prev,
                  minutes,
                }))
              }}
            />
            <span className="mr-1">'</span>
            <Input
              type="text"
              name="latitude"
              id="latitude"
              className="w-24"
              value={initialDMSLongitude.seconds ?? ''}
              onChange={(e) => {
                const seconds = validateInput(e.target.value, 0, 60)
                setInitialDMSLongitude((prev) => ({
                  ...prev,
                  seconds,
                }))
              }}
            />
            <span>"</span>
          </div>
        </div>

        <Button
          disabled={!canConvert}
          className="self-end text-xs p-3"
          type="submit"
        >
          Convert
        </Button>
      </form>

      <div className="flex justify-between items-center">
        <p>Latitude</p>
        <p className="font-semibold">{convertedResultDD[0] ?? '-'} deg</p>
      </div>

      <div className="flex justify-between items-center">
        <p>Longitude</p>
        <p className="font-semibold">{convertedResultDD[1] ?? '-'} deg</p>
      </div>

      <Button
        onClick={handleAddToMap}
        disabled={!convertedResultDD.length}
        className="self-center text-xs p-3"
        type="submit"
      >
        Add to maps
      </Button>
    </div>
  )
}
function DDToDMSForm() {
  const { setSelectedLatitude, setSelectedLongitude, setIsDialogOpen } =
    useMapContext()

  const [initialDD, setInitialDD] = useState<{
    latitude: number | null | string
    longitude: number | null | string
  }>({
    latitude: null,
    longitude: null,
  })

  const [resultDMS, setResultDMS] = useState<InitialDMS>({
    latitude: {
      degrees: null,
      minutes: null,
      seconds: null,
    },
    longitude: {
      degrees: null,
      minutes: null,
      seconds: null,
    },
  })

  const canConvert = Object.keys(initialDD).every(
    (val) => initialDD[val as keyof typeof initialDD] !== null
  )

  function handleConvert(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!canConvert) return

    const resultLatitude = decimalToDMSLatitude(initialDD.latitude!)
    const resultLongitude = decimalToDMSLongitude(initialDD.longitude!)

    setResultDMS({
      latitude: {
        ...resultLatitude,
      },
      longitude: {
        ...resultLongitude,
      },
    })
  }

  const canAddToMap =
    resultDMS.latitude.degrees !== null && resultDMS.longitude.degrees !== null

  function handleAddToMap() {
    if (!canAddToMap) return
    const resultLatitude = dmsToDecimal({
      degrees: resultDMS.latitude.degrees!,
      minutes: resultDMS.latitude.minutes!,
      seconds: resultDMS.latitude.seconds!,
    })
    const resultLongitude = dmsToDecimal({
      degrees: resultDMS.longitude.degrees!,
      minutes: resultDMS.longitude.minutes!,
      seconds: resultDMS.longitude.seconds!,
    })
    setSelectedLatitude(resultLatitude)
    setSelectedLongitude(resultLongitude)
    setIsDialogOpen(false)
  }

  const resultLatitude = resultDMS.latitude
  const resultLongitude = resultDMS.longitude

  return (
    <div className="flex flex-col gap-4 text-sm">
      <p className="text-neutral-900 text-lg font-medium">
        Convert Coordinate DD to DMS
      </p>

      <form onSubmit={handleConvert} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label className="text-sm text-neutral-600" htmlFor="latitude">
            Latitude
          </label>
          <div className="flex">
            <Input
              id="latitude"
              className="w-36"
              value={initialDD.latitude ?? ''}
              onChange={(e) => {
                const latitude = validateInput(e.target.value, -90, 90)
                setInitialDD((prev) => ({ ...prev, latitude }))
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm text-neutral-600" htmlFor="longitude">
            Longitude
          </label>
          <div className="flex">
            <Input
              type="text"
              id="longitude"
              className="w-36"
              value={initialDD.longitude ?? ''}
              onChange={(e) => {
                const longitude = validateInput(e.target.value, -180, 180)
                setInitialDD((prev) => ({ ...prev, longitude }))
              }}
            />
          </div>
        </div>

        <Button
          disabled={!canConvert}
          className="self-end text-xs p-3"
          type="submit"
        >
          Convert
        </Button>
      </form>

      <div className="flex justify-between items-center">
        <p>Latitude</p>
        <p>
          <span>{resultLatitude.degrees ?? '-'} °</span>
          <span>{resultLatitude.minutes} '</span>
          <span>{resultLatitude.seconds} "</span>
        </p>
      </div>

      <div className="flex justify-between items-center">
        <p>Longitude</p>
        <p>
          <span>{resultLongitude.degrees ?? '-'} °</span>
          <span>{resultLongitude.minutes} '</span>
          <span>{resultLongitude.seconds} "</span>
        </p>
      </div>

      <Button
        onClick={handleAddToMap}
        disabled={!canAddToMap}
        className="self-center text-xs p-3"
        type="submit"
      >
        Add to maps
      </Button>
    </div>
  )
}

import * as Tabs from '@radix-ui/react-tabs'
import Input from './Input'
import Button from './Button'
import { FormEvent } from 'react'

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

function DMSToDDForm() {
  function handleConvert(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <div className="flex flex-col gap-4 text-sm">
      <p className="text-neutral-900 text-lg font-medium">
        Convert Coordinate DMS to DD
      </p>

      <form onSubmit={handleConvert} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label className="text-sm  text-neutral-600" htmlFor="latitude">
            Latitude
          </label>
          <div className="flex">
            <Input name="latitude" id="latitude" className="w-12" />
            <span className="mr-1">°</span>
            <Input type="text" name="latitude" id="latitude" className="w-12" />
            <span className="mr-1">'</span>
            <Input type="text" name="latitude" id="latitude" className="w-12" />
            <span>"</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm text-neutral-600" htmlFor="longitude">
            Longitude
          </label>
          <div className="flex">
            <Input type="text" name="latitude" id="latitude" className="w-12" />
            <span className="mr-1">°</span>
            <Input type="text" name="latitude" id="latitude" className="w-12" />
            <span className="mr-1">'</span>
            <Input type="text" name="latitude" id="latitude" className="w-12" />
            <span>"</span>
          </div>
        </div>

        <Button className="self-end text-xs p-3" type="submit">
          Convert
        </Button>
      </form>

      <div className="flex justify-between items-center">
        <p>Latitude</p>
        <p>Val</p>
      </div>

      <div className="flex justify-between items-center">
        <p>Longitude</p>
        <p>Val</p>
      </div>

      <Button className="self-center text-xs p-3" type="submit">
        Add to maps
      </Button>
    </div>
  )
}
function DDToDMSForm() {
  function handleConvert(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

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
            <Input name="latitude" id="latitude" className="w-20" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm text-neutral-600" htmlFor="longitude">
            Longitude
          </label>
          <div className="flex">
            <Input type="text" name="latitude" id="latitude" className="w-20" />
          </div>
        </div>

        <Button className="self-end text-xs p-3" type="submit">
          Convert
        </Button>
      </form>

      <div className="flex justify-between items-center">
        <p>Latitude</p>
        <p>Val</p>
      </div>

      <div className="flex justify-between items-center">
        <p>Longitude</p>
        <p>Val</p>
      </div>

      <Button className="self-center text-xs p-3" type="submit">
        Add to maps
      </Button>
    </div>
  )
}

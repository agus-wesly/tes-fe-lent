import * as Dialog from '@radix-ui/react-dialog'
import FormTabs from './Tabs'

export default function DialogForm() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="absolute z-[2] top-2 right-2 bg-white p-1 rounded-sm">
          <img
            src="/assets/icons/setting.svg"
            className="w-5 h-5 object-contain"
          />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <FormTabs />
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <img
                src="/assets/icons/close.svg"
                className="w-5 h-5"
                alt="close-icon"
              />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

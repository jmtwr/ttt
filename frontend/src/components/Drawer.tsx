import { useEffect, useState } from 'react'
import { Children } from '../types'
import { Portal } from './Portal'

type DrawerProps = {
  open: boolean
  setOpen: (state: boolean) => void
  onClose?: () => void
} & Children

export const Drawer: React.FC<DrawerProps> = ({ children, onClose, setOpen, open }) => {
  useEffect(() => {
    if (!open) {
      onClose?.()
    }
  }, [open])

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn btn-accent">
        Open drawer
      </button>

      <Portal>
        {open && (
          <div className="absolute w-full h-screen top-0 left-0 z-[999] flex items-center justify-center">
            <div className="bg-white rounded-[4px] p-[40px] min-w-[572px] relative z-[2]">{children}</div>
            <div
              onClick={() => setOpen(false)}
              className="bg-black opacity-80 absolute z-[1] w-full h-full cursor-pointer"
            />
          </div>
        )}
      </Portal>
    </>
  )
}

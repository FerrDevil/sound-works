"use client"

import useClickOutside from '@/hooks/useClickOutside'
import Link from 'next/link'
import { useState } from 'react'

type ActionRequiresAuthProps = React.PropsWithChildren

export default function ActionRequiresAuth({ children}: ActionRequiresAuthProps) {
    const [open, setOpen] = useState(false)
    const ref = useClickOutside<HTMLDivElement>(() => setOpen(prev => prev ? !prev: prev))
   
  return (
    <div ref={ref} className='relative'>
        <button className='cursor-pointer flex flex-col gap-1 items-center w-full' onClick={() => setOpen(prev => !prev)}>
            {children}
        </button>
        <div  className={`${!open? "hidden": ""} absolute flex flex-col items-center left-full top-[50%] -translate-y-1/2 bg-(--secondary-accent-color) p-4`}>
            <span className='text-[0.75rem] truncate'>Необходима авторизация</span>
            <Link className='text-[0.75rem]' onClick={() => setOpen(prev => !prev)} href={"./signIn"}>Войти</Link>
        </div>
    </div>
  )
}

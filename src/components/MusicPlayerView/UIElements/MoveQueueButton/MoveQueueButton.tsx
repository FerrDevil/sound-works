"use client"

import { useShallow } from "zustand/shallow"
import {  useMusicPlayerStore } from "../../MusicPlayerStore"
import { memo } from "react"

type MoveQueueButtonProps = {
    type: "forwards" | "backwards"
    expandMenu: boolean
}

export default memo(function MoveQueueButton({ type, expandMenu }: MoveQueueButtonProps) {
    const { queue, musicId, setQueueItem, isOpen } =  useMusicPlayerStore( useShallow( state => ({queue: state.queue, musicId: state.musicId, setQueueItem: state.setQueueItem, isOpen: state.isOpen}) ) )
    const trackQueueIndex = queue.findIndex((item) => item === musicId)
    const disabled = trackQueueIndex === 0 && type === "backwards" || trackQueueIndex + 1 === queue.length && type === "forwards"


    const onClick = () => {
        setQueueItem( type === "forwards" ? "next": "previous" )
    }

    return (
        <button className="  h-full  not-disabled:cursor-pointer disabled:fill-(--disabled-color) not-disabled:fill-white" disabled={disabled} onClick={onClick}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${isOpen && !expandMenu? "w-9": "w-6"} aspect-square transition-[width, height]  duration-200 ease-linear`}>
            
                {
                    type === "backwards"?
                        <path d="M0 25V1H3.69231V25H0ZM24 25L7.38462 13L24 1V25ZM20.3077 17.5V8.5L14.0308 13L20.3077 17.5Z" />
                    :
                        <path d="M20.3077 24V0H24V24H20.3077ZM0 24V0L16.6154 12L0 24ZM3.69231 16.5L9.96923 12L3.69231 7.5V16.5Z" />
                }
                
            
            </svg>

        </button>
    )
})

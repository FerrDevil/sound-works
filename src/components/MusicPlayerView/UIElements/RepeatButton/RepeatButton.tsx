"use client"

import { memo } from "react"
import { useMusicPlayerStore } from "../../MusicPlayerStore"
import { useShallow } from "zustand/shallow"

export default memo(function RepeatButton() {
    const { repeat, toggleRepeat } =  useMusicPlayerStore( useShallow( state => ({
            repeat: state.repeat,
            toggleRepeat: state.toggleRepeat,
        }) ) )

    return (
        <button style={{filter: repeat ? "drop-shadow(0 0 2px #ffffffAA)": ""}} className="cursor-pointer grid place-items-center" onClick={toggleRepeat}>
            <span className={`col-span-full row-span-full text-[0.5rem] block pointer-events-none select-none leading-none font-bold  ${repeat? "opacity-100": "opacity-0"}`}> 1 </span>
            <svg className="col-span-full row-span-full fill-white" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
               
                
                <path d="M10.5 33L4.5 27L10.5 21L12.6 23.175L10.275 25.5H25.5V19.5H28.5V28.5H10.275L12.6 30.825L10.5 33ZM7.5 16.5V7.5H25.725L23.4 5.175L25.5 3L31.5 9L25.5 15L23.4 12.825L25.725 10.5H10.5V16.5H7.5Z" fill="white"/>
                
            </svg>
        </button>
    )
})

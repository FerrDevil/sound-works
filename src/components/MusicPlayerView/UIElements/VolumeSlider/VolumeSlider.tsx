"use client"

import { useShallow } from "zustand/shallow"
import { useMusicPlayerStore } from "../../MusicPlayerStore"
import { memo, useState } from "react"
import useClickOutside from "@/hooks/useClickOutside"
import { motion } from "motion/react"

export default memo(function VolumeSlider() {
    const { volume, setVolume } =  useMusicPlayerStore( useShallow( state => ({volume: state.volume, setVolume: state.setVolume}) ) )

    const [isOpen, setOpen] = useState(false)

    const divRef = useClickOutside<HTMLDivElement>(() => setOpen(false))
    
    return (
        <div ref={divRef} className="relative">
            <div className={`${isOpen? "": "select-none opacity-0 pointer-events-none"} rounded-[10px] absolute bg-[#4E4E4E] flex flex-col items-center gap-4 px-2 py-4 bottom-[100%] left-[50%] -translate-x-1/2`}>
                <button>
                    <svg className="fill-white" width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.4444 30.5V26.9857C20.0278 26.2429 22.1088 24.8143 23.6875 22.7C25.2662 20.5857 26.0556 18.1857 26.0556 15.5C26.0556 12.8143 25.2662 10.4143 23.6875 8.3C22.1088 6.18571 20.0278 4.75714 17.4444 4.01429V0.5C21.0037 1.3 23.9028 3.09286 26.1417 5.87857C28.3806 8.66429 29.5 11.8714 29.5 15.5C29.5 19.1286 28.3806 22.3357 26.1417 25.1214C23.9028 27.9071 21.0037 29.7 17.4444 30.5ZM-1.5 20.6857V10.4H5.38889L14 1.82857V29.2571L5.38889 20.6857H-1.5ZM17.4444 22.4V8.6C18.7935 9.22857 19.8484 10.1714 20.609 11.4286C21.3697 12.6857 21.75 14.0571 21.75 15.5429C21.75 17 21.3697 18.35 20.609 19.5929C19.8484 20.8357 18.7935 21.7714 17.4444 22.4ZM10.5556 10.1429L6.85278 13.8286H1.94444V17.2571H6.85278L10.5556 20.9429V10.1429Z" />
                    </svg>
                </button>

                <div className="relative w-[2px]">
                    <input defaultValue={volume} min={0} max={1} step={0.01} type="range" className="music-slider cursor-pointer" data-orient={"vertical"} onChange={event => setVolume(parseFloat(event.currentTarget.value))}/>
                    <div style={{
                        bottom: `${volume < 0 ? 0: volume * 100}%`,
                        transform: "translate(-4px, 4px)"
                        }} 
                        className="w-[10px] aspect-square bg-(--primary-color) rounded-full select-none pointer-events-none absolute absolute z-1"
                    />
                    <div className="bg-(--secondary-main-color) select-none pointer-events-none absolute inset-0 "/>
                    <motion.div animate={{
                        zIndex:0,
                        height: `${volume * 100}%`,
                        transition: {
                            height:{
                                duration: 0,
                                ease: "linear"
                            }
                        }
                    }} className="w-full bg-(--primary-color) pointer-events-none select-none absolute  absolute bottom-0 "/>
                </div>

                <button>
                    <svg className="fill-white" width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.625 21.6562V9.84375H10.4028L20.125 0V31.5L10.4028 21.6562H2.625ZM24.0139 23.625V7.77656C25.4722 8.46563 26.647 9.53203 27.5382 10.9758C28.4294 12.4195 28.875 14.0109 28.875 15.75C28.875 17.4891 28.4294 19.0641 27.5382 20.475C26.647 21.8859 25.4722 22.9359 24.0139 23.625ZM16.2361 9.54844L12.0556 13.7812H6.51389V17.7188H12.0556L16.2361 21.9516V9.54844Z"/>
                    </svg>
                </button>
            </div>
            <button className="cursor-pointer my-2" onClick={() => setOpen(prev => !prev)}>
                <svg className="fill-white" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 27V9H13.5V27H10.5ZM16.5 33V3H19.5V33H16.5ZM4.5 21V15H7.5V21H4.5ZM22.5 27V9H25.5V27H22.5ZM28.5 21V15H31.5V21H28.5Z" fill="white"/>
                </svg>
            </button>
            
        </div>
    )
})

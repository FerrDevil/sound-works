"use client"
import { motion } from 'motion/react'
import { useMusicPlayer } from '../../MusicPlayerProvider'
import { useEffect, useState } from 'react'

type ProgressBarProps = {
    readonly: boolean,
    audioRef: React.RefObject<HTMLAudioElement | null>
}

export default function ProgressBar({readonly, audioRef} : ProgressBarProps) {
    const {musicPlayerProperties:{ settings :{duration, currentTime}}} = useMusicPlayer()
    const [seekingPart, setSeekingPart] = useState(0)

    const onChange : React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!audioRef.current ) return

        audioRef.current.currentTime = Number((event.target as HTMLInputElement).value)
       
    }
    useEffect(() => {
        if (!audioRef.current) return
        audioRef.current.onprogress = (event) => {
            const eventTarget = event.currentTarget as HTMLAudioElement
            if (eventTarget.seekable.length === 0 ) return
            setSeekingPart(eventTarget.seekable.end(0))
        }
    }, [audioRef])
   

    return (
        <div className={`grid isolate ${readonly ? "absolute bottom-0 left-0 right-0 " : "relative"}`} >
            {
                !readonly &&
                <input type="range" className=" music-slider col-start-1 -col-end-1 cursor-pointer" min={0} max={duration} step={1}  value={currentTime} onChange={onChange} />
            }
            <div className={`w-full bg-(--secondary-accent-color) select-none pointer-events-none ${readonly? "h-[1px]" : "absolute inset-0"} `}/>
            <motion.div animate={{
                zIndex:0,
                width: seekingPart / duration * 100 + "%",
                transition: {
                    width:{
                        duration: 0.3,
                        ease: "linear"
                    }
                }
            }} className="w-0 bg-(--secondary-main-color) select-none pointer-events-none absolute inset-0 "/>
            <motion.div animate={{
                zIndex:0,
                width: currentTime / duration * 100 + "%",
                transition: {
                    width:{
                        duration: 0.01,
                        ease: "linear"
                    }
                }
            }} className="w-0 bg-(--primary-color) pointer-events-none select-none absolute inset-0 "/>
            
            
        </div>
    )
}

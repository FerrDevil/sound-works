"use client"
import { motion } from 'motion/react'
import { useMusicPlayer } from '../../MusicPlayerProvider'
import { useEffect, useState } from 'react'


type ProgressBarProps = {
    readonly: boolean,
    audioRef: React.RefObject<HTMLAudioElement | null>
}

type Buffered = {
    start: number,
    end: number
}[]

export default function ProgressBar({readonly, audioRef} : ProgressBarProps) {
    const {musicPlayerProperties: { settings: {duration, currentTime} } } = useMusicPlayer()
    const [buffered, setBuffered] = useState<Buffered>([])

    const onChange : React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!audioRef.current ) return

        audioRef.current.currentTime = Number((event.target as HTMLInputElement).value)
       
    }


    
    useEffect(() => {
        const audioElement = audioRef.current
        if (!audioElement) return
        audioElement.onprogress = (event) => {
            const eventTarget = event.currentTarget as HTMLAudioElement
            
            if (eventTarget.buffered.length === 0 ) return
            const bufferedItems: Buffered = []
            for (let index = 0; index < eventTarget.buffered.length; index++) {
                bufferedItems.push({
                    start: eventTarget.buffered.start(index),
                    end: eventTarget.buffered.end(index)
                });
            }
            
            setBuffered(bufferedItems)
        }
        return () => {
            audioElement.onprogress = null 
        }
    }, [audioRef])
   

    return (
        <div className={`grid isolate ${readonly ? "absolute bottom-0 left-0 right-0 " : "relative"}`} >
            {
                !readonly &&
                <>
                    <input type="range" className=" music-slider col-start-1 -col-end-1 cursor-pointer" min={0} max={duration} step={1} value={currentTime} onChange={onChange} />
                    <div style={{
                    left: `${currentTime / duration * 100}%`,
                    transform: "translate(-4px, -4px)"
                    }} className="w-[10px] aspect-square bg-(--primary-color) rounded-full select-none pointer-events-none absolute inset-0 absolute z-1"/>
                </>
            }
            <div className={`w-full bg-(--secondary-accent-color) select-none pointer-events-none ${readonly? "h-[1px]" : "absolute inset-0"} `}/>
            {
                buffered.map(buffer => (
                    <div key={buffer.start} style={{
                    left: buffer.start / duration * 100 + "%",
                    width: ( buffer.end - buffer.start) / duration * 100 + "%",
                 }} className="w-0 bg-(--secondary-main-color) select-none pointer-events-none absolute inset-0 absolute"/>

                ))
            }
           

            
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

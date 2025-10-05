"use client"
import { motion } from 'motion/react'
import { useMusicPlayer } from '../../MusicPlayerProvider'

type ProgressBarProps = {
    readonly: boolean,
    audioRef: React.RefObject<HTMLAudioElement | null>
}

export default function ProgressBar({readonly, audioRef} : ProgressBarProps) {
    const {musicPlayerProperties} = useMusicPlayer()


    const onChange : React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!audioRef.current ) return

        audioRef.current.currentTime = Number((event.target as HTMLInputElement).value)
       
    }
    return (
        <div className={`grid ${readonly? "absolute bottom-0 left-0 w-full" : "relative"}`} >
            {
                !readonly &&
                <input type="range" className=" music-slider col-start-1 -col-end-1" min={0} max={musicPlayerProperties.settings.duration} step={1}  value={musicPlayerProperties.settings.currentTime} onChange={onChange} />
            }
            <div className={`w-full bg-[#878787] ${readonly? "h-[1px]" : "absolute inset-0"} `}/>
            <motion.div animate={{
                width: musicPlayerProperties.settings.currentTime / musicPlayerProperties.settings.duration * 100 + "%",
                transition: {
                    width:{
                        duration: 0.01,
                        ease: "linear"
                    }
                }
            }} className="w-0 bg-[#ffffff] absolute inset-0 "/>
            
            
        </div>
    )
}

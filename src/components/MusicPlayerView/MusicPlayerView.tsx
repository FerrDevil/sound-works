"use client"
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link";
import { useMusicPlayer, ACTION_TYPES } from "./MusicPlayerProvider";
import { getMusicById, getMusicByPlaylistIndex, TMusic } from "./MusicPlayer.actions";
import Audio from "./Audio";
import PlayButton from "./UIElements/PlayButton/PlayButton";
import ProgressBar from "./UIElements/ProgressBar/ProgressBar";
import CloseButton from "./UIElements/CloseButton/CloseButton";
import MoveQueueButton from "./UIElements/MoveQueueButton/MoveQueueButton";


const timeToFormat = (seconds: number) => {
    seconds = Math.floor(seconds)
    if (seconds < 60) return `00:${seconds< 10 ? `0${seconds}`: seconds}`
    const minutes = Math.floor(seconds / 60)
    seconds %= 60
    const out = `${minutes<10 ? `0${minutes}`: minutes}:${seconds<10 ? `0${seconds}`: seconds}`
    return out
}
const controller = new AbortController();

export default function MusicPlayerView() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const { musicPlayerProperties: {isOpen, musicId, settings, playlistId,}, dispatchMusicPlayerProperties} = useMusicPlayer()

    const [music, setMusic] = useState<TMusic | null>(null)
    const [isMusicPending, startMusicTransition] = useTransition()

    useEffect(() => {
        startMusicTransition( async () => {
            const theMusic = await getMusicById(musicId) || null
            setMusic(theMusic)
        })
    }, [musicId, playlistId])

    const [waiting, setWaiting] = useState(false)

    

    /* console.log(waiting)
    useEffect(() => {
        const audioElement = audioRef.current
        if (!audioElement) return
        audioElement.addEventListener("waiting", () => {
            
            setWaiting(true)
            
        } , {signal: controller.signal})
        audioElement.addEventListener("playing",() => {
            
            setWaiting(false)
        }, {signal: controller.signal})

        return () => {
            controller.abort()
        }

    }, [audioRef]) */
 
    
  return (
    <>
    {
        musicId !== 0  && music &&
        <> 

        <Audio src={music && music.music} ref={audioRef} /> 
        
    
    <motion.div 
        className={`bg-(--background) isolate ${isOpen ? "flex flex-col gap-3 fixed inset-0  p-4 z-1000 md:left-auto md:top-auto md:border-1 md:border-(--secondary-accent-color) ": "md:fixed md:left-(--header-width) md:inset-0 md:bottom-px  md:top-auto max-w-[100vw] overflow-hidden flex flex-row items-center py-2 px-2 gap-2 relative "}` }
        >
        
        
        {
            isOpen &&
            <div> 
                <button className="cursor-pointer" onClick={() => dispatchMusicPlayerProperties({type: ACTION_TYPES.CLOSE_VIEW })}>
                    <svg width="16" height="16" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 28.5L0 10.2568L4.2 6L18 19.9865L31.8 6L36 10.2568L18 28.5Z" fill="white"/>
                    </svg>
                </button>
            </div>
        }
        
        <div className={ `relative ${isOpen? "w-full aspect-square": "h-[50px]  aspect-square"}` } >
            <Image
                className="block w-full fit-contain max-h-full"
                draggable={false}
                src={music ? music.coverImage : "/da.png"} alt="music-cover" fill
            />
        </div>
        <button
            className={`absolute inset-0 z-0 cursor-pointer ${isOpen? "hidden": ""}` }
            onClick={() => dispatchMusicPlayerProperties({type: ACTION_TYPES.OPEN_VIEW })} 
        />
        <div className="flex flex-col gap-1 ">
            <ProgressBar audioRef={audioRef} readonly={!isOpen}/>

            {
                isOpen && 
                <div className="flex justify-between">
                    <span>
                        {timeToFormat(settings.currentTime)}
                    </span>
                    {
                        settings.duration!== -1 &&
                        <span>
                            {timeToFormat(settings.duration)}
                        </span>
                    }
                    
                </div>
            }
        </div>
        
        <div className="flex flex-col gap-[2px] flex-shrink-1 max-w-min">
            <h2 className="truncate max-sm:text-sm">{ music.title }</h2>
            <Link href={`/author/${music.author.id}`} className=" truncate text-sm text-[#bbbbbb]" onClick={(event) =>{if (!isOpen) event.preventDefault(); dispatchMusicPlayerProperties({type: ACTION_TYPES.CLOSE_VIEW }) } }> {music ? music.author.name : ""} </Link>
        </div>
        <div className={isOpen ? "flex gap-5 items-center justify-center" : "ms-auto flex gap-3 z-0 items-center"}>
            <MoveQueueButton type="backwards"/>
            { !waiting? <PlayButton  /> : "da"}
            <MoveQueueButton type="forwards"/>
          
        </div>

        {isOpen && (
            <div className="grid grid-cols-3 gap-1 mt-auto">
                <button>
                    Рекомендации
                </button>
                <button disabled>
                    Плейлист
                </button>
                <button disabled>
                    Текст
                </button>
            </div>
        )}
    </motion.div>
    
       
    </> 
        
    
  
    }

    </>
   ) 
}

/*  {
        musicPlayerProperties.isOpen && 

        <motion.div 
        
            transition={{
                ease: "linear",
                layout: {
                        
                     duration: 0.5
                     }
            }} 
            
            className="flex flex-col gap-3 fixed inset-0 bg-black p-4 z-999" >
            
                <div >
                    <Image className="w-full fit-contain" src={music ? music.coverImage : null} alt="music-cover" width={382} height={200} />
                </div>
               
                
                
               
        </motion.div>
    } */
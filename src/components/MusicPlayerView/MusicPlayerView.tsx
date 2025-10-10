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


const timeToFormat = (seconds: number) => {
    seconds = Math.floor(seconds)
    const minutes = Math.floor(seconds / 60)
    seconds %= 60
    const out = `${minutes<10 ? `0${minutes}`: minutes}:${seconds<10 ? `0${seconds}`: seconds}`
    return out
}

export default function MusicPlayerView() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const { musicPlayerProperties: {isOpen, musicId, settings, playlistId}, dispatchMusicPlayerProperties} = useMusicPlayer()

    const [music, setMusic] = useState<TMusic | null>(null)
    const [isMusicPending, startMusicTransition] = useTransition()

    useEffect(() => {
        startMusicTransition( async () => {
            const theMusic = await getMusicById(musicId) || null
            setMusic(theMusic)
        })
    }, [musicId, playlistId])
 
    
  return (
    <>
    {
        musicId !== 0  && music &&
        <> 

        <Audio src={music && music.music} ref={audioRef} /> 
        
    
    <motion.div 
        className={`bg-(--background) isolate ${isOpen ? "flex flex-col gap-3 fixed inset-0 p-4 z-1000": "flex flex-row items-center py-2 px-2 gap-2 relative w-full max-h-[65px]"}` }
        >
        
        
        {isOpen &&
            <div> 
                <button onClick={() => dispatchMusicPlayerProperties({type: ACTION_TYPES.CLOSE_VIEW })}>
                    <svg width="16" height="16" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 28.5L0 10.2568L4.2 6L18 19.9865L31.8 6L36 10.2568L18 28.5Z" fill="white"/>
                    </svg>
                </button>
            </div>
        }
        
        <div className={ `relative ${isOpen? "w-full aspect-square": "h-[50px]  aspect-square"}` } >
            <Image
                className="block w-full fit-contain max-h-full"
                src={music ? music.coverImage : "/da.png"} alt="music-cover" fill
            />
        </div>
        <button
            className={`absolute inset-0 z-0 ${isOpen? "hidden": ""}` }
            onClick={() => dispatchMusicPlayerProperties({type: ACTION_TYPES.OPEN_VIEW })} 
        />
        <div>
            <ProgressBar audioRef={audioRef} readonly={!isOpen}/>

            {
                isOpen && 
                <div className="flex justify-between">
                    <span>
                        {timeToFormat(settings.currentTime)}
                    </span>
                    <span>
                        {timeToFormat(settings.duration)}
                    </span>
                </div>
            }
        </div>
        
        <div className="flex flex-col gap-[2px]">
            <h2 className="">{ music.title }</h2>
            <Link href={`/author/${music.author.id}`} className="text-sm text-[#bbbbbb]" onClick={(event) =>{if (!isOpen) event.preventDefault(); dispatchMusicPlayerProperties({type: ACTION_TYPES.CLOSE_VIEW }) } }> {music ? music.author.name : ""} </Link>
        </div>
        <div className={isOpen ? "flex gap-5 items-center justify-center" : "ms-auto flex gap-3 z-0"}>
            <PlayButton  />
            {!isOpen && <CloseButton />}
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
                    Лирика
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
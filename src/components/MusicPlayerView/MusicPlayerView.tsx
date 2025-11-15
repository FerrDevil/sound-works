"use client"
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link";
import {  useMusicPlayerStore } from "./MusicPlayerStore";
import { getMusicById, TMusic } from "./MusicPlayer.actions";
import Audio from "./Audio";
import PlayButton from "./UIElements/PlayButton/PlayButton";
import ProgressBar from "./UIElements/ProgressBar/ProgressBar";

import MoveQueueButton from "./UIElements/MoveQueueButton/MoveQueueButton";
import VolumeSlider from "./UIElements/VolumeSlider/VolumeSlider";
import { useShallow } from "zustand/shallow";
import RepeatButton from "./UIElements/RepeatButton/RepeatButton";
import FavouriteButton from "./UIElements/FavouriteButton/FavouriteButton";
import Queue from "./UIElements/Queue/Queue";


const timeToFormat = (seconds: number) => {
    seconds = Math.floor(seconds)
    if (seconds < 60) return `00:${seconds< 10 ? `0${seconds}`: seconds}`
    const minutes = Math.floor(seconds / 60)
    seconds %= 60
    const out = `${minutes<10 ? `0${minutes}`: minutes}:${seconds<10 ? `0${seconds}`: seconds}`
    return out
}
/* const controller = new AbortController(); */

export default function MusicPlayerView() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { isOpen, musicId, playlistId, currentTime, duration, openView, closeView } =  useMusicPlayerStore( useShallow( state => ({
        isOpen: state.isOpen,
        musicId: state.musicId,
        playlistId: state.playlistId,
        currentTime: state.settings.currentTime,
        duration: state.settings.duration,
        openView: state.openView,
        closeView: state.closeView,
    }) ) )


    const [music, setMusic] = useState<TMusic | null>(null)
    const [isMusicPending, startMusicTransition] = useTransition()

    const [expandMenu, setExpandMenu] = useState<"queue" | "lyrics" | "recommendations" | null>(null)

    useEffect(() => {
        startMusicTransition( async () => {
            const theMusic = await getMusicById(musicId) || null
            setMusic(theMusic)
        })
    }, [musicId, playlistId])

    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden"
        else document.body.style.overflow = "unset"
    }, [isOpen])

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
        className={`bg-(--background) isolate ${isOpen ? `flex flex-col *:w-full *:max-w-[50rem] *:mx-auto fixed inset-0 overflow-hidden max-w-[100svw] max-h-[100svh] ` : "md:fixed md:left-(--main-content-ml) md:inset-0 md:bottom-px  md:top-auto max-w-[100vw]  "}` }
    >
        <div className={`${isOpen && !expandMenu  ? "flex flex-col gap-3 p-4 shrink-0": "overflow-hidden flex flex-row items-center py-2 px-2 gap-2 relative shrink-0"}`}>
            {
                isOpen && !expandMenu &&
                <div> 
                    <button className="cursor-pointer" onClick={() => closeView()}>
                        <svg className="fill-white" width="16" height="16" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 28.5L0 10.2568L4.2 6L18 19.9865L31.8 6L36 10.2568L18 28.5Z" fill="white"/>
                        </svg>
                    </button>
                </div>
            }
        
            <div className={ `relative ${isOpen && !expandMenu? "w-full aspect-square": "h-[50px]  aspect-square"}` } >
                <Image
                    className="block w-full fit-contain max-h-full"
                    draggable={false}
                    src={music ? music.coverImage : "/da.png"} alt="music-cover" fill
                />
            </div>
            <button
                className={`absolute inset-0 z-0 cursor-pointer ${isOpen && !expandMenu? "hidden": ""}` }
                onClick={() => expandMenu ? setExpandMenu(null) : openView()} 
            />
            <div className={`flex flex-col gap-1 ${!isOpen ? "absol": ""}`}>
                <ProgressBar audioRef={audioRef} readonly={!isOpen || !!expandMenu}/>

                {
                    isOpen && !expandMenu &&  
                    <div className="flex justify-between">
                        <span>
                            {timeToFormat(currentTime)}
                        </span>
                        {
                            duration!== -1 &&
                            <span>
                                {timeToFormat(duration)}
                            </span>
                        }
                        
                    </div>
                }
            </div>
            
            <div className="flex flex-col gap-[2px] flex-shrink-1 max-w-min">
                <h2 className="truncate ">{ music.title }</h2>
                <Link href={`/author/${music.author.id}`} className=" truncate  text-[#bbbbbb]" 
                    onClick={(event) => {
                        if (!isOpen && !!expandMenu) event.preventDefault()
                        closeView()
                    } }      
                > {music ? music.author.name : ""} </Link>
            </div>
            <div className={isOpen && !expandMenu ? "flex gap-5 items-center justify-evenly" : "ml-auto flex gap-3 z-0 items-center"}>
                { isOpen && !expandMenu && <VolumeSlider/> }
                <MoveQueueButton expandMenu={!!expandMenu} type="backwards"/>
                { !waiting? <PlayButton expandMenu={!!expandMenu} /> : "da"}
                <MoveQueueButton expandMenu={!!expandMenu} type="forwards"/>
                { isOpen && !expandMenu && <RepeatButton/> }
                
            </div>

            {
                isOpen && !expandMenu &&
                <div className=" overflow-x-auto w-full mt-2">
                    <div className="flex gap-2 no-wrap ">
                        <FavouriteButton/>
                        <button className="flex gap-2 rounded-[10px] cursor-pointer items-center px-4 py-1 bg-[#6E6E7755] truncate grow-0 shrink-0">
                            
                            <svg className="h-[1.4rem] w-[1.4rem] fill-white" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.75 14.6667V12.8333H9.16667V14.6667H2.75ZM2.75 11V9.16667H12.8333V11H2.75ZM2.75 7.33333V5.5H12.8333V7.33333H2.75ZM14.6667 18.3333V14.6667H11V12.8333H14.6667V9.16667H16.5V12.8333H20.1667V14.6667H16.5V18.3333H14.6667Z" fill="white"/>
                            </svg>
                        <span>В плейлист</span> 
                        </button>
                        <button className="flex gap-2 rounded-[10px] cursor-pointer items-center px-4 py-1 bg-[#6E6E7755] truncate grow-0 shrink-0">
                        
                            <svg className="h-[1rem] w-[1rem] fill-white" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.31346 18.375L0.375 16.4365L13.6673 3.14423H1.75962V0.375H18.375V16.9904H15.6058V5.08269L2.31346 18.375Z" fill="white"/>
                            </svg>
                            <span>Поделиться</span> 
                        </button>
                    </div>
                </div>
            }

        </div>
        

        {
            isOpen && (
            <div className={`flex flex-col shrink-0    ${!expandMenu? "mt-auto": "grow"}`}>
                <div className={`grid p-2`}>
                
                    <div className="grid grid-cols-3 gap-1  place-items-center">
                        <button className="disabled:fill-(--secondary-accent-color) fill-white not-disabled:cursor-pointer" onClick={() => setExpandMenu("queue")}>
                            <svg width="36" height="36" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {
                                    playlistId !== 0 ?
                                        <path d="M0.961426 31.4103V26.282H21.2043V31.4103H0.961426ZM0.961426 21.1538V16.0256H31.3258V21.1538H0.961426ZM0.961426 10.8974V5.76923H31.3258V10.8974H0.961426ZM33.8562 44.2308V23.7179L49.0383 33.9744L33.8562 44.2308Z" fill="white"/>
                                    :
                                        <path d="M34.8686 41.6667C32.767 41.6667 30.9806 40.9288 29.5095 39.4531C28.0384 37.9774 27.3028 36.1855 27.3028 34.0774C27.3028 31.9692 28.0384 30.1773 29.5095 28.7016C30.9806 27.2259 32.767 26.4881 34.8686 26.4881C35.3309 26.4881 35.7723 26.5197 36.1926 26.583C36.6129 26.6462 37.0122 26.7832 37.3905 26.994V6.25H50.0002V11.3095H42.4344V34.0774C42.4344 36.1855 41.6988 37.9774 40.2277 39.4531C38.7566 40.9288 36.9702 41.6667 34.8686 41.6667ZM2.0835 31.5476V26.4881H22.2589V31.5476H2.0835ZM2.0835 21.4286V16.369H32.3467V21.4286H2.0835ZM2.0835 11.3095V6.25H32.3467V11.3095H2.0835Z" fill="white"/>

                                }

                            </svg>
                        </button>
                        <button disabled className="disabled:fill-(--secondary-accent-color) fill-white not-disabled:cursor-pointer">
                            <svg width="36" height="36" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.16675 45.8333V8.33331C4.16675 7.18748 4.57473 6.20658 5.39071 5.3906C6.20668 4.57463 7.18758 4.16665 8.33342 4.16665H31.2501C32.3959 4.16665 33.3768 4.57463 34.1928 5.3906C35.0088 6.20658 35.4167 7.18748 35.4167 8.33331V9.21873C34.5834 9.60067 33.8195 10.0694 33.1251 10.625C32.4306 11.1805 31.8056 11.8055 31.2501 12.5V8.33331H8.33342V35.7812L10.7813 33.3333H31.2501V25C31.8056 25.6944 32.4306 26.3194 33.1251 26.875C33.8195 27.4305 34.5834 27.8993 35.4167 28.2812V33.3333C35.4167 34.4791 35.0088 35.46 34.1928 36.276C33.3768 37.092 32.3959 37.5 31.2501 37.5H12.5001L4.16675 45.8333ZM12.5001 29.1666H20.8334V25H12.5001V29.1666ZM39.5834 25C37.8473 25 36.3716 24.3923 35.1563 23.1771C33.9411 21.9618 33.3334 20.4861 33.3334 18.75C33.3334 17.0139 33.9411 15.5382 35.1563 14.3229C36.3716 13.1076 37.8473 12.5 39.5834 12.5C39.9654 12.5 40.3299 12.5347 40.6772 12.6041C41.0244 12.6736 41.3543 12.7604 41.6668 12.8646V2.08331H50.0001V6.24998H45.8334V18.75C45.8334 20.4861 45.2258 21.9618 44.0105 23.1771C42.7952 24.3923 41.3195 25 39.5834 25ZM12.5001 22.9166H27.0834V18.75H12.5001V22.9166ZM12.5001 16.6666H27.0834V12.5H12.5001V16.6666Z" />
                            </svg>
                        </button>
                        <button disabled className="disabled:fill-(--secondary-accent-color) fill-white not-disabled:cursor-pointer">
                            <svg width="36" height="36" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M34.8686 41.6667C32.767 41.6667 30.9806 40.9288 29.5095 39.4531C28.0384 37.9774 27.3028 36.1855 27.3028 34.0774C27.3028 31.9692 28.0384 30.1773 29.5095 28.7016C30.9806 27.2259 32.767 26.4881 34.8686 26.4881C35.3309 26.4881 35.7723 26.5197 36.1926 26.583C36.6129 26.6462 37.0122 26.7832 37.3905 26.994V6.25H50.0002V11.3095H42.4344V34.0774C42.4344 36.1855 41.6988 37.9774 40.2277 39.4531C38.7566 40.9288 36.9702 41.6667 34.8686 41.6667ZM2.0835 31.5476V26.4881H22.2589V31.5476H2.0835ZM2.0835 21.4286V16.369H32.3467V21.4286H2.0835ZM2.0835 11.3095V6.25H32.3467V11.3095H2.0835Z" fill="white"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <Queue show={!!expandMenu}/> 
                
            </div>
            )
        }

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
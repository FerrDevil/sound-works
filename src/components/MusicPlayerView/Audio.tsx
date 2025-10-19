"use client"

import { useEffect } from "react"
import { useMusicPlayer, ACTION_TYPES } from "./MusicPlayerProvider"

type AudioProps = {
    ref:  React.RefObject<HTMLAudioElement | null>,
    src: string | null
}

export default function Audio({ref, src}: AudioProps) {
    const { musicPlayerProperties:{settings: {state}}, dispatchMusicPlayerProperties } = useMusicPlayer()

    useEffect(() => {
        if (!ref.current ) return;
        ref.current.volume = 0.2
    }, [ref])

       useEffect(() => {
        const callback = async () => {
            if (!ref.current ) return;
            if (state === "playing") ref.current.play() 
            else if (state === "paused"){
                ref.current.pause()
            }  
        }
        callback()

    }, [state])

    const onTimeUpdate : React.ReactEventHandler<HTMLAudioElement>  = (event) => {
        dispatchMusicPlayerProperties({type: ACTION_TYPES.SET_CURRENT_TIME, payload: { currentTime: event.currentTarget.currentTime} })
    
    }
    const onEnded : React.ReactEventHandler<HTMLAudioElement> = () => {
        dispatchMusicPlayerProperties({type: ACTION_TYPES.SET_MUSIC_STATE, payload: {state: "ended"}})
    }

    const onLoaded: React.ReactEventHandler<HTMLAudioElement> = (event) => {
        dispatchMusicPlayerProperties({type: ACTION_TYPES.SET_DURATION, payload: { duration: event.currentTarget.duration} })
        
    }
    const setPlay = () => { dispatchMusicPlayerProperties({type: ACTION_TYPES.SET_MUSIC_STATE, payload: {state: "playing"}}) }
    return (
        <>
        {
            src &&  
            <audio className="hidden" ref={ref} src={src} 
                
                onCanPlay={setPlay}
                onLoadedMetadata={onLoaded}
                onPause={() => dispatchMusicPlayerProperties({type: ACTION_TYPES.SET_MUSIC_STATE, payload: {state: "paused"}})}
                onPlaying={() => dispatchMusicPlayerProperties({type: ACTION_TYPES.SET_MUSIC_STATE, payload: {state: "playing"}})}
                onEnded={onEnded}
                onTimeUpdate={onTimeUpdate}
                /* onWaiting={() => console.log("waiting")} */
            />
        }
        </>
        
    )
}

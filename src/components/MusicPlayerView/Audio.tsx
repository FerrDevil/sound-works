"use client"

import { useEffect } from "react"
import { useMusicPlayer, ACTION_TYPES } from "./MusicPlayerProvider"

type AudioProps = {
    ref:  React.RefObject<HTMLAudioElement | null>,
    src: string | null
}

export default function Audio({ref, src}: AudioProps) {
    const { musicPlayerProperties, dispatchMusicPlayerProperties } = useMusicPlayer()

    useEffect(() => {
        if (!ref.current ) return;
        ref.current.volume = 0.2
    }, [ref])

       useEffect(() => {
        if (!ref.current ) return;
        if (musicPlayerProperties.settings.state === "playing") ref.current.play() 
        else if (musicPlayerProperties.settings.state === "paused") ref.current.pause()

    }, [musicPlayerProperties.settings.state])

    const onTimeUpdate : React.ReactEventHandler<HTMLAudioElement>  = (event) => {
        dispatchMusicPlayerProperties({type: ACTION_TYPES.SET_CURRENT_TIME, payload: { currentTime: (event.target as HTMLAudioElement).currentTime} })
        
    }
    const onEnded : React.ReactEventHandler<HTMLAudioElement> = () => {
        dispatchMusicPlayerProperties({type: ACTION_TYPES.SET_MUSIC_STATE, payload: {state: "ended"}})
    }

    const onLoaded: React.ReactEventHandler<HTMLAudioElement> = (event) => {
        dispatchMusicPlayerProperties({type: ACTION_TYPES.SET_DURATION, payload: { duration: (event.target as HTMLAudioElement).duration} })
        
    }
    const setPlay = () => {
       
        dispatchMusicPlayerProperties({
            type: ACTION_TYPES.SET_MUSIC_STATE, payload: {state: "playing"}
        })

    }
    return (
        <>
        {
            src && 
            <audio className="hidden" ref={ref} controls src={src} 
                onCanPlay={setPlay}
                onLoadedMetadata={onLoaded}
               
                onEnded={onEnded}
                onTimeUpdate={onTimeUpdate}
            />
        }
        </>
        
    )
}

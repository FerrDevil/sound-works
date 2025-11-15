"use client"

import { memo, useEffect } from "react"
import { useMusicPlayerStore } from "./MusicPlayerStore"
import { useShallow } from "zustand/shallow"

type AudioProps = {
    ref:  React.RefObject<HTMLAudioElement | null>,
    src: string | null
}

export default memo(function Audio({ref, src}: AudioProps) {

    const { volume, state, repeat, setCurrentTime, setMusicState, setDuration, toggleRepeat, setQueueItem } =  useMusicPlayerStore( useShallow( state => (
        {
            volume: state.volume,
            state: state.settings.state, 
            repeat: state.repeat,
            /* queue: state.queue,
            musicId: state.musicId, */
            toggleRepeat: state.toggleRepeat,
            setCurrentTime: state.setCurrentTime, 
            setMusicState: state.setMusicState, 
            setDuration: state.setDuration,
            setQueueItem: state.setQueueItem
        }) ) )
    

    useEffect(() => {
        if(!ref.current) return
        ref.current.volume = volume
    }, [volume, ref])

    useEffect(() => {
        const callback = async () => {
            if (!ref.current ) return;
            if (state === "playing") ref.current.play() 
            else if (state === "paused"){
                ref.current.pause()
            }  
        }
        callback()

    }, [state, ref])

    const onTimeUpdate : React.ReactEventHandler<HTMLAudioElement>  = (event) => {
       
        setCurrentTime(event.currentTarget.currentTime)
    
    }
    const onEnded : React.ReactEventHandler<HTMLAudioElement> = () => {
        if (repeat){
            setCurrentTime(0)
            setMusicState("playing")
            toggleRepeat()
            return
        } 
        setMusicState("ended")
        setTimeout(() => {
            setQueueItem("next")
        }, 3000)
    }

    const onLoaded: React.ReactEventHandler<HTMLAudioElement> = (event) => {
       
        setDuration(event.currentTarget.duration)
        
    }
    const setPlay = () => {  setMusicState("playing")}
    return (
        <>
        {
            src &&  
            <audio className="hidden" ref={ref} src={src} 
                
                onCanPlay={setPlay}
                onLoadedMetadata={onLoaded}
                onPause={() => setMusicState("paused") }
                onPlaying={() => setMusicState("playing") }
                onEnded={onEnded}
                onTimeUpdate={onTimeUpdate}
                /* onWaiting={() => console.log("waiting")} */
            />
        }
        </>
        
    )
})

"use client"

import { ACTION_TYPES, useMusicPlayer } from "../../MusicPlayerProvider"

type MoveQueueButtonProps = {
    type: "forwards" | "backwards"
}

export default function MoveQueueButton({type}: MoveQueueButtonProps) {
    const { musicPlayerProperties: {queue, musicId}, dispatchMusicPlayerProperties } = useMusicPlayer()
    const trackQueueIndex = queue.findIndex((item) => item === musicId)
    const disabled = trackQueueIndex === 0 && type === "backwards" || trackQueueIndex + 1 === queue.length && type === "forwards"


    const onClick = () => {
        dispatchMusicPlayerProperties({
            type: ACTION_TYPES.SET_MUSIC,
            payload: {
                musicId: type === "forwards" ? queue[trackQueueIndex+1]: queue[trackQueueIndex-1]
            }
        })
    }

    return (
        <button className="grid cursor-pointer h-full aspect-square disabled:cursor-auto" disabled={disabled} onClick={onClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={` w-full h-full ${disabled ? "fill-(--disabled-color)" : "fill-white"} `}>
            
                {
                    type === "backwards"?
                        <path d="M0 25V1H3.69231V25H0ZM24 25L7.38462 13L24 1V25ZM20.3077 17.5V8.5L14.0308 13L20.3077 17.5Z" />
                    :
                        <path d="M20.3077 24V0H24V24H20.3077ZM0 24V0L16.6154 12L0 24ZM3.69231 16.5L9.96923 12L3.69231 7.5V16.5Z" />
                }
                
            
            </svg>

        </button>
    )
}

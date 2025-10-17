"use client"
import { useMusicPlayer, ACTION_TYPES } from "../MusicPlayerView/MusicPlayerProvider"

type MusicPlayerOpenerButtonProps = { 
    playlistId?: number,
    musicId?: number,
    needQueueChange?: boolean,
    queue?: number[]
} & React.PropsWithChildren & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function MusicPlayerOpenerButton({playlistId=0, musicId=0, needQueueChange=false, queue=[], children, ...buttonArgs} : MusicPlayerOpenerButtonProps) {

    const { dispatchMusicPlayerProperties} = useMusicPlayer()


    const onClick = () => {
        dispatchMusicPlayerProperties({
            type: ACTION_TYPES.SET_MUSIC,
            payload: {playlistId, musicId, needQueueChange, queue}
        })
    }
    return (
        <button onClick={onClick} {...buttonArgs}>{children}</button>
    )
}

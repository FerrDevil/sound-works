"use client"
import { useMusicPlayerStore } from "../MusicPlayerView/MusicPlayerStore"

type MusicPlayerOpenerButtonProps = { 
    playlistId?: number,
    musicId?: number,
    needQueueChange?: boolean,
    queue?: number[]
} & React.PropsWithChildren & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function MusicPlayerOpenerButton({playlistId=0, musicId=0, needQueueChange=false, queue=[], children, ...buttonArgs} : MusicPlayerOpenerButtonProps) {
    const setMusic =  useMusicPlayerStore( state => state.setMusic )

    const onClick = () => setMusic({playlistId, musicId, needQueueChange, queue})
    return (
        <button onClick={onClick} {...buttonArgs}>{children}</button>
    )
}

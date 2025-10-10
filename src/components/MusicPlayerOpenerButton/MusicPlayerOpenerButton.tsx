"use client"
import { useMusicPlayer, ACTION_TYPES } from "../MusicPlayerView/MusicPlayerProvider"

type MusicPlayerOpenerButtonProps = { 
    playlistId?: number,
    musicId?: number
} & React.PropsWithChildren & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function MusicPlayerOpenerButton({playlistId=0, musicId=0, children, ...buttonArgs} : MusicPlayerOpenerButtonProps) {

    const { dispatchMusicPlayerProperties} = useMusicPlayer()


    const onClick = () => {
        dispatchMusicPlayerProperties({
            type: ACTION_TYPES.SET_MUSIC,
            payload: {playlistId, musicId}
        })
    }
    return (
        <button onClick={onClick} {...buttonArgs}>{children}</button>
    )
}

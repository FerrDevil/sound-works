"use client"
import { useMusicPlayer, ACTION_TYPES } from "../MusicPlayerView/MusicPlayerProvider"

type MusicPlayerOpenerButtonProps = { 
    playlistId?: number,
    musicId?: number
} & React.PropsWithChildren

export default function MusicPlayerOpenerButton(props : MusicPlayerOpenerButtonProps) {
    const {playlistId=0, musicId=0} = props 
    const { dispatchMusicPlayerProperties} = useMusicPlayer()


    const onClick = () => {
        dispatchMusicPlayerProperties({
            type: ACTION_TYPES.SET_MUSIC,
            payload: {playlistId, musicId}
        })
    }
    return (
        <button onClick={onClick}>{props.children}</button>
    )
}

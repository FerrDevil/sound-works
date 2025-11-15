"use client"

import { ACTION_TYPES, useMusicPlayer } from "../../MusicPlayerStore"

export default function CloseButton() {
    const { dispatchMusicPlayerProperties } = useMusicPlayer()
    return (
        <button className="cursor-pointer" onClick={() => dispatchMusicPlayerProperties({type: ACTION_TYPES.RESET}) }>
            <svg width="36" height="36" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="M4.4 44L0 39.6L17.6 22L0 4.4L4.4 0L22 17.6L39.6 0L44 4.4L26.4 22L44 39.6L39.6 44L22 26.4L4.4 44Z" fill="white"/>
                </g>
            </svg>
        </button>
    )
}

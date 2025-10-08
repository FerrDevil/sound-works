"use client"


import { ACTION_TYPES, useMusicPlayer } from "../../MusicPlayerProvider"

export default function PlayButton({}) {
    const { musicPlayerProperties: {settings: {state}}, dispatchMusicPlayerProperties } = useMusicPlayer()
    const onClick = () => {
        dispatchMusicPlayerProperties({type: ACTION_TYPES.SET_MUSIC_STATE, payload: {state: state === "playing"? "paused" : "playing"}})
        
    }
    
    return (
        <button className="cursor-pointer" onClick={ onClick }>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    {
                        state === "playing" ?
                            <path d="M13.3333 9.53674e-07V37H3V9.53674e-07H13.3333ZM34 9.53674e-07V37H23.6667V9.53674e-07H34Z" fill="white"/> 
                        :
                        state === "paused"?
                            <path d="M3.49072 37V0L34.2077 18.5L3.49072 37Z" fill="white"/>
                        :
                        <path d="M17.993 33C16.118 32.9991 14.362 32.6421 12.7248 31.9288C11.0876 31.2156 9.66305 30.2524 8.45111 29.0393C7.23917 27.8263 6.27733 26.4008 5.56558 24.763C4.85384 23.1252 4.4984 21.3688 4.49926 19.4938C4.50013 17.6188 4.85719 15.8627 5.57045 14.2255C6.2837 12.5883 7.24686 11.1638 8.45992 9.95185C9.67298 8.73991 11.0984 7.77807 12.7362 7.06632C14.3741 6.35458 16.1305 5.99914 18.0055 6L18.2305 6.00011L15.9066 3.67403L18.0076 1.5L24.0048 7.50277L18.002 13.5L15.903 11.324L18.2291 9.0001L18.0041 9C15.0791 8.99865 12.5974 10.0163 10.5589 12.0528C8.52051 14.0894 7.50061 16.5702 7.49926 19.4952C7.49792 22.4202 8.51552 24.9019 10.5521 26.9403C12.5886 28.9788 15.0694 29.9986 17.9944 30C20.9194 30.0013 23.4011 28.9837 25.4396 26.9472C27.478 24.9106 28.4979 22.4298 28.4993 19.5048L31.4993 19.5062C31.4984 21.3812 31.1413 23.1373 30.4281 24.7745C29.7148 26.4117 28.7517 27.8362 27.5386 29.0482C26.3256 30.2601 24.9001 31.2219 23.2623 31.9337C21.6244 32.6454 19.868 33.0009 17.993 33Z" fill="white"/>
                    }
                </g>
            </svg>
        </button>
    )
}

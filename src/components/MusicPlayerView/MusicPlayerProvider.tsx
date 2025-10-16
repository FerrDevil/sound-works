"use client"

import { createContext, useContext, useReducer } from "react"


const actionTypesValues = ["SET_MUSIC", "OPEN_VIEW", "CLOSE_VIEW", "RESET", "SET_MUSIC_STATE", "SET_DURATION", "SET_CURRENT_TIME"] as const

type ActionTypes = typeof actionTypesValues[number]


export const ACTION_TYPES: Record<ActionTypes, number> = {
    SET_MUSIC: 0,
    OPEN_VIEW: 1,
    CLOSE_VIEW: 2,
    RESET: 3,
    SET_MUSIC_STATE: 4,
    SET_DURATION: 5,
    SET_CURRENT_TIME: 6
}
type TPlayingState = "playing" | "paused" | "ended"

type TMainMusicState = {
    isOpen: boolean,
    settings: {
        state: TPlayingState,
        duration: number,
        currentTime: number, 
        volume: number 
    }
}

type TState = {
    playlistId: number ,
    musicId: number,
    queue: number[],
} & TMainMusicState


type DispatchArgs = {
    type: number,
    payload?: Record<string, string | number | boolean>
}

type TMusicPlayerContext = {
    musicPlayerProperties: TState
    dispatchMusicPlayerProperties : React.ActionDispatch<[action: DispatchArgs]>
} 

const initialState: TState = { 
    playlistId: 0,
    musicId: 0,
    queue: [],
    isOpen: false,
    settings: {
        state: "paused",
        duration: -1,
        currentTime: 0,
        volume: 0.2
    }
 }

const MusicPlayerContext = createContext<TMusicPlayerContext | null>(null)

function musicPlayerReducer(state: TState, action: DispatchArgs): TState{
    switch(action.type){
        case ACTION_TYPES.SET_MUSIC:{
            if (!action.payload){
                throw Error("No payload provided for dispatch type:" + action.type)
            }
            const { musicId , playlistId, needQueueChange } = action.payload
            if (musicId === state.musicId){
                return state
            }
            
            const currentTrackQueueIndex = state.queue.findIndex((item) => item === state.musicId)
            const newTrackQueueIndex = state.queue.findIndex((item) => item === musicId)
            const newTrackInQueue = newTrackQueueIndex !== -1
            const queue = needQueueChange ? 
                [musicId as number]     
            :
                newTrackInQueue ?
                    state.queue
                   
                   
                :
                    [...state.queue.slice(0, currentTrackQueueIndex+1), musicId as number]
                
                  
             
                
            return {
                ...state,
                settings: {
                    ...initialState.settings
                },
                musicId: (musicId as number),
                playlistId: (playlistId as number),
                queue: queue
            }
        }
        case ACTION_TYPES.OPEN_VIEW:{
            
            return {
                ...state,
                isOpen: true
            }
        }
        case ACTION_TYPES.CLOSE_VIEW:{
            
            return {
                ...state,
                isOpen: false
            }
        }

        case ACTION_TYPES.RESET:{
            
            return initialState
        }
        case ACTION_TYPES.SET_MUSIC_STATE:{
            if (!action.payload){
                throw Error("No action provided for dispatch type:" + action.type)
            }
            return {
                ...state,
                settings: {
                    ...state.settings,
                    state: action.payload.state as TPlayingState
                }
            }
        }
        
        case ACTION_TYPES.SET_CURRENT_TIME:{
            if (!action.payload){
                throw Error("No action provided for dispatch type:" + action.type)
            }
            return {
                ...state,
                settings: {
                    ...state.settings,
                    currentTime: action.payload.currentTime as number
                }
            }
        }
        case ACTION_TYPES.SET_DURATION:{
            if (!action.payload){
                throw Error("No action provided for dispatch type:" + action.type)
            }
            return {
                ...state,
                settings: {
                    ...state.settings,
                    duration: action.payload.duration as number
                }
            }
        }
        default: {
            throw Error("No such dispatch type is present:" + action.type)
        }
    }
}

export const useMusicPlayer = () => {
        const musicPlayerProperties = useContext(MusicPlayerContext)
        if (!musicPlayerProperties) throw Error("MusicPlayerContext is not provided")
        return musicPlayerProperties
    
    
}

export default function MusicPlayerProvider({children}: React.PropsWithChildren) {
    const [musicPlayerProperties, dispatchMusicPlayerProperties] = useReducer(musicPlayerReducer, initialState)
    console.log(musicPlayerProperties.queue)
    return (
        <MusicPlayerContext.Provider value={{musicPlayerProperties, dispatchMusicPlayerProperties }}>{children}</MusicPlayerContext.Provider>
    )
}

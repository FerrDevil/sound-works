"use client"

import { createContext, useContext, useReducer } from "react"


const actionTypesValues = ["SET_MUSIC", "OPEN_VIEW", "CLOSE_VIEW", "RESET", "SET_MUSIC_STATE", "SET_DURATION", "SET_CURRENT_TIME"] as const

type ActionTypes = typeof actionTypesValues[number]


export const ACTION_TYPES: Record<ActionTypes, ActionTypes> = {
    SET_MUSIC: "SET_MUSIC",
    OPEN_VIEW: "OPEN_VIEW",
    CLOSE_VIEW: "CLOSE_VIEW",
    RESET: "RESET",
    SET_MUSIC_STATE: "SET_MUSIC_STATE",
    SET_DURATION: "SET_DURATION",
    SET_CURRENT_TIME: "SET_CURRENT_TIME"
}
type TMusicState = "playing" | "paused" | "ended"

type TMainMusicState = {
    isOpen: boolean,
    settings: {
        state: TMusicState,
        duration: number,
        currentTime: number, 
        volume: number 
    }
}

type TState = {
    playlistId: number ,
    musicId: number, 
} & TMainMusicState



type DispatchArgs = {
    type: ActionTypes,
    payload?: Record<string, string | number>
}

type TMusicPlayerContext = {
    musicPlayerProperties: TState
    dispatchMusicPlayerProperties : React.ActionDispatch<[action: DispatchArgs]>
} 

const initialState: TState = { 
    playlistId: 0,
    musicId: 0,
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
            if (action.payload.musicId === state.musicId){
                return state
            }
            return {
                ...state,
                settings: {
                    ...initialState.settings
                },
                musicId: (action.payload.musicId as number),
                playlistId: (action.payload.playlistId as number),
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
                    state: action.payload.state as TMusicState
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
    return (
        <MusicPlayerContext.Provider value={{musicPlayerProperties, dispatchMusicPlayerProperties }}>{children}</MusicPlayerContext.Provider>
    )
}

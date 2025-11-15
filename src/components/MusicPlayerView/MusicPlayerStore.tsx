"use client"

import { create } from "zustand"



type TPlayingState = "playing" | "paused" | "ended"

type TMainMusicState = {
    isOpen: boolean,
    settings: {
        state: TPlayingState,
        duration: number,
        currentTime: number, 
        
    },
    volume: number,
    repeat: boolean, 
}

type TState = {
    playlistId: number ,
    musicId: number,
    queue: number[],
} & TMainMusicState



const initialState: TState = { 
    playlistId: 0,
    musicId: 0,
    queue: [],
    isOpen: false,
    settings: {
        state: "paused",
        duration: -1,
        currentTime: 0,
        
    },
    volume: 0.5,
    repeat: false,
}

type TAction = {
    setMusic: (payload: { musicId: number , playlistId: number, needQueueChange: boolean, queue: number[]}) => void,
    openView: () => void,
    closeView: () => void,
    reset: () => void,
    setMusicState: (newState: TPlayingState) => void,
    setCurrentTime: (newCurrentTime: number) => void,
    setDuration: (newDuration: number) => void,
    setVolume: (newVolume: number) => void,
    setQueueItem: (to: "previous"| "next") => void,
    setQueueItemById: (id: number) => void,
    toggleRepeat: () => void
} 

type SetMusicPayload = { musicId: number , playlistId: number, needQueueChange: boolean, queue: number[]}


export const useMusicPlayerStore = create<TState & TAction>((set) => ({
    ...initialState,
    setMusic: (payload: SetMusicPayload ) => {
        if (!payload){
            throw Error("No payload provided for setMusic")
        }
        const { musicId , playlistId, needQueueChange, queue } = payload
        set((state) => {
            const currentTrackQueueIndex = state.queue.findIndex((item) => item === state.musicId)
            const newTrackQueueIndex = state.queue.findIndex((item) => item === musicId)
            const newTrackInQueue = newTrackQueueIndex !== -1
            const q = needQueueChange ? 
                [musicId]     
            :
                newTrackInQueue ?
                    state.queue
                :
                    [...state.queue.slice(0, currentTrackQueueIndex+1), musicId]
  
            return {
                settings: musicId !== state.musicId ? initialState.settings : state.settings,
                musicId: musicId,
                playlistId: playlistId ? playlistId : state.playlistId,
                queue: queue && queue.length !== 0 ? queue : q
            }
        })    
            
    },
    setQueueItem: (to) => set((state) => {
        const trackQueueIndex = state.queue.findIndex((item) => item === state.musicId) 
        let newMusicId = state.queue[trackQueueIndex]
        let shouldUpdateSettings = false
        if(to === "next"){
            if(trackQueueIndex + 1 < state.queue.length){
                shouldUpdateSettings = true
                newMusicId = state.queue[trackQueueIndex+1] 
            } 
        }
        else{
            if (trackQueueIndex - 1 >= 0){
                shouldUpdateSettings = true
                newMusicId = state.queue[trackQueueIndex-1]
            }
        }
        return {
            settings: shouldUpdateSettings? initialState.settings : state.settings,
            musicId: newMusicId
            }
    }),
    setQueueItemById: (id: number) => set((state) => {
        if (!state.queue.includes(id)) return state
        return {
            settings: initialState.settings,
            musicId: id
        }
    }),
    openView: () => set(() => ({ isOpen: true })),
    closeView: () => set(() => ({ isOpen: false })),
    reset: () => set(() => ({ ...initialState } )),
    setMusicState: (newState: TPlayingState) => set(state => ({settings: {...state.settings, state: newState}})),
    setCurrentTime: (newCurrentTime: number) => set(state => ({settings: {...state.settings, currentTime: newCurrentTime}})),
    setDuration: (newDuration: number) => set(state => ({settings: {...state.settings, duration: newDuration}})),
    setVolume: (newVolume: number) => set(() => ({ volume: newVolume})),
    toggleRepeat: () => set(state => ({ repeat: !state.repeat}))
}))


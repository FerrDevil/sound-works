"use client"

import Image from 'next/image'
import { memo, useEffect, useState, useTransition } from 'react'
import { useMusicPlayerStore } from '../../MusicPlayerStore'
import { useShallow } from 'zustand/shallow'
import { getQueueTracks, TMusic } from '../../MusicPlayer.actions'

export default memo(function Queue({show}: {show: boolean}) {
    const { musicId, playlistId, queue, setQueueItemById } = useMusicPlayerStore(useShallow(state => ({
        musicId: state.musicId,
        playlistId: state.playlistId,
        queue: state.queue,
        setQueueItemById: state.setQueueItemById
    })))

    const [tracks, setTracks] = useState<TMusic[]>([])

    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition(async () => {
            setTracks(await getQueueTracks(queue))
        })
    }, [])

    console.log("render")

    
    return (
        <div className={`relative grow ${!show ? "hidden": ""}`}>
            <div className="flex flex-col absolute overflow-y-auto inset-0 divide-[#404040] divide-solid divide-y-1">
                {
                    tracks.map((track) => (
                       <button key={track.id} className={`flex p-2 gap-4  ${track.id == musicId? "bg-[#404040] ": "cursor-pointer"}`} onClick={() => track.id !== musicId && setQueueItemById(track.id)}>
                            <div className={ `max-w-[48px] relative w-full aspect-square` } >
                                <Image
                                    className="block w-full fit-contain max-h-full"
                                    draggable={false}
                                    src={ track.coverImage } alt="music-cover" fill
                                />
                            </div>
                            <div className="flex flex-col gap-[2px] items-start">
                                <h2 className="truncate"> { track.title }</h2>
                                <div className=" truncate  text-[#bbbbbb]"> 
                                    { track.author.name } 
                                </div>
                            </div>
                        </button>
                    ))
                }
            </div>
        </div>
    )
})




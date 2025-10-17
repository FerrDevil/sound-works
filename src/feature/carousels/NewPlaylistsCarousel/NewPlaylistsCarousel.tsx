import MusicPlayerOpenerButton from '@/components/MusicPlayerOpenerButton/MusicPlayerOpenerButton'
import Image from 'next/image'

import React from 'react'

const getNewPlaylists = async () => {
    return [
        {
            id: 1,
            title: "Playlist1",
            items: [
                {
                    id: 1,
                    title: "Compass",
                    author: {
                        id: 1,
                        name: "Mili"
                    },
                    coverImage: "/covers/compass.jpg",
                    music: "/music/compass.mp3"

                },
                {
                    id: 2,
                    title: "Through Patches of Violet",
                    author: {
                        id: 1,
                        name: "Mili"
                    },
                    coverImage: "/covers/tpov.jpg",
                    music: "/music/tpov.mp3"

                },
            ]
        },
        {
            id: 2,
            title: "Playlist3",
            items: [
                {
                    id: 3,
                    title: "If I Cry",
                    author: {
                        id: 2,
                        name: "Yuki Kajiura"
                    },
                    coverImage: "/covers/ificry.webp",
                    music: "/music/ificry.mp3"

                },
                {
                    id: 2,
                    title: "Through Patches of Violet",
                    author: {
                        id: 1,
                        name: "Mili"
                    },
                    coverImage: "/covers/tpov.jpg",
                    music: "/music/tpov.mp3"

                },
                {
                    id: 1,
                    title: "Compass",
                    author: {
                        id: 1,
                        name: "Mili"
                    },
                    coverImage: "/covers/compass.jpg",
                    music: "/music/compass.mp3"

                },
            ]
        }
    ]

    
}

export default async function NewPlaylistsCarousel() {
    const newPlaylists = await getNewPlaylists() 

  return (
    <div className='flex flex-col gap-2'>
        <h2 className='text-[1.2rem]'>Новые плейлисты</h2>
        <div className="w-full overflow-auto h-[300px] md:h-[400px]">
            <div className="grid lg:auto-cols-[25%] md:auto-cols-[33%] auto-cols-[95%]  gap-[5px] grid-flow-col w-full scroll h-full">
                {
                    newPlaylists.map(playlist => (
                        <MusicPlayerOpenerButton key={playlist.id} musicId={playlist.items[0].id} needQueueChange playlistId={playlist.id} queue={playlist.items.reduce((stored, currentValue) => ([...stored, currentValue.id]), [] as number[])} className="grid grid-cols-2 grid-rows-2 gap-1">
                            {
                                <>
                                    {
                                        playlist.items.slice(0, 4+1).map(track => 
                                            <div key={track.id} className="cursor-pointer relative">
                                                <Image  draggable={false} className="object-cover select-none" src={track.coverImage} fill alt={`${track.title}Image`}></Image>
                                            </div>
                                        
                                        )
                                    }
                                    {
                                        Array.from({length: 4-playlist.items.length}).map((_, index) => (
                                            <div key={ index } className="cursor-pointer relative bg-(--secondary-main-color)" />
                                        ))
                                    }
                                </>
                            }
                        </MusicPlayerOpenerButton>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

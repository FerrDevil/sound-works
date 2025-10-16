import MusicPlayerOpenerButton from '@/components/MusicPlayerOpenerButton/MusicPlayerOpenerButton'
import Image from 'next/image'
import React from 'react'

const getNewTracks = async () => {
    return [
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
    ]
}

export default async function NewTracksCarousel() {
    const newTracks = await getNewTracks() 

  return (
    <div className='flex flex-col gap-1'>
        <h2>Новые треки</h2>
        <div className="w-full overflow-auto h-[300px]">
            <div className="grid lg:auto-cols-[25%] md:auto-cols-[33%] auto-cols-[95%]  gap-[5px] grid-flow-col w-full scroll h-full">
                {
                    newTracks.map(track => (
                        <MusicPlayerOpenerButton key={track.id} musicId={track.id} needQueueChange className="cursor-pointer relative">
                            <Image className="object-cover"  src={track.coverImage} fill alt={`${track.title}Image`}></Image>
                        </MusicPlayerOpenerButton>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

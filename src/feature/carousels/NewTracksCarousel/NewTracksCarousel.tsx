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
    <div className='flex flex-col gap-2'>
        <h2 className='text-[1.2rem]'>Новые треки</h2>
        <div className="w-full overflow-auto ">
            <div className="grid lg:auto-cols-[15%] md:auto-cols-[33%] auto-cols-[95%]  gap-[5px] grid-flow-col w-full scroll h-full">
                {
                    newTracks.map(track => (
                        <MusicPlayerOpenerButton key={track.id} musicId={track.id} needQueueChange className="cursor-pointer relative w-full grid">
                            <Image draggable={false} className="object-cover select-none w-full h-full"  src={track.coverImage} width={300} height={300} sizes='100vw' alt={`${track.title}Image`}></Image>
                        </MusicPlayerOpenerButton>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

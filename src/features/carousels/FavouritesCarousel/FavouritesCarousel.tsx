import Carousel from '@/components/Carousel/Carousel'
import MusicPlayerOpenerButton from '@/components/MusicPlayerOpenerButton/MusicPlayerOpenerButton'
import Image from 'next/image'
import Link from 'next/link'


const getFavourites = async () => {
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

export default async function FavouritesCarousel() {
    const tracks = await getFavourites() 

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <h2 className='text-[1.5rem]'>Понравившиеся</h2>
                <Link href="/library/favorites">Показать все</Link>
            </div>
            
            
                <Carousel>
                    {
                        tracks.map(track => (
                            <MusicPlayerOpenerButton key={track.id} musicId={track.id} needQueueChange className="cursor-pointer relative w-full grid">
                                <Image draggable={false} className="object-cover select-none w-full h-full"  src={track.coverImage} width={300} height={300} sizes='100vw' alt={`${track.title}Image`}></Image>
                            </MusicPlayerOpenerButton>
                        ))
                    }
                </Carousel>
        </div>
    )
}

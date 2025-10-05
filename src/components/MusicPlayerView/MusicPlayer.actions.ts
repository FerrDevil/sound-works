"use server"

export type TMusic =  {
    id: number,
    title: string,
    author: {
        id: number,
        name: string
    },
    coverImage: string,
    music: string

}

const musicList = [
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

    }
]

const playlists = [
    {
        id: 1,
        data: [
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

            }
        ]
    },
    {
        id: 2,
        data: [
            {
                id: 1,
                title: "CompAss",
                author: {
                    id: 1,
                    name: "Mili"
                },
                coverImage: "/covers/compass.jpg",
                music: "/music/compass.mp3"

            },
            {
                id: 2,
                title: "CompaZZ",
                author: {
                    id: 1,
                    name: "Mili"
                },
                coverImage: "/covers/compass.jpg",
                music: "/music/compass.mp3"

            }
        ]
    }
]



export async function getMusicById(id: number){
    return musicList.find((music) => music.id === id) || null
}

export async function getMusicByPlaylistIndex(playlistId: number, playlistItemIndex: number){
    const playlist = playlists.find((playlist) => playlist.id === playlistId)
    if (!playlist) return null
    
    return playlist.data[playlistItemIndex] || null
}
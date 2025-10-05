import MusicPlayerProvider from "@/components/MusicPlayerView/MusicPlayerProvider";


export default function Providers({children}: React.PropsWithChildren) {
  return (

    <MusicPlayerProvider>{children}</MusicPlayerProvider>
  )
}

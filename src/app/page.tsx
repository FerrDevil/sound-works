import MusicPlayerOpenerButton from "@/components/MusicPlayerOpenerButton/MusicPlayerOpenerButton";
import NewPlaylistsCarousel from "@/feature/carousels/NewPlaylistsCarousel/NewPlaylistsCarousel";
import NewTracksCarousel from "@/feature/carousels/NewTracksCarousel/NewTracksCarousel";
import Image from "next/image";


export default function Home() {
  return (
    <main className="flex flex-col p-5 overflow-auto isolate md:ml-(--header-width) pb-[200px] gap-6">
      <NewTracksCarousel/>
      <NewPlaylistsCarousel/>
    </main>
  );  
}

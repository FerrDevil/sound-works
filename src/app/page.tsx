import MusicPlayerOpenerButton from "@/components/MusicPlayerOpenerButton/MusicPlayerOpenerButton";
import NewTracksCarousel from "@/feature/carousels/NewTracksCarousel/NewTracksCarousel";
import Image from "next/image";


export default function Home() {
  return (
    <main className="flex flex-col p-5 overflow-auto isolate md:ml-(--header-width) pb-[200px]">
      <NewTracksCarousel/>

      <h2>
        Плейлисты для вас
      </h2>
    </main>
  );  
}


import NewPlaylistsCarousel from "@/features/carousels/NewPlaylistsCarousel/NewPlaylistsCarousel";
import NewTracksCarousel from "@/features/carousels/NewTracksCarousel/NewTracksCarousel";



export default function Home() {
  return (
    <main className="flex flex-col p-5 overflow-auto isolate md:ml-(--main-content-ml)  max-sm:pb-[150px] md:pb-[70px] gap-6">
      <NewTracksCarousel/>
      <NewPlaylistsCarousel/>
    </main>
  );  
}

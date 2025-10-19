
import NewPlaylistsCarousel from "@/feature/carousels/NewPlaylistsCarousel/NewPlaylistsCarousel";
import NewTracksCarousel from "@/feature/carousels/NewTracksCarousel/NewTracksCarousel";



export default function Home() {
  return (
    <>
      <NewTracksCarousel/>
      <NewPlaylistsCarousel/>
    </>
  );  
}

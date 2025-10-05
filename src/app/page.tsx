import MusicPlayerOpenerButton from "@/components/MusicPlayerOpenerButton/MusicPlayerOpenerButton";


export default function Home() {
  return (
    <main className="flex flex-col">
      <MusicPlayerOpenerButton playlistId={1} musicId={2}>da</MusicPlayerOpenerButton>
      <MusicPlayerOpenerButton musicId={1}>net</MusicPlayerOpenerButton>
    </main>
  );
}

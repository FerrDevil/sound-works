import MusicPlayerOpenerButton from "@/components/MusicPlayerOpenerButton/MusicPlayerOpenerButton";
import Image from "next/image";


export default function Home() {
  return (
    <main className="flex flex-col p-5">
      <div>
        <h2>Треки</h2>
          <div className="w-full overflow-auto h-[300px]">
            <div className="grid lg:auto-cols-[5%] md:auto-cols-[33%] auto-cols-[100%] gap-[5px] grid-flow-col w-full scroll h-full">
              <MusicPlayerOpenerButton playlistId={1} musicId={1} className="cursor-pointer relative">
                <Image className="object-cover"  src={"/covers/compass.jpg"} fill alt="compass"></Image>
              </MusicPlayerOpenerButton>
              <MusicPlayerOpenerButton playlistId={1} musicId={2} className="cursor-pointer relative">
                <Image className="object-cover" src={"/covers/tpov.jpg"} fill alt="tpov"></Image>
              </MusicPlayerOpenerButton>
              <MusicPlayerOpenerButton playlistId={1} musicId={1} className="cursor-pointer relative">
                <Image className="object-cover"  src={"/covers/compass.jpg"} fill alt="compass"></Image>
              </MusicPlayerOpenerButton>
              <MusicPlayerOpenerButton playlistId={1} musicId={2} className="cursor-pointer relative">
                <Image className="object-cover" src={"/covers/tpov.jpg"} fill alt="tpov"></Image>
              </MusicPlayerOpenerButton>
              <MusicPlayerOpenerButton playlistId={1} musicId={1} className="cursor-pointer relative">
                <Image className="object-cover"  src={"/covers/compass.jpg"} fill alt="compass"></Image>
              </MusicPlayerOpenerButton>
              <MusicPlayerOpenerButton playlistId={1} musicId={2} className="cursor-pointer relative">
                <Image className="object-cover" src={"/covers/tpov.jpg"} fill alt="tpov"></Image>
              </MusicPlayerOpenerButton>
              
            </div>
          </div>
      </div>
    </main>
  );
}

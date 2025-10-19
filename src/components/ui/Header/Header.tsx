import ActionRequiresAuth from "@/components/ActionRequiresAuth/ActionRequiresAuth";
import { auth } from "@/configs/auth";
import dynamic from "next/dynamic";

import Link from "next/link";
const MusicPlayerView = dynamic(() => import("@/components/MusicPlayerView/MusicPlayerView"))

export default async function Header() {
  const session = await auth()

  return (
    <header className="fixed left-0 right-0 bottom-0 md:w-(--header-width) md:mx-auto md:right-auto md:top-0  gap-3 grid bg-[#0a0a0a] z-999 isolate">
      <MusicPlayerView/>
        <nav className="flex justify-between md:justify-normal px-10 md:px-0 py-4 md:py-4  gap-2 md:flex md:flex-col">
          <ul className="contents">
            <li >
              <Link href={"/"} className="flex flex-col gap-1 items-center">
                <svg width={36} height={36}  viewBox="0 0 45 50"  fill="none" xmlns="http://www.w3.org/2000/svg">
                 
                  <rect x="16.1347" y="0.0389633" width="9.99221" height="49.961" fill="#A38F7B"/>
                  <path d="M0.902283 1.46813L31.2731 1.46813L45 9.01794V10.0475V11.077L31.2731 18.6268H0.902283L0.902283 1.46813Z" fill="#6E6E77"/>
              
                </svg>
                
              </Link>
            </li>
            
            <li >
              <Link href={"/explore"} className="flex flex-col gap-1 items-center">
                <svg width={36} height={36} viewBox="0 0 24 24"  fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 16.5L14.5 14.5L16.5 7.5L9.5 9.5L7.5 16.5ZM12 13.5C11.5833 13.5 11.2292 13.3542 10.9375 13.0625C10.6458 12.7708 10.5 12.4167 10.5 12C10.5 11.5833 10.6458 11.2292 10.9375 10.9375C11.2292 10.6458 11.5833 10.5 12 10.5C12.4167 10.5 12.7708 10.6458 13.0625 10.9375C13.3542 11.2292 13.5 11.5833 13.5 12C13.5 12.4167 13.3542 12.7708 13.0625 13.0625C12.7708 13.3542 12.4167 13.5 12 13.5ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22Z" fill="white"/>
                </svg>
               
              </Link> 
            </li>
            <li>
              {
                !session?.user ? 
                  <ActionRequiresAuth key={"library"} >
                    <svg width={36} height={36} viewBox="0 0 24 24"  fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 20V18H22V20H2ZM4 16V8H6V16H4ZM8 16V4H10V16H8ZM12 16V4H14V16H12ZM19 16L15 9L16.75 8L20.75 15L19 16Z" fill="white"/>
                    </svg>
                  </ActionRequiresAuth>
                  :
                  <Link href={"/library"} key={"library"} className="flex flex-col gap-1 items-center">
                    <svg width={36} height={36} viewBox="0 0 24 24"  fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 20V18H22V20H2ZM4 16V8H6V16H4ZM8 16V4H10V16H8ZM12 16V4H14V16H12ZM19 16L15 9L16.75 8L20.75 15L19 16Z" fill="white"/>
                    </svg>
                  </Link> 
              }
              
              
            </li>
          </ul>
        </nav>
      </header>
  )
}

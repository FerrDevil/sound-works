

import SignOutButton from '@/auth/components/SignOutButton/SignOutButton'
import { getSession } from '@/auth/core/auth'
import { getUserSessionData } from '@/auth/core/requests'
import FavouritesCarousel from '@/features/carousels/FavouritesCarousel/FavouritesCarousel'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function LibraryPage() {
	const session = await getSession()
	if (!session) return redirect("/signIn")
	const userSessionData = await getUserSessionData()
	if (!userSessionData) return redirect("/signIn")
	return (
		<main className="flex flex-col p-5 overflow-auto isolate md:ml-(--main-content-ml)  max-sm:pb-[150px] md:pb-[70px] gap-6 px-15 max-md:px-5">
			<div className='grid gap-10'>
				
				<div className='grid'>
					<div className='flex justify-end gap-2 mb-2' >
						<Link href={"settings"}>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path className='fill-[#ffffff]' d="M9.24995 22L8.84995 18.8C8.63328 18.7167 8.42912 18.6167 8.23745 18.5C8.04578 18.3833 7.85828 18.2583 7.67495 18.125L4.69995 19.375L1.94995 14.625L4.52495 12.675C4.50828 12.5583 4.49995 12.4458 4.49995 12.3375V11.6625C4.49995 11.5542 4.50828 11.4417 4.52495 11.325L1.94995 9.375L4.69995 4.625L7.67495 5.875C7.85828 5.74167 8.04995 5.61667 8.24995 5.5C8.44995 5.38333 8.64995 5.28333 8.84995 5.2L9.24995 2H14.75L15.15 5.2C15.3666 5.28333 15.5708 5.38333 15.7625 5.5C15.9541 5.61667 16.1416 5.74167 16.325 5.875L19.3 4.625L22.05 9.375L19.475 11.325C19.4916 11.4417 19.5 11.5542 19.5 11.6625V12.3375C19.5 12.4458 19.4833 12.5583 19.45 12.675L22.025 14.625L19.275 19.375L16.325 18.125C16.1416 18.2583 15.95 18.3833 15.75 18.5C15.55 18.6167 15.35 18.7167 15.15 18.8L14.75 22H9.24995ZM12.05 15.5C13.0166 15.5 13.8416 15.1583 14.525 14.475C15.2083 13.7917 15.55 12.9667 15.55 12C15.55 11.0333 15.2083 10.2083 14.525 9.525C13.8416 8.84167 13.0166 8.5 12.05 8.5C11.0666 8.5 10.2375 8.84167 9.56245 9.525C8.88745 10.2083 8.54995 11.0333 8.54995 12C8.54995 12.9667 8.88745 13.7917 9.56245 14.475C10.2375 15.1583 11.0666 15.5 12.05 15.5Z" fill="#1C1B1F"/>
							</svg>
						</Link>
					</div>
					
					<div className='flex items-center gap-10'>
						<div className='overflow-hidden rounded-full w-[80px] ratio-square'>
							<Image className='block w-full h-full object-cover' draggable={false} src={/* userSessionData?.image */ "/covers/ificry.webp"} alt="Profile image" width={70} height={70}/>
						</div>
						<div className='grid gap-1'>
							<h2 className='truncate text-[2rem]'>{userSessionData.name}</h2>	
							<div className='flex'>
								<SignOutButton className='text-[0.9rem] text-[#cccccc] cursor-pointer px-3 py-1 bg-[#262626AA] rounded-[1rem] flex items-center gap-2'> 
									<svg className='h-[1.2em]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path className='fill-[#cccccc]' d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#1C1B1F"/>
									</svg>
									 <span> Выйти из аккаунта </span>
								</SignOutButton>
							</div>
						</div>	
					</div>

				</div>
				<div className='grid gap-5'>
					<h1 className='hidden'>Пользовательские списки</h1>
					<FavouritesCarousel/>
					<div>
						Playlists
					</div>
				</div>
				</div>
		</main>

		
	)
}

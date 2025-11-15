

import { PropsWithChildren } from "react"

type CarouselProps = {

} & PropsWithChildren

export default function Carousel({children} : CarouselProps) {
  return (
   
        <div className="w-full overflow-auto ">
            <div className="grid lg:auto-cols-[25%] md:auto-cols-[33%] auto-cols-[95%]  gap-[5px] grid-flow-col w-full overflow-x-auto h-full">
                {
                    children
                }
            </div>
        </div>
       
  )
}

"use client"

import { useEffect, useRef } from "react";

/**
 * A Client Component hook that can trigger the click outside event of the element.
 * @example
 * ```ts
 * "use client"
 * import { useClickOutside } from '@/hooks/useClickOutside'
 *
 * export default function Page() {
 *  const ref = useClickOutside<HTMLDivElement>(() => {alert("alert")}) 
 * return (
 *      <div ref={ref}> content </div
 * )
 * }
 * ```
 */

export default function useClickOutside< T extends HTMLElement>( callback : () => void | unknown) {
    const ref = useRef<T>(null)
    useEffect(() => {
		const blur = (event: MouseEvent) => {
			if ( ref.current && !ref.current.contains( (event.target as Node) ) ){
				callback()
			}
		}

		document.addEventListener("mousedown", blur)
		return () => {
			document.removeEventListener("mousedown", blur)	
		}
	}, [])
    return ref 
}

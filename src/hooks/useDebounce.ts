"use client"
import { useRef } from "react"


export default function useDebounce<T, R>(callback: (...args: T[]) => R,  delay: number) {
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

    const debounce = (...args: T[]) => {
        clearTimeout( timeoutRef.current)
        timeoutRef.current = setTimeout(() => { callback.apply(null, [...args]) }, delay)
    }
    return [debounce]
}

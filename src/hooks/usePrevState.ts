"use client"

import { useRef } from "react"

export default function usePrevState<T> (state: T) {
    const previousRef = useRef<null | T>(null)
    const currentRef = useRef(state)
    
    if(currentRef.current !== state){
        previousRef.current = currentRef.current
        currentRef.current = state  
    }
    return previousRef.current
}
"use client"
import type { DependencyList, EffectCallback } from "react"
import { useEffect, useRef } from "react"

export default function useReeffect( callback: EffectCallback, dependencies: DependencyList){
    const ref = useRef(0)

    useEffect(() => {
        if ( ref.current === 0 ){
            ref.current++
        }
        else{
            callback() 
        }

    }, dependencies)
}
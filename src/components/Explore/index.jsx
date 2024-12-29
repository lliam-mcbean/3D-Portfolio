import React from 'react'
import { useExplore } from '../context/explore'

export default function Explore() {
    const {setExplore, explore} = useExplore()

    return (
        <div className='fixed bottom-0 right-0 p-8'>
            <button onClick={() => setExplore((prev) => !prev)} className="group relative px-6 py-3 text-black">
                <span className="absolute inset-0 h-full w-full -translate-x-2 -translate-y-2 transform bg-gray-200 transition duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute z-[1] h-full w-full -translate-x-8 -translate-y-5 border-b-2 border-e-2 border-white group-hover:border-none"></span>
                <span className="absolute inset-0 h-full w-full translate-x-2 translate-y-2 transform border-s-2 border-t-2 border-white bg-gray-200 transition duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute inset-0 z-[1] h-full w-full border-2 border-black"></span>
                <span className="relative">{explore ? 'Return To Home' : "Explore My Desk"}</span>
            </button>
        </div>
    )
}

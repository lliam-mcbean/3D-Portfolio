import React from 'react'
import { useExplore } from '../context/explore'

export default function Explore() {
    const {setExplore, explore} = useExplore()

    return (
        <div className='fixed bottom-0 right-0 p-8'>
            <button onClick={() => setExplore((prev) => !prev)} class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-transparent dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {explore ? 'Return To Home' : "Explore My Desk"}
                </span>
            </button>
        </div>
    )
}

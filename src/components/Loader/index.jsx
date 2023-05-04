import { Html, useProgress } from '@react-three/drei'
import React, { useEffect, useState } from 'react'

export default function Loader({setIsLoading}) {
    const [firstStage, setFirstStage] = useState(0)
    const [secondStage, setSecondStage] = useState(0)
    const [thirdStage, setThirdStage] = useState(0)
    const [fourthStage, setFourthStage] = useState(0)
    const [final, setFinal] = useState(false)

    const {progress} = useProgress()

    const animate = () => {
        for(let i = 0; i < 230; i++) {
            if(i < 100) {
                setTimeout(() => setFirstStage(i), 50 * i)
            } else if (i < 140) {
                setTimeout(() => setSecondStage(i - 100), 50 * i)
            } else if (i < 180) {
                setTimeout(() => setThirdStage(i - 140), 50 * i)
            } else{
                setTimeout(() => setFourthStage(i - 180), 50 * i)
            }
        }
    }

    if (fourthStage > 48) { 
        setIsLoading(false)
    }

    useEffect(() => {
        fourthStage === 0 && animate()
    }, [])

    return (
        <div className='w-screen h-screen absolute bg-black text-white flex justify-center items-center flex-col'>
            <div style={{position: 'relative', margin: 'auto'}}>
                <div>Loading...</div>
                <div style={{height: fourthStage ? '65px' : '15px', width: thirdStage ? '179px' : secondStage > 0 ? '139px' : '99px', transform: secondStage > 0 ? `translateX(-40px)` : 'translateX(0px)'}} className=' border-2 border-white absolute'></div>
                <div style={{height: `${15 + fourthStage}px`, width: `${firstStage + secondStage + thirdStage}px`, transform: secondStage && `translateX(-${secondStage}px)`}} className=' border border-white bg-white absolute'></div>
            </div>
        </div>
    )
}

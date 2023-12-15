"use client"
import Image from 'next/image'
import Calories from '@/components/Calories/Calories'
import Bmi from '@/components/Bmi/Bmi'


export default function Calculators() {
  return (
    <main className='calculators' >
        <Bmi />
        <Calories />
     </main>
  )
}

import type { Activity } from '../types'
import { useMemo } from 'react'
import CalorieDisplay from './CalorieDisplay'

type CalorieTrackerProps = {
    activities: Activity[]
}



export default function CalorieTracker({ activities }: CalorieTrackerProps) {

    // contadores
    const totalCalories = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0),
        [activities])

    const CaloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0),
        [activities])

    const netCalories = useMemo(() => totalCalories - CaloriesBurned,
        [totalCalories, CaloriesBurned])

    return (
        <>
            <h2 className='text-4xl font-black text-white text-center'>Calorias Totales</h2>

            <div className='flex flex-col items-center md:flex-row md:justify-between gap-5 mt-5'>
                
                <CalorieDisplay calories={totalCalories} text='Consumidas' />

                <CalorieDisplay calories={CaloriesBurned} text='Quemadas' />

                <CalorieDisplay calories={netCalories} text='Netas' />

            </div>
        </>
    )
}

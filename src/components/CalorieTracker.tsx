import CalorieDisplay from './CalorieDisplay'
import { useActivity } from '../hooks/useActivity'




export default function CalorieTracker() {

    const { CaloriesBurned, totalCalories, netCalories} = useActivity()





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

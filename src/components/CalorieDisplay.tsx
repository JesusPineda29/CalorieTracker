
type CalorieDisplayProps = {
    calories: number
    text: string
}

export default function CalorieDisplay({ calories, text }: CalorieDisplayProps) {
    return (
        <p className='text-center text-white font-bold rounded-full grid grid-cols-1 gap-3'>
            <span className='font-black text-6xl text-orange'>{calories}</span>
            {text}
        </p>
    )
}

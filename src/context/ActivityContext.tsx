import { createContext, useMemo, useReducer, type ReactNode } from 'react';
import { type ActivityActions, type ActivityState, activityReducer, initialState } from '../reducers/activity-reducer';
import { categories } from '../data/categories';
import type { Activity } from '../types';


type ActivityProviderProps = {
    children: ReactNode
}

type ActivityContextProps = {
    state: ActivityState
    dispatch: React.ActionDispatch<[action: ActivityActions]>
    totalCalories: number
    CaloriesBurned: number
    netCalories: number
    categoryName: (category: Activity["category"]) => string[],
    isEmptyActivities: boolean

}

export const ActivityContext = createContext<ActivityContextProps>(null!)


export const ActivityProvider = ({ children }: ActivityProviderProps) => {



    const [state, dispatch] = useReducer(activityReducer, initialState)


    // contadores
    const totalCalories = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0),
        [state.activities])

    const CaloriesBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0),
        [state.activities])

    const netCalories = useMemo(() => totalCalories - CaloriesBurned,
        [totalCalories, CaloriesBurned])


    const categoryName = useMemo(() =>
        (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
        , [state.activities])

    const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])

    return (
        <ActivityContext.Provider value={{
            state,
            dispatch,
            totalCalories,
            CaloriesBurned,
            netCalories,
            categoryName,
            isEmptyActivities
        }}>
            {children}
        </ActivityContext.Provider>
    )
}

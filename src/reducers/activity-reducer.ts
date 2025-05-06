import type { Activity } from '../types/index';


export type ActivityActions = 
    { type: 'save-activity', payload: {newActivity: Activity}} |
    { type: 'set-activeId', payload: {id : Activity['id']}} |
    { type: 'delete-activity', payload: {id : Activity['id']}} |
    { type: 'restart-app'}

export type ActivityState = {
    activities: Activity[],
    activeId: string
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    if(action.type === 'save-activity') {
        const existingActivityIndex = state.activities.findIndex(
            activity => activity.id === action.payload.newActivity.id
        );

        if (existingActivityIndex !== -1) {
            // Actualizar actividad existente
            const updatedActivities = [...state.activities];
            updatedActivities[existingActivityIndex] = action.payload.newActivity;
            
            return {
                ...state,
                activities: updatedActivities,
                activeId: '' // Limpiar el ID activo después de actualizar
            };
        } else {
            // Añadir nueva actividad
            return {
                ...state,
                activities: [...state.activities, action.payload.newActivity]
            };
        }
    }

    if(action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }


    if(action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    if(action.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state
}
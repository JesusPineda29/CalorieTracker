import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

import { categories } from "../data/categories"
import type { Activity } from "../types"
import { useActivity } from "../hooks/useActivity"




const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0
}



export default function Form() {

  const {state, dispatch} = useActivity()

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
      setActivity(selectedActivity)
    }
  }, [state.activeId])



  const [activity, setActivity] = useState<Activity>(initialState)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id) // isNumberField será: true si el campo incluye "category" o "calories". y sera false si es otro campo

    setActivity({ // funcion de activity
      ...activity, // tomamos una copia de lo que tenemos en nuestro state, antes de escribir un nuevo state
      [e.target.id]: isNumberField ? +e.target.value : e.target.value// asignamos sobre el elemento donde se esta escribiendo, lo que el usuario esta escribiendo. con + se convierte en numero
    })

    console.log(e.target.id) // sobre que elemento estoy escribiendo
    console.log(e.target.value) // lo que el usuario esta escribiendo
  }



  const isValidActivity = () => {
    const { name, calories } = activity
    return name.trim() !== '' && calories > 0
  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({ type: 'save-activity', payload: { newActivity: activity } })
    setActivity({
      ...initialState,
      id: uuidv4()
    })
  }



  return (
    <form
      className="bg-white p-10 space-y-5 shadow rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoría:</label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >

          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}

        </select>
      </div>



      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad:</label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. comida, Jugo de naranja, ensalada, ejercicio"
          value={activity.name}
          onChange={handleChange}
        />
      </div>



      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorias:</label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias. ej. 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-20"
        value={activity.category === 1 ? 'Guardad Comida' : 'Guardar Ejercicio'}
        disabled={!isValidActivity()}
      />

    </form>
  )
}



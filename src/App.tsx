import Form from './components/Form'

import { useReducer, useEffect, useMemo } from 'react'
import { activityReducer, initialState } from './reducers/activity-reducer'
import Activitylist from './components/Activitylist'
import CalorieTracker from './components/CalorieTracker'
import Footer from './components/footer'


function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestarapp = () => useMemo(() => state.activities.length, [state.activities])

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="mx-auto max-w-4xl flex justify-between items-center">
          <h1 className="text-lg font-bold text-white text-center uppercase">Contador de Calorias</h1>
          <button
            className='bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-lg font-bold cursor-pointer uppercase text-sm disabled:opacity-10 disabled:cursor-not-allowed'
            onClick={() => dispatch({ type: 'restart-app' })}
            disabled={!canRestarapp()}
          >
            Reiniciar
          </button>
        </div>
      </header>



      <section className="bg-lime-500 py-20 px-5">
        <div className="mx-auto max-w-4xl">
          <Form 
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className='bg-gray-800 py-10'>
        <div className="mx-auto max-w-4xl">
          <CalorieTracker 
            activities={state.activities}
          />
        </div>
      </section>

      <section className='p-10 mx-auto max-w-4xl'>
        <Activitylist 
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>

      <Footer />
    </>
  )
}







export default App






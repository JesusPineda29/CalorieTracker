import Form from './components/Form'

import { useEffect, useMemo } from 'react'
import Activitylist from './components/Activitylist'
import CalorieTracker from './components/CalorieTracker'
import Footer from './components/footer'
import { useActivity } from './hooks/useActivity'


function App() {

  const {state, dispatch} = useActivity()


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
          <Form />
        </div>
      </section>

      <section className='bg-gray-800 py-10'>
        <div className="mx-auto max-w-4xl">
          <CalorieTracker />
        </div>
      </section>

      <section className='p-10 mx-auto max-w-4xl'>
        <Activitylist />
      </section>

      <Footer />
    </>
  )
}



export default App






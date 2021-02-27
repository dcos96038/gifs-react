import React, { Suspense } from 'react'
import './App.css'
// import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import Detail from './pages/Detail'
import logo from './logo.png'
import { GifsContextProvider } from './context/GifsContext'

import { Link, Route } from 'wouter'

const HomePage = React.lazy(() => import('./pages/Home'))

function App () {
  return (
    <div className='App'>
      <Suspense fallback={null}>
        <section className='App-content'>
          <Link to='/'>
            <img className='App-logo' src={logo} alt='Giffy logo' />
          </Link>
          <GifsContextProvider>
            <Route
              component={HomePage}
              path='/'
            />
            <Route
              component={SearchResults}
              path='/search/:keyword'
            />
            <Route
              component={Detail}
              path='/gif/:id'
            />
          </GifsContextProvider>
        </section>
      </Suspense>
    </div>
  )
}

export default App

import {Routes, Route} from 'react-router-dom'
import GameList from './pages/GameList'
import NotFound from './pages/NotFound'
import Header from './header/Header'
import './App.css'
import Footer from './footer/Footer'

const App = () => {
  return(
    <div>
      <Header />

      <Routes>
      <Route path='/' element={<GameList />}/>
      <Route path='/home' element={<GameList />} />
      <Route path='*' element={<NotFound />} />
    </Routes>

    <Footer />
    </div>
  )
}

export default App;
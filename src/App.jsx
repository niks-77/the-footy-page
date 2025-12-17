import {Routes, Route} from 'react-router-dom'
import GameList from './pages/GameList'
import NotFound from './pages/NotFound'
import Header from './Header&Footer/Header'
import './App.css'

const App = () => {
  return(
    <div>
      <Header />

      <Routes>
      <Route path='/' element={<GameList />}/>
      <Route path='*' element={<NotFound />} />
    </Routes>
    </div>
  )
}

export default App;
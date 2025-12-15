import {Routes, Route} from 'react-router-dom'
import GameList from './components/GameListGroup/GameList'
import GameDetails from './components/GameDetailsGroup/GameDetails'
import './App.css'

const App = () => {
  return(
    <Routes>
      <Route path='/' element={<GameList />}/>
      <Route path='/game/:id' element ={<GameDetails />}/>
    </Routes>
  )
}

export default App;
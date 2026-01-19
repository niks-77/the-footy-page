import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Header from './header/index.jsx'
import './App.css'
import Footer from './footer/index.jsx'
import GameList from './pages/Home.jsx'

const App = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path='/' element={<GameList />} />
        <Route path='/home' element={<GameList />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App;
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Header from './header/index.jsx'
import './App.css'
import Footer from './footer/index.jsx'

const App = () => {
  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App;
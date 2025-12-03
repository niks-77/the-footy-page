  import { useState, useEffect } from 'react'
  import footballService  from '../services/football.js'
  import GamesByLeague from './GamesByLeague.jsx'
  import './GameList.css'
  import { useMemo } from 'react'
  import useGameStore from '../stores/gameStore.js'

  const GameList = () => {
    const {games, setGames, date, setSelectedDate} = useGameStore()
    const [searchName, setSearchName] = useState('')

    useEffect(() => {
      setGames(date)
    }, [date])

    useEffect(() => {
      const timer = setTimeout(() => {
        setSearchName(searchName)
      }, 250)

      return () => clearTimeout(timer)
    }, [searchName])


    const handleSearch = (event) => {
      setSearchName(event.target.value)
    }  

    const filteredGames = useMemo(() => {
    return searchName
      ? games.filter(g =>
          g.teams.home.name.toLowerCase().includes(searchName.toLowerCase()) ||
          g.teams.away.name.toLowerCase().includes(searchName.toLowerCase()) || 
          g.league.name.toLowerCase().includes(searchName.toLocaleLowerCase())
        )
      : games
  }, [searchName, games])
    
    return(
      <div className='homepage'>
        <div className='games-column'>
        <h1> Today's Matches </h1>

        <GamesByLeague games={filteredGames}/>
      </div>  

          <div className='date-picker'>
            <button onClick ={() => setSelectedDate('yesterday')}
              disabled={date === 'yesterday'}> Yesterday </button>
            <button onClick= {() => setSelectedDate('today')} 
              disabled={date  ==='today'}> Today </button>
            <button onClick={() => setSelectedDate('tomorrow')} 
              disabled={date==='tomorrow'}> Tomorrow </button>
          </div>

          <div className="form-column">
            <form className="search-form">
            <input value={searchName} 
                    onChange={handleSearch}
                    type="text" 
                    placeholder="Search for a game or league..." />
            </form>


          </div>  
      </div>
    )
  }

  export default GameList;

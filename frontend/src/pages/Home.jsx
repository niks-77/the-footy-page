import { useState, useEffect } from 'react'
import GamesByLeague from '../components/GamesByLeague/index.jsx'
import './Home.styl'
import { useMemo } from 'react'
import useGameStore from '../stores/gameStore.js'
import useGameDetailsStore from '../stores/gameDetailsStore.js'
import GameDetails from '../components/GameDetails/index.jsx'
import Typefilter from '../components/Typefilter/index.jsx'
import Dayfilter from '../components/Dayfilter/index.jsx'
import { SearchIcon } from 'lucide-react'
import { isLive } from '../utils/gameStatuses.js'

const GameList = () => {
  const { showLiveGames, setShowLiveGames, games, setGames, date, setSelectedDate,
    loading } = useGameStore()


  const { selectedGameId, openGame, closeGame } = useGameDetailsStore()

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
    let result = games

    if (showLiveGames) {
      result = result.filter(g => isLive(g.fixture.status.short))
    }

    if (searchName) {
      result = result.filter(g =>
        g.teams.home.name.toLowerCase().includes(searchName.toLocaleLowerCase()) ||
        g.teams.away.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()) ||
        g.league.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())
      )
    }

    return result;

  }, [searchName, games, showLiveGames])

  return (
    <div className='homepage'>

      <div className='filter-container'>

        <div className="filters-left">
          <Dayfilter />
          <Typefilter />
        </div>

        <div className="search-container">
          <form className="search-form">
            <SearchIcon />
            <input value={searchName}
              onChange={handleSearch}
              type="text"
              placeholder="Search team or league..." />
          </form>
        </div>
      </div>


      {(!loading && filteredGames.length === 0) ? (
        <div className='no-results'>
          <h3> Oops! No results matching your request. </h3>
        </div>
      ) : <GamesByLeague games={filteredGames}
        onSelectGame={openGame} />
      }

      {selectedGameId && (
        <div className="modal-backdrop" onClick={closeGame}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>

            <GameDetails />
          </div>
        </div>
      )}

    </div>
  )
}

export default GameList;

  import { useState, useEffect } from 'react'
  import GamesByLeague from '../components/GamesByLeagueGroup/GamesByLeague.jsx'
  import './GameList.styl'
  import { useMemo } from 'react'
  import useGameStore from '../stores/gameStore.js'
  import useGameDetailsStore from '../stores/gameDetailsStore.js'
  import GameDetails from '../components/GameDetailsGroup/GameDetails.jsx'

  const GameList = () => {
    const {showLiveGames, setShowLiveGames, games, setGames, date, setSelectedDate,
      loading} = useGameStore()


    const { selectedGameId, openGame, closeGame } = useGameDetailsStore()

    const [searchName, setSearchName] = useState('')
    const [headerOne, setHeaderOne] = useState("Today's Matches")

    const LIVE_STATUSES = ['1H', '2H', 'ET', 'P']

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

      if(showLiveGames){
        result = result.filter(g => LIVE_STATUSES.includes(g.fixture.status.short))
      }

      if(searchName){
        result = result.filter(g => 
          g.teams.home.name.toLowerCase().includes(searchName.toLocaleLowerCase()) ||
          g.teams.away.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()) ||
          g.league.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())
        )
      }
      
      return result;

    }, [searchName, games, showLiveGames])
    
    return(
      <div className='homepage'>
        
        <div className='filter-container'>

          <div className='filter-group'>
            <span><h4>Filter by day </h4></span>

          <div className='date-picker'>

            <button onClick ={() =>{ setHeaderOne("Yesterday's Matches");
             setSelectedDate('yesterday')
             setShowLiveGames(false)}}
              disabled={date === 'yesterday'}> Yesterday </button>

            <button onClick= {() => {setHeaderOne("Today's Matches"); setSelectedDate('today')
            }} 
              disabled={date  ==='today'}> Today </button>

            <button onClick={() => {setHeaderOne("Tomorrow's Matches"); setSelectedDate('tomorrow')
              setShowLiveGames(false)
            }} 
              disabled={date==='tomorrow'}> Tomorrow </button>
          </div>
          </div>

        <div className='filter-group'>
          <span><h4>Filter by type </h4></span>

        <div className='filter-today-games'>
          <button onClick={()=> {setShowLiveGames(false)}} 
             disabled={!showLiveGames}> All </button>
          <button onClick={() => {setShowLiveGames(true); setHeaderOne("Today's Matches")
            setSelectedDate('today')
          }}
            disabled={showLiveGames}> Live </button>
        </div>
        </div>

        <div className='filter-group'>  
          <span><h4> Filter search </h4></span>
          
        <div className="search-container">
            <form className="search-form">
            <input value={searchName} 
                    onChange={handleSearch}
                    type="text" 
                    placeholder="Search for a game or league..." />
            </form>
        </div>
        </div>

        </div>

        <h2> {headerOne} </h2>
        
        {(!loading && filteredGames.length === 0 ) ? (
          <div className='no-results'>
            <h3> Oops! No results matching your request. </h3>
          </div>
        ): <GamesByLeague games={filteredGames}
            onSelectGame={openGame}/>
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

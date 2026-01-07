import { useEffect, useMemo, useRef, useState } from 'react'
import useGameStore from '../../stores/gameStore.js'
import Game from '../GameGroup/Game.jsx'
import LeagueSkeleton from '../SkeletonLoadingGroup/LeagueSkeleton.jsx'
import './GamesByLeague.styl'

const LEAGUES_PER_BATCH = 3

const GamesByLeague = ({ games, onSelectGame }) => {
  const { loading } = useGameStore()

  const [visibleLeagues, setVisibleLeagues] = useState(LEAGUES_PER_BATCH)
  const loadMoreRef = useRef(null)


  const leaguesArray = useMemo(() => {
    const groups = {}

    games.forEach(game => {
      const leagueId = game.league.id
      if (!groups[leagueId]) {
        groups[leagueId] = {
          league: game.league,
          games: []
        }
      }
      groups[leagueId].games.push(game)
    })

    return Object.values(groups)
  }, [games])


  // Reset pagination when games change

  useEffect(() => {
    setVisibleLeagues(LEAGUES_PER_BATCH)
  }, [games])

  // Invisible auto-load on scroll 
  useEffect(() => {
    if (!loadMoreRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          visibleLeagues < leaguesArray.length
        ) {
          setVisibleLeagues(prev => prev + LEAGUES_PER_BATCH)
        }
      },
      {
        rootMargin: '5px'
      }
    )

    observer.observe(loadMoreRef.current)

    return () => observer.disconnect()
  }, [visibleLeagues, leaguesArray.length])

  if (loading) {
    return <LeagueSkeleton />
  }

  return (
    <div>
      {leaguesArray
        .slice(0, visibleLeagues)
        .map(({ league, games }) => (
          <div key={league.id} className="league-group">
            <h2 className="league-header">
              {league.logo && (
                <img
                  src={league.logo}
                  loading="lazy"
                  alt={league.name}
                  className="league-icon"
                />
              )}
              <span>{league.name}</span>
              {league.country && (
                <span className="league-country">
                  ({league.country})
                </span>
              )}
            </h2>

            <ul className="games-container">
              {games.map(game => (
                <Game
                  key={game.fixture.id}
                  game={game}
                  onSelect={onSelectGame}
                />
              ))}
            </ul>
          </div>
        ))}

      {/* Invisible sentinel */}
      {visibleLeagues < leaguesArray.length && (
        <div
          ref={loadMoreRef}
          style={{ height: 1 }}
        />
      )}
    </div>
  )
}

export default GamesByLeague

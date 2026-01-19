import useGameDetailsStore from '../../stores/gameDetailsStore'
import './index.styl'
import { isLive, isFinished, isNotStarted, getStatus } from '../../utils/gameStatuses'
import { X, Timer, Castle, MapPin } from 'lucide-react'

const GameDetails = () => {
  const {
    selectedGame,
    homeStats,
    awayStats,
    closeGame
  } = useGameDetailsStore()

  const status = selectedGame.fixture.status.short

  return (
    <div className='game-details'>

      <div className='league-header'>
        <img className='league-icon' src={selectedGame.league.logo} alt={selectedGame.league.name} />
        <span>{selectedGame.league.name}</span>
      </div>

      <span className='league-country'>{selectedGame.league.country}</span>

      <button className="close-btn" onClick={closeGame}><X /></button>

      <div className='head-to-head'>
        <div className='team'>
          <img src={selectedGame.teams.home.logo} alt={selectedGame.teams.home.name} />
          <span className='team-name'>{selectedGame.teams.home.name}</span>
        </div>

        <div className='score-container'>
          <span className={`match-status ${getStatus(status).toLowerCase()}`}>
            {(getStatus(status) === 'Live') ? selectedGame.fixture.status.elapsed + `'`
              : getStatus(status)}
          </span>
          <div className='score-board'>
            {isNotStarted(status) ? (
              <span className='vs-label'>vs</span>
            ) : (
              <>
                <span className='score-num'>{selectedGame.goals.home ?? 0}</span>
                <span className='score-divider'>-</span>
                <span className='score-num'>{selectedGame.goals.away ?? 0}</span>
              </>
            )}
          </div>
        </div>


        <div className='team'>
          <img src={selectedGame.teams.away.logo} alt={selectedGame.teams.away.name} />
          <span className='team-name'>{selectedGame.teams.away.name}</span>
        </div>

      </div>
      {
        (isLive(status) || isFinished(status)) ? (
          (homeStats && awayStats) ? (
            <div className='stats-container'>
              <div className='stats-row'>
                <span>{homeStats.stats['Shots on Goal'] ?? 0}</span>
                Shots on Goal
                <span>{awayStats.stats['Shots on Goal'] ?? 0}</span>
              </div>

              <div className='stats-row'>
                <span>{homeStats.stats['Total Shots'] ?? 0}</span>
                Total Shots
                <span>{awayStats.stats['Total Shots'] ?? 0}</span>
              </div>

              <div className='stats-row'>
                <span>{homeStats.stats['Fouls'] ?? 0}</span>
                Fouls
                <span>{awayStats.stats['Fouls'] ?? 0}</span>
              </div>

              <div className='stats-row'>
                <span>{homeStats.stats['Corner Kicks'] ?? 0}</span>
                Corners
                <span>{awayStats.stats['Corner Kicks'] ?? 0}</span>
              </div>

              <div className='stats-row'>
                <span>{homeStats.stats['Offsides'] ?? 0}</span>
                Offsides
                <span>{awayStats.stats['Offsides'] ?? 0}</span>
              </div>

              <div className='stats-row'>
                <span>{homeStats.stats['Ball Possession'] ?? '0%'}</span>
                Possession
                <span>{awayStats.stats['Ball Possession'] ?? '0%'}</span>
              </div>

              <div className='stats-row'>
                <span>{homeStats.stats['Yellow Cards'] ?? 0}</span>
                Yellow Cards
                <span>{awayStats.stats['Yellow Cards'] ?? 0}</span>
              </div>

              <div className='stats-row'>
                <span>{homeStats.stats['Red Cards'] ?? 0}</span>
                Red Cards
                <span>{awayStats.stats['Red Cards'] ?? 0}</span>
              </div>
            </div>
          ) : (
            <div className='stats-unavailable'>
              <p>Statistics are not yet available for this game.</p>
            </div>
          )
        ) : isNotStarted(status) ? (
          <div className='match-info-section'>
            <div className='info-item'>
              <div className='info-label'>
                <Timer size={18} />
                <span>Kick-off time</span>
              </div>
              <p className='info-value time'>{new Date(selectedGame.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>

            <div className='info-item'>
              <div className='info-label'>
                <Castle size={18} />
                <span>Stadium</span>
              </div>
              <p className='info-value'>{selectedGame.fixture.venue.name ?? 'Unknown'}</p>
            </div>

            <div className='info-item'>
              <div className='info-label'>
                <MapPin size={18} />
                <span>City</span>
              </div>
              <p className='info-value'>{selectedGame.fixture.venue.city ?? 'Unknown'}</p>
            </div>
          </div>
        ) : (
          <div className='stats-unavailable'>
            <p>This game has no available statistics.</p>
          </div>
        )
      }
    </div >
  )
}

export default GameDetails

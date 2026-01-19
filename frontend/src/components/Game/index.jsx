import useGameStore from '../../stores/gameStore.js'
import './index.styl'
import GameSkeleton from '../SkeletonLoading/GameSkeleton.jsx'
import { isLive, isFinished, isNotStarted } from '../../utils/gameStatuses.js'
import { format, parseISO } from 'date-fns'

const formatTime = (isoDate) => format(parseISO(isoDate), 'HH:mm')

const Game = ({ game, onSelect }) => {

  const { loading } = useGameStore()

  if (loading) {
    return <GameSkeleton />
  }


  const status = game.fixture.status.short

  const postoponed = (status === 'PST')
  const cancelled = (status === 'CANC')

  return (
    <li className="game-item" onClick={() => onSelect(game)}>
      <div className="status-side">
        {isFinished(status) ? (
          <span className="finished">FT</span>
        ) : isLive(status) ? (
          <div className="live-indicator">
            <span className="live-dot" />
            <span className="live-text">{game.fixture.status.elapsed + `'`}</span>
          </div>
        ) : postoponed ? (
          <span className="finished">PST</span>
        ) : cancelled ? (
          <span className="finished">CAN</span>
        ) : (
          <span className="upcoming-label">PRE</span>
        )}
      </div>

      <div className="teams-content">
        <div className="teams-list">
          <div className="team">
            <div className="team-info">
              <img src={game.teams.home.logo} loading='lazy' alt={game.teams.home.name} />
              <span className="team-name">{game.teams.home.name}</span>
            </div>
            {!isNotStarted(status) && <span className="score">{game.goals.home}</span>}
          </div>

          <div className="team">
            <div className="team-info">
              <img src={game.teams.away.logo} loading='lazy' alt={game.teams.away.name} />
              <span className="team-name">{game.teams.away.name}</span>
            </div>
            {!isNotStarted(status) && <span className="score">{game.goals.away}</span>}
          </div>
        </div>

        {isNotStarted(status) && (
          <div className="kickoff-side">
            <span className="kickoff-time">
              {formatTime(game.fixture.date)}
            </span>
          </div>
        )}
      </div>
    </li>
  )
}

export default Game

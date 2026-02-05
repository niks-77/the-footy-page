import useGameStore from '../../stores/gameListStore.js'
import './index.styl'
import GameSkeleton from '../SkeletonLoading/GameSkeleton.jsx'
import { isLive, isFinished, isNotStarted, isPostponed, isCancelled } from '../../utils/gameStatuses.js'
import { formatTime } from '../../utils/dateFormatter.js'

const Game = ({ game, onSelect }) => {

  const { loading } = useGameStore()

  if (loading) {
    return <GameSkeleton />
  }

  const status = game.fixture.status.short
  const time = formatTime(game.fixture.date)

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
        ) : isPostponed(status) ? (
          <span className="finished">PST</span>
        ) : isCancelled(status) ? (
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
              {time}
            </span>
          </div>
        )}
      </div>
    </li>
  )
}

export default Game

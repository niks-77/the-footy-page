import useGameStore from '../../stores/gameStore'
import './Game.styl'
import GameSkeleton from '../SkeletonLoadingGroup/GameSkeleton.jsx'

const LIVE_STATUSES = ['1H', '2H', 'ET', 'P']
const FINISHED_STATUSES = ['FT', 'AET', 'PEN']

const isLive = (status) => LIVE_STATUSES.includes(status)
const isFinished = (status) => FINISHED_STATUSES.includes(status)

const formatTime = (isoDate) => {
  const date = new Date(isoDate)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const Game = ({ game, onSelect }) => {

  const { loading } = useGameStore()

  if (loading) {
    return <GameSkeleton />
  }

  
  const status = game.fixture.status.short
  const gameDate = new Date(game.fixture.date)
  const now = new Date()

  const finished = isFinished(status) || (status === 'NS' && gameDate < now)
  const live = isLive(status)
  const postoponed = (status === 'PST')
  const cancelled = (status === 'CANC')

  return (
    <li className="game-item" onClick={() => onSelect(game.fixture.id)}>

      <div className="team">
        <img src={game.teams.home.logo} loading='lazy' alt={game.teams.home.name} />
        <span className="team-name">{game.teams.home.name}</span>
        <span className="score">{game.goals.home}</span>
      </div>

      {finished ? (
        <span className="finished">Finished</span>
      ) : live ? (
        <span className="live-indicator">
          <span className="live-dot" />
          <span className="live-text">LIVE</span>
        </span>
      ) : postoponed ? (
        <span className="finished">Postponed</span>
      ) : cancelled ? (
        <span className="finished">Cancelled</span>
      )  : (
        <span className="kickoff-time">
          {formatTime(game.fixture.date)}
        </span>
      )}

      <div className="team">
        <img src={game.teams.away.logo} loading='lazy' alt={game.teams.away.name} />
        <span className="team-name">{game.teams.away.name}</span>
        <span className="score">{game.goals.away}</span>
      </div>

    </li>
  )
}

export default Game

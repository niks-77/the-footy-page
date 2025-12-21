import './Game.styl'

const LIVE_STATUSES = ['1H', '2H', 'ET', 'P']
const FINISHED_STATUSES = ['FT', 'AET', 'PEN']

const isLive = (status) => LIVE_STATUSES.includes(status)
const isFinished = (status) => FINISHED_STATUSES.includes(status)

const Game = ({ game, onSelect }) => {
  const formatTime = (isoDate) => {
    const date = new Date(isoDate)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const status = game.fixture.status.short
  const gameDate = new Date(game.fixture.date)
  const now = new Date()

  
  const finished = isFinished(status) || (status === 'NS' && gameDate < now)
  const live = isLive(status)

  return (
    <li className="game-item" onClick={() => onSelect(game.fixture.id)}>
      <div className="team">
        <img src={game.teams.home.logo} alt={game.teams.home.name} />
        <span className="team-name">{game.teams.home.name}</span>
        <span className="score">{game.goals.home}</span>
      </div>

      {finished ? (
        <span className="finished">Finished</span>
      ) : live ? (
        <span className="live-indicator">
          <span className="live-dot"></span>
          <span className="live-text">LIVE</span>
        </span>
      ) : (
        <span className="kickoff-time">{formatTime(game.fixture.date)}</span>
      )}

      <div className="team">
        <img src={game.teams.away.logo} alt={game.teams.away.name} />
        <span className="team-name">{game.teams.away.name}</span>
        <span className="score">{game.goals.away}</span>
      </div>
    </li>
  )
}

export default Game

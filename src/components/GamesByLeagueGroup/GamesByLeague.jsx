import Game from '../GameGroup/Game.jsx'
import './GamesByLeague.styl'

const GamesByLeague = ({ games, onSelectGame }) => {
  // Group games by league id (unique), not just name
  const groups = {}

  games.forEach(game => {
    const leagueId = game.league.id
    if (!groups[leagueId]) {
      groups[leagueId] = {
        league: game.league, // store full league object
        games: []
      }
    }
    groups[leagueId].games.push(game)
  })

  return (
    <div>
      {Object.values(groups).map(({ league, games }) => (
        <div key={league.id} className="league-group">
          <h2 className="league-header">
            {league.logo && <img src={league.logo} alt={league.name} className="league-icon" />}
            <span>{league.name}</span>
            {league.country && <span className="league-country">({league.country})</span>}
          </h2>

          <ul className='games-container'>
            {games.map(game => (
              <Game key={game.fixture.id} game={game} onSelect={onSelectGame} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default GamesByLeague

import '../Game/index.styl'

const GameSkeleton = () => {
  return (
    <li className="game-item is-loading">
      <div className="status-side">
        <div className="upcoming-label" style={{ width: '20px', height: '10px' }} />
      </div>
      <div className="teams-content">
        <div className="teams-list">
          <div className="team">
            <div className="team-info">
              <div className="team-logo" />
              <div className="team-name" />
            </div>
            <div className="score" />
          </div>
          <div className="team">
            <div className="team-info">
              <div className="team-logo" />
              <div className="team-name" />
            </div>
            <div className="score" />
          </div>
        </div>
      </div>
    </li>
  )
}

export default GameSkeleton
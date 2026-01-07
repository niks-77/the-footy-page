import '../GameGroup/Game.styl'

const GameSkeleton = () => {
    return(
      <li className="game-item is-loading">

        <div className="team">
          <div className="team-logo" />
          <div className="team-name" />
          <div className="score" />
        </div>

        <span className="kickoff-time" />

        <div className="team">
          <div className="team-logo" />
          <div className="team-name" />
          <div className="score" />
        </div>

      </li>
    )
}

export default GameSkeleton
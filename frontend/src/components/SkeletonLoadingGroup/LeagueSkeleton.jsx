import GameSkeleton from '../SkeletonLoadingGroup/GameSkeleton.jsx'
import '../GamesByLeagueGroup/GamesByLeague.styl'

const LeagueSkeleton = () => {
  return (
    <div>
      {[1, 2,3].map(i => (
        <div key={i} className="league-group">

          <div className="league-header is-loading">
            <div className="league-icon" />
            <span className="league-name" />
            <span className="league-country" />
          </div>

          <ul className="games-container">
            {[1, 2, 3].map(j => (
              <GameSkeleton key={j} />
            ))}
          </ul>

        </div>
      ))}
    </div>
  )
}

export default LeagueSkeleton

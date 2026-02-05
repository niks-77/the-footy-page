import './index.styl'
import useGameStore from '../../stores/gameListStore.js'
import { GET_GAMES_OPTIONS } from '../../constants/index.js'


const Typefilter = () => {
    const { showLiveGames, toggleLiveGames } = useGameStore()

    return (
        <div className='typefilter-group'>
            <button
                onClick={toggleLiveGames}
                disabled={!showLiveGames}>
                {GET_GAMES_OPTIONS.ALL}
            </button>

            <button
                onClick={toggleLiveGames}
                disabled={showLiveGames}>
                <div className='live-indicator'></div>
                {GET_GAMES_OPTIONS.LIVE}
            </button>
        </div>
    )
}

export default Typefilter
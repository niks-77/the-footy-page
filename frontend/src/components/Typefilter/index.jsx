import './index.styl'
import useGameStore from '../../stores/gameStore'


const Typefilter = () => {
    const { showLiveGames, setShowLiveGames } = useGameStore()

    return (
        <div className='typefilter-group'>
            <button
                onClick={() => setShowLiveGames(false)}
                disabled={!showLiveGames}>
                All
            </button>

            <button
                onClick={() => setShowLiveGames(true)}
                disabled={showLiveGames}>
                <div className='live-indicator'></div>
                Live
            </button>
        </div>
    )
}

export default Typefilter
import Game from './Game.jsx'

const GamesByLeague = ({games}) => {
    const groups = {}

    games.forEach(game => {
        const league = game.league.name;

        if(!groups[league]){
            groups[league] = []
        }

        groups[league].push(game)

        return groups;
    });

    return(
        <div>
            {Object.entries(groups).map(([league, games]) => (
                <div key={league}>
                    <h2> {league} </h2>

                    <ul className='league-games'>
                        {games.map(game => (
                            <Game key={game.fixture.id} game = {game}/>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default GamesByLeague;
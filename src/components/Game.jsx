import { useState } from 'react';
import './Game.styl'
import { useNavigate } from 'react-router-dom';

const Game = ({game}) => {
    const navigate = useNavigate()

    const formatTime = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString([], { 
      hour: "2-digit", 
      minute: "2-digit" 
    })
  }

    return(
        <li className='game-item' onClick={() => navigate(`game/${game.fixture.id}`)}>
            <div className='team'>
                <img src= {game.teams.home.logo}/>
                <span className='team-name'> {game.teams.home.name} </span>
                <span className='score'> {game.goals.home} </span>
            </div>

            {game.fixture.status.short != "NS" && game.fixture.status.short !== "FT" && (
            <div className="live-indicator">
              <span className="live-dot"></span>
              <span className="live-text">LIVE</span>
            </div>) || game.fixture.status.short != "NS" && (<span className='vs'> - </span>) ||
              <div className="kickoff-time">
               {formatTime(game.fixture.date)}
           </div> }

            <div className='team'>
                <span className='score'> {game.goals.away} </span>
                <img src= {game.teams.away.logo} />
                <span className='team-name'> {game.teams.away.name} </span>
            </div>
        </li>
    )
}

export default Game;
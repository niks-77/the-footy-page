import { create } from "zustand";
import { getGamesById } from "../services/football";


const mapStats = (statsArray) => {
    const mapped = {}

    statsArray.forEach(stat => {
        mapped[stat.type] = stat.value
    })

    return mapped
}

const useGameDetailsStore = create((set) => ({
    selectedGame: null,
    selectedGameId: null,
    homeStats: null,
    awayStats: null,
    loading: null,
    error: null,

    openGame: async (game) => {
        set({
            selectedGame: game,
            selectedGameId: game.fixture.id,
            loading: true,
            error: null
        })

        try {
            const result = await getGamesById(game.fixture.id)
            const home = result.data.response[0]
            console.log(result.data)
            const away = result.data.response[1]

            set({
                homeStats: {
                    team: home.team,
                    stats: mapStats(home.statistics)
                },

                awayStats: {
                    team: away.team,
                    stats: mapStats(away.statistics)
                },
                loading: false
            })
        }

        catch (err) {
            set({ error: err.message, loading: false })
        }
    },

    closeGame: () => {
        set({
            selectedGameId: null,
            homeStats: null,
            awayStats: null,
            loading: null,
            error: null
        })
    }
}))

export default useGameDetailsStore
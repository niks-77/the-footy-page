import { create } from 'zustand'
import { getGames } from '../services/football.js'
import { formatDateToString, today } from '../utils/dateFormatter.js'

const useGameStore = create((set) => ({
    games: [],
    date: today(),
    loading: false,

    //Used in Typefilter to toggle between live and all games
    showLiveGames: false,
    toggleLiveGames: () => set(state => ({ showLiveGames: !state.showLiveGames })),


    //Used in Dayfilter to set the selected date
    setSelectedDate: (date) => set({ date }),


    //Used to fetch games from the API
    setGames: async (date) => {
        set({ loading: true })

        const formattedDate = formatDateToString(date)

        try {
            const result = await getGames(formattedDate)
            set({ games: result.data, loading: false })
        }

        catch (err) {
            console.error('[STORE ERROR]', err)
            set({ loading: false })
        }
    }
}));

export default useGameStore;
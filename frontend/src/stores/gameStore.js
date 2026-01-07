import {create} from 'zustand'
import {getYesterdayGames, getTodayGames, getTomorrowGames} from '../services/football.js'

const useGameStore = create((set) => ({
    games: [],
    date: 'today',
    showLiveGames: false,
    loading: false,

    setShowLiveGames: async (value) => {
         set({showLiveGames: value})
    },

    setSelectedDate: (date) => set({date: date}),
    setGames: async (date) => {
        let result;
        set({loading: true})

        if(date === 'yesterday'){
            result = await getYesterdayGames()
        }
        else if(date === 'today'){
            result = await getTodayGames()
        }
        else if(date === 'tomorrow'){
            result = await getTomorrowGames()
        }

        set({games: result.data.response, loading: false})
    }
}));

export default useGameStore;
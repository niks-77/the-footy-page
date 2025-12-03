import {create} from 'zustand'
import footballService from '../services/football.js'

const useGameStore = create((set) => ({
    games: [],
    date: 'today',

    setSelectedDate: (date) => set({date: date}),
    setGames: async (date) => {
        let result;

        if(date === 'yesterday'){
            result = await footballService.getYesterdayGames()
        }
        else if(date === 'today'){
            result = await footballService.getTodayGames()
        }
        else if(date === 'tomorrow'){
            result = await footballService.getTomorrowGames()
        }

        set({games: result.response})
    }
}));

export default useGameStore;
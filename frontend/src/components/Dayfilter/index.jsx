import './index.styl'
import { ChevronLeft, ChevronRight } from "lucide-react"
import useGameStore from '../../stores/gameStore'
import { useState } from 'react'

const Dayfilter = () => {
    const { date, setSelectedDate } = useGameStore()
    const [count, setCount] = useState(1)

    const turnCountToDays = (count) => {
        switch (count) {
            case 0:
                return 'yesterday'
            case 1:
                return 'today'
            case 2:
                return 'tomorrow'
            default:
                return 'today'
        }
    }

    return (
        <div className='dayfilter-group'>

            <button onClick={() => { setCount(count - 1); setSelectedDate(turnCountToDays(count - 1)) }}
                disabled={date === 'yesterday'}>
                <ChevronLeft />
            </button>

            <span> {date} </span>

            <button onClick={() => { setCount(count + 1); setSelectedDate(turnCountToDays(count + 1)) }}
                disabled={date === 'tomorrow'}>
                <ChevronRight />
            </button>

        </div>
    )
}

export default Dayfilter
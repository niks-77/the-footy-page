import './index.styl'
import { ChevronLeft, ChevronRight } from "lucide-react"
import useGameStore from '../../stores/gameListStore'
import { formatDateToString, isYesterday, isTomorrow } from '../../utils/dateFormatter'
import { subDays, addDays } from 'date-fns'

const Dayfilter = () => {
    const { date, setSelectedDate } = useGameStore()

    const label = formatDateToString(date)

    const handlePrevious = () => {
        const newDate = subDays(date, 1)
        setSelectedDate(newDate)
    }

    const handleNext = () => {
        const newDate = addDays(date, 1)
        setSelectedDate(newDate)
    }

    return (
        <div className='dayfilter-group'>

            <button onClick={handlePrevious}
                disabled={isYesterday(date)}>
                <ChevronLeft />
            </button>

            <span> {label} </span>

            <button onClick={handleNext}
                disabled={isTomorrow(date)}>
                <ChevronRight />
            </button>

        </div>
    )
}

export default Dayfilter
const LIVE_STATUSES = ['1H', '2H', 'ET', 'P']
const FINISHED_STATUSES = ['FT', 'AET', 'PEN']
const NOT_STARTED_STATUSES = ['NS']
const POSTPONED_STATUSES = ['PST']
const CANCELLED_STATUSES = ['CANC']


export const isLive = (status) => LIVE_STATUSES.includes(status)
export const isFinished = (status) => FINISHED_STATUSES.includes(status)
export const isNotStarted = (status) => NOT_STARTED_STATUSES.includes(status)
export const isPostponed = (status) => POSTPONED_STATUSES.includes(status)
export const isCancelled = (status) => CANCELLED_STATUSES.includes(status)

export const getStatus = (status) => {
    if (isLive(status)) return 'Live'
    if (isFinished(status)) return 'Finished'
    if (isNotStarted(status)) return 'Upcoming'
    if (isPostponed(status)) return 'Postponed'
    if (isCancelled(status)) return 'Cancelled'
}

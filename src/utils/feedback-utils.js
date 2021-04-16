import { getRandomFrom } from './basic-utils'
import { right, wrong, error } from './feedbacks'

export const getRightFeedback = () => getRandomFrom(right)
export const getWrongFeedback = () => getRandomFrom(wrong)
export const getErrorFeedback = () => getRandomFrom(error)

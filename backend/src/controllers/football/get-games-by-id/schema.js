import { z } from 'zod'

const getGamesByIdSchema = z.object({
    fixture: z.string()
})

export default getGamesByIdSchema;

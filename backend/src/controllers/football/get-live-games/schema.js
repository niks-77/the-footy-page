import { z } from 'zod';

const getLiveGamesSchema = z.object({
    live: z.literal('all')
})

export default getLiveGamesSchema;

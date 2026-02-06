import { z } from "zod";

const getGamesSchema = z.object({
    date: z.string(),
})

export default getGamesSchema;
import { z } from "zod";
import { DATE_OPTIONS } from "../../../constants/index.js";

const getGamesSchema = z.object({
    date: z.string(),
})

export default getGamesSchema;
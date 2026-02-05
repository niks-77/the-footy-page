

import { ZodError } from "zod";

/*
axios errors

{
    message: '...',
    response: {
        status: 404,
        data: {
            message: '...'
        }
   ...
}
*/

const errorHandler = (err, req, res, next) => {
    console.error(err.message)

    //Axios error
    if (err.response) {
        return res.status(err.response.status).json({ message: err.response.data.message })
    }

    //Zod error
    if (err instanceof ZodError) {
        return res.status(400).json({
            message: "Invalid query parameters",
            errors: err.errors,
        });
    }

    //Axios network error
    if (err.request) {
        return res.status(503).json({ message: 'External service unavailable' })
    }

    //Validation or custom error
    if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message })
    }

    //Unknown error
    return res.status(500).json({ message: 'Internal Server Error' })
}

const unknownEndpoint = (req, res) => {
    res.status(404).json({ message: 'Unknown endpoint' })
}

export { errorHandler, unknownEndpoint }
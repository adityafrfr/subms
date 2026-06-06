import Note from "../models/note.model.js"

export const getAllNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({})
        res.status(200).json({
            success: true, data: notes
        })

    } catch (error) {
        next(error)
    }
}

export const getNoteById = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) {
            const error = new Error('Not found on server')
            error.status = 404
            throw error
        }

        res.status(201).json({
            success: true, data: note
        })
    } catch (error) {
        next(error)
    }
}

export const createNote = async (req, res, next) => {
    try {
        const {content, important} = req.body

        if (!content) {
            return res.status(400).json({
                success: false, message: 'Content is required'
            })
        }

        const newNote = await Note.create({
            content, important: important || false
        })

        res.status(201).json({
            success: true, data: newNote
        })
    } catch (error) {
        next(error)
    }
}

export const deleteNote = async (req, res, next) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id)

        if (!note) {
            const error = new Error('Not found on server')
            error.status = 404
            throw error
        }

        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

export const updateNote = async (req, res, next) => {
    try {
        const { content, important } = req.body

        const note = await Note.findByIdAndUpdate(
            req.params.id,
            { content, important },
            { new: true, runValidators: true }
        )

        if (!note) {
            const error = new Error('Not found on server')
            error.status = 404
            throw error
        }

        res.json({
            success: true, data: note
        })
    } catch (error) {
        next(error)
    }
}
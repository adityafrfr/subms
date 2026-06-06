import {Router} from 'express'
import {getAllNotes, getNoteById, createNote, deleteNote, updateNote} from "../controllers/note.controller.js"

const noteRouter = Router()

noteRouter.get('/', getAllNotes)

noteRouter.get('/:id', getNoteById)

noteRouter.post('/', createNote)

noteRouter.delete('/:id', deleteNote)

noteRouter.put('/:id', updateNote)

export default noteRouter

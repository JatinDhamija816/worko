import express from 'express'
import { deleteProfile, getAllUsers, getProfileById, register, updateProfile } from '../controllers/UserController.js'

const router = express()

router.post('/register', register)
router.get('/getAllUser', getAllUsers)
router.get('/getProfileById/:id', getProfileById)
router.put('/updateProfile/:id', updateProfile)
router.delete('/deleteProfile/:id', deleteProfile)

export default router
import mongoose from 'mongoose'

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database Connected')
    } catch (error) {
        console.error('DB Connection Error ', error)
    }
}
export default ConnectDB
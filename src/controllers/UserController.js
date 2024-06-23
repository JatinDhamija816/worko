import User from "../models/UserSchema.js";
import hashedPassword from "../middleware/hashPassword.js"

export const register = async (req, res) => {
    try {
        const { email, name, age, city, zipCode, password } = req.body

        if (!email || !name || !age || !city || !zipCode || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all details'
            })
        }
        const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegx.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User with this email already exists'
            })
        }

        const hashPassword = await hashedPassword(password)
        if (!hashPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwrord must contain at least one uppercase letter, one lowercase letter ,one number nad be at least 8 charachters long'
            })
        }
        const user = new User({ email, name, age, city, zipCode, password: hashPassword })
        await user.save()

        return res.status(200).json({
            success: true,
            message: 'User Resgistered Successfully',
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error in Register controller',
            error
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {

        const user = await User.find()

        return res.status(200).json({
            succes: true,
            message: 'User Profile',
            user
        })
    } catch (error) {
        console.error('Error in getProfile Module', error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error
        });
    }
}

export const getProfileById = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(id);

        return res.status(200).json({
            succes: true,
            message: 'User Profile',
            user
        })
    } catch (error) {
        console.error('Error in getProfile Module', error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { id } = req.params
        const { email, name, age, city, zipCode, password } = req.body

        const updateFields = {};
        if (email) updateFields.email = email;
        if (name) updateFields.name = name;
        if (age) updateFields.age = age;
        if (city) updateFields.city = city;
        if (zipCode) updateFields.zipCode = zipCode;
        if (password) updateFields.password = password;

        await User.findByIdAndUpdate(id, updateFields, { new: true });

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
        });
    } catch (error) {
        console.error('Error in UpdateProfile Controller', error)
        return res.status(404).json({
            success: false,
            message: 'Error in updateProfile Module',
            error
        })
    }
}

export const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params

        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'Profile Deleted successfully',
        });
    } catch (error) {
        console.error('Error in Delete Controller', error)
        return res.status(404).json({
            success: false,
            message: 'Error in DeleteProfile Module',
            error
        })
    }
}

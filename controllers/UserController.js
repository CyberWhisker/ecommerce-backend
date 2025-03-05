const Model = require('../models/UserModel')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const data = await Model.loginHash(email, password)
        res.status(200).json({ _id: data._id, email: data.email, role: data.role, picture: data.picture, verified: data.verified })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const register = async (req, res) => {
    try {
        const user = await Model.registerHash(req.body)

        res.status(200).json({ _id: user._id, email: user.email, role: user.role, picture: user.picture, verified: user.verified })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateData = async (req, res) => {
    const { id } = req.params;
    const { password, ...rest } = req.body;
    let updateFields = rest;

    try {
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            updateFields.password = hash;
        }

        if (req.file) {
            updateFields.picture = `/profileImg/${req.file.filename}`
        }

        const user = await Model.findByIdAndUpdate(id, updateFields, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteData = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Model.findByIdAndDelete({ _id: id });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const usingGoogle = async (req, res) => {
    const { email } = req.body;
    try {
        // Create user data with a default password
        const formData = {
            ...req.body,
            password: 'default',  // This can be set to a default password or generated
        };

        // Attempt to register a new user
        const user = await Model.registerHash(formData);

        // Return the newly registered user details
        res.status(200).json({
            _id: user._id,
            email: user.email,
            role: user.role,
            picture: user.picture,
            verified: user.verified,
        });
    } catch (error) {
        if (error.message === 'Email already in use') {
            // If the email is already in use, find the existing user
            const user = await Model.findOne({ email: email });

            // Return the existing user's details
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                picture: user.picture,
                verified: user.verified,
            });
        }

        // Handle other errors
        res.status(400).json({ error: error.message });
    }
};

// Get All Users
const getData = async (req, res) => {
    try {
        const data = await Model.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports = {
    getData,
    login,
    register,
    usingGoogle,
    updateData,
    deleteData
};

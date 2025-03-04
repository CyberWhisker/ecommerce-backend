const Model = require('../models/TechStackModel')

const storeData = async (req, res) => {
    const { ...rest } = req.body
    let newData = rest;
    try {
        if (req.file) {
            newData.image = `/techStackImg/${req.file.filename}`
        }
        const data = await Model.create(newData)
        res.status(200).json(data)
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
        console.log(user)
        res.status(200).json(user);
    } catch (error) {
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
    storeData,
    updateData,
    deleteData,
    getData,
};

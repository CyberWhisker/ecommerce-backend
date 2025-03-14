const Model = require('../models/ItemModel')

const storeData = async (req, res) => {
    const { ...rest } = req.body
    let newData = rest;
    try {
        if (req.file) {
            newData.image = `/itemImg/${req.file.filename}`
        }
        const data = await Model.create(newData)
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

const updateData = async (req, res) => {
    const { id } = req.params
    const { ...rest } = req.body
    let newData = rest;
    try {
        if (req.file) {
            newData.image = `/itemImg/${req.file.filename}`
        }
        const data = await Model.findByIdAndUpdate(id, newData)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
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

const getData = async (req, res) => {
    try {
        const data = await Model.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const getItemWithStock = async (req, res) => {
    try {
        const data = await Model.aggregate([
            // Step 1: Lookup supply data
            {
                $lookup: {
                    from: 'supplies',
                    localField: '_id',
                    foreignField: 'itemId',
                    as: 'supply'
                }
            },
            // Step 2: Compute totalStock from the supply data
            {
                $addFields: {
                    stock: { $sum: '$supply.quantity' },
                    id: '$_id' // Add id field from _id
                }
            },
            // Step 3: Remove the supply field
            {
                $project: {
                    supply: 0 // Exclude the supply field
                }
            }
        ]);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    storeData,
    updateData,
    deleteData,
    getData,
    getItemWithStock
};

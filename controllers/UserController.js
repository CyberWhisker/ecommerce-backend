

//Get Data
const getData = async (req, res) => {
    const data = {
        "name": "John Doe",
        "section": "BSIT",
    }
    res.status(200).json(data)
}

module.exports = {
    getData,
}
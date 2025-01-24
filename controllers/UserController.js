// controllers/UserController.js
const axios = require('axios');
const { getAuth0AccessToken } = require('../utils/auth0Utils');


// Get All Users
const getData = async (req, res) => {
    try {
        const accessToken = await getAuth0AccessToken();

        // Make the request to the Auth0 Management API to get users
        const response = await axios.get(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // Send the fetched users as a JSON response
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching users from Auth0:', error);
        res.status(500).json({ message: 'Error fetching users from Auth0', error });
    }
};

module.exports = {
    getData,
};

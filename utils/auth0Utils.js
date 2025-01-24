// auth0Utils.js
const axios = require('axios');

// Fetch the Auth0 access token using client credentials flow
const getAuth0AccessToken = async () => {
    const tokenUrl = `https://${process.env.AUTH0_DOMAIN}/oauth/token`;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const clientSecret = process.env.AUTH0_CLIENT_SECRET;
    const audience = `https://${process.env.AUTH0_DOMAIN}/api/v2/`;

    try {
        const response = await axios.post(tokenUrl, {
            client_id: clientId,
            client_secret: clientSecret,
            audience: audience,
            grant_type: 'client_credentials',
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token', error);
        throw error;
    }
};

module.exports = { getAuth0AccessToken };

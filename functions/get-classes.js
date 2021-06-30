require('dotenv').config()
const axios = require('axios')
var classes
const handler = async (event) => {
    try {
        var url = `https://api.airtable.com/v0/appiaoTw3dT0mkQUJ/GoogleMeet?api_key=${process.env.AIRTABLE_API_KEY}&sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdirection%5D=asc`
        const { data } = await axios.get(url)
        return {
            statusCode: 200,
            body: JSON.stringify(data.records)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }
}
module.exports = { handler }
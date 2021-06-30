var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
require('dotenv').config()
var classes
const handler = async (event) => {
    try {
        var xhr = new XMLHttpRequest()
        var url = `https://api.airtable.com/v0/appiaoTw3dT0mkQUJ/GoogleMeet?sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdirection%5D=asc`
        xhr.open("GET", url, false);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Authorization", `Bearer ${process.env.AIRTABLE_API_KEY}`);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                classes = JSON.parse(xhr.responseText).records
            }
        };
        xhr.send();


        return {
            statusCode: 200,
            body: JSON.stringify(classes)
        }



    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }
}

module.exports = { handler }
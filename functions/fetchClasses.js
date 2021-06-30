var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'keyLmJYlcyCYWbel0' }).base('appiaoTw3dT0mkQUJ');

const handler = async (event) => {
    const classes = []
    try {
        table.select({
            view: 'Grid view'
        }).firstPage(function (err, records) {
            if (err) { console.error(err); return; }
            classes = records
        });
        return {
            statusCode: 200,
            body: JSON.stringify(classes)
        }

    } catch (error) {
        return {
            statusCode: 666,
            body: 'ss'
        }
    }
}

module.exports = { handler }
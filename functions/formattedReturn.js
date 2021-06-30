const handler = (status, body) => {
    return {
        statusCode: status,
        body: JSON.stringify(body)
    }
}

module.exports = { handler }
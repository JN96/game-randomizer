module.exports = {
    handleError: function (error) {
        let timestamp = new Date();
        let uniqueId = Math.random();
        let errorObject = {
            message: error.message,
            urlResponse: error.config.url,
            uid: uniqueId,
            timestamp: Date(timestamp)
        };
        return errorObject;
    }
};
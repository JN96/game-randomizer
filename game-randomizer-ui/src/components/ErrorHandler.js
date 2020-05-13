module.exports = {
    handleError: function (error) {
        let timestamp = new Date();
        if (error) {
            error.timestamp = Date(timestamp);
            error.urlResponse = error.config.url;
            return error;
        }
    }
};
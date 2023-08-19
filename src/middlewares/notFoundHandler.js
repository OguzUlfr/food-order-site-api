const notFoundHandler = (req, res, next) => {
    res.status(404).send('Yanlış uç nokta');
}

module.exports = notFoundHandler;
const errorhandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send('Sunucuda bir hata meydana geldi');
}

module.exports = errorhandler;
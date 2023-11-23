module.exports = (error, request, response, next) => {
  console.log('❌🔥 ERROR_HANDLER: ', error);
  response.sendStatus(500);
};

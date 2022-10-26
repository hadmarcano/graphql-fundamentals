function errorHandler(error) {
  console.log(error);
  throw new Error("has occured an error in server ");
}

module.exports = errorHandler;

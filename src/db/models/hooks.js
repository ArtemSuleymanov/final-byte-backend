export const handleSaveError = (error, doc, next) => {
  const { code, name } = error;
  console.log(code, name);
  error.status = code === 11000 && name === 'MongoServerError' ? 409 : 400;
  next();
};

export const setUpdateSettings = function (next) {
  this.options.new = true;
  this.options.runValidations = true;
  next();
};

const { emailExists, invalidData } = require("../../utils/helpers/error-helpers");

const CreateUserValidationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details[0].message;

      if (errorMessage.includes('email') && errorMessage.includes('already exists')) {
        const customError = emailExists();
        return res.status(customError.status).json({ message: customError.message });
      } else {
        const customError = invalidData();
        return res.status(customError.status).json({ message: customError.message });

      }
    }

    next();
  };
};

module.exports = CreateUserValidationMiddleware;

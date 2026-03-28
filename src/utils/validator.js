const validator = require("validator");
const validatorSignUp = (req) => {
  const { firstName, age, email, password, skill } = req.body;

  const allowedFileds = [
    "firstName",
    "lastName",
    "email",
    "password",
    "skill",
    "gender",
    "age",
    "about",
  ];
  const isUpdatedAllow = Object.keys(req.body).every((k) =>
    allowedFileds.includes(k),
  );

  if (!isUpdatedAllow) {
    throw new Error("these fields are not allowed to add !");
  }
  if (!firstName || firstName.length < 4 || firstName.length > 100) {
    throw new Error(
      "firstName is required and must be between 4 and 100 characters !",
    );
  }

  if (!age || age < 18) {
    throw new Error("age is required and must be at least 18 years old !");
  }

  if (!email || !validator.isEmail(email)) {
    throw new Error("email is required and must be valid !");
  }
  if (!password || !validator.isStrongPassword(password)) {
    throw new Error("password is required and must be valid !");
  }

  if (skill && skill.length > 20) {
    throw new Error("skill must be less than 20! ");
  }
};

const profileEditValidator = (req) => {
  try {
    const allowedFields = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "skill",
      "about",
    ];

    const isValidFields = Object.keys(req.body).every((field) =>
      allowedFields.includes(field),
    );
    if (!isValidFields) {
      throw new Error("you are editing invalid fields");
    }
    return isValidFields;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  validatorSignUp,
  profileEditValidator
};

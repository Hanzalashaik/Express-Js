import { body, validationResult } from "express-validator";

//middleware

const usersRegisterValidation = () => {
  return [
    body(
      "firstName",
      "FirstName should have mininum 2 character and maximam 15"
    ).isLength({ min: 2, max: 15 }),
    body("lastName").isLength({ min: 2 }).isLength({ max: 15 }),
    body("email", "Should be a valid email").isEmail(),
    body(
      "password",
      "password must have uppercase lowercase number and character"
    ).isStrongPassword(),
    body("phone","Must be a valid phone number").isMobilePhone(),
    body("address").isLength({ min: 6, max: 100 })
  ];
};


//middleware
const errorMiddleware = (req,res,next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }
  return next();
};

export {usersRegisterValidation , errorMiddleware}
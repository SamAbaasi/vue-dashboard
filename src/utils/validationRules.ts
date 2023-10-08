import { extend, configure } from "vee-validate";
import {
  required,
  email,
  min,
  alpha,
  alpha_num,
} from "vee-validate/dist/rules";

configure({
  bails: false,
});

extend("required", required);
extend("email", email);
extend("alpha", alpha);
extend("alpha_num", alpha_num);
extend("min", {
  ...min,
  message: (field, { length }) =>
    `${field} must have at least ${length} characters`,
});
extend("password", {
  validate(value) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,10}$/;
    return regex.test(value);
  },
  message:
    "The password must contain at least one uppercase letter, and one lowercase letter, and be 4 to 10 characters long.Plz consider that you cant use space.",
});

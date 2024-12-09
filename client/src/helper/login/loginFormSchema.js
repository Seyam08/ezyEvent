import * as yup from "yup";

// Form Validation Schema
export const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters") // Minimum length
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter") // Capital letter
    .matches(/\d/, "Password must contain at least one number") // Number
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ) // Special symbol
    .required("Password is required"),
  rememberMe: yup.boolean(),
});

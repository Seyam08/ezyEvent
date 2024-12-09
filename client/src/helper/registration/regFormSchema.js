import * as yup from "yup";

// Form Validation Schema
export const regFormSchema = yup.object().shape({
  fullname: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  username: yup.string().required("Username is required"),
  phone: yup
    .string()
    .matches(
      /^\+880\d{10}$/,
      "Phone number must be in the format +880XXXXXXXXXX"
    )
    .required("Phone number is required"),
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Please confirm your password"),
  agreed: yup
    .boolean()
    .oneOf([true], "You must agree with the terms and conditions")
    .required("You must agree with the terms and conditions"),
  avatar: yup
    .mixed()
    .test("required", "Avatar is required", (value) => {
      // Check if a file is selected
      return value && value?.length > 0;
    })
    .test("fileSize", "File size must be less than 2MB", (value) => {
      return value && value[0] && value[0]?.size <= 2 * 1024 * 1024; // 2MB
    })
    .test(
      "fileType",
      "Unsupported file type. Only PNG and JPEG are allowed.",
      (value) => {
        return (
          value &&
          value[0] &&
          ["image/jpeg", "image/png"].includes(value[0]?.type)
        );
      }
    ),
});

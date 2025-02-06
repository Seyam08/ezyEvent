import * as yup from "yup";

// Form Validation Schema
export const editAccountsInfo = yup.object().shape({
  fullname: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

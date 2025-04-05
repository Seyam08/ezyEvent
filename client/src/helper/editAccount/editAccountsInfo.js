import * as yup from "yup";

// Form Validation Schema
export const editAccountsInfoSchema = yup.object().shape({
  fullname: yup.string(),
  email: yup.string().email("Invalid email address"),
});

import * as yup from "yup";

// Form Validation Schema
export const editEventStatusSchema = yup.object().shape({
  status: yup
    .string()
    .oneOf(["Upcoming", "Ongoing", "Completed"], "Invalid status")
    .required("Status is required"),
});

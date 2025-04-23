import * as yup from "yup";

// Form Validation Schema
export const editEventDateSchema = yup.object().shape({
  eventDate: yup
    .date()
    .typeError("Invalid date format")
    .required("Event Date is required"),
});

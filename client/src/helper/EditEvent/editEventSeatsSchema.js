import * as yup from "yup";

// Form Validation Schema
export const editEventSeatsSchema = yup.object().shape({
  attendanceLimit: yup
    .number()
    .positive("Attendance limit must be a positive number")
    .integer("Attendance limit must be an integer")
    .max(100, "Attendance limit cannot exceed 100")
    .required("Attendance limit is required"),
});

import * as yup from "yup";

// Form Validation Schema
export const addEventFormSchema = yup.object().shape({
  eventName: yup.string().required("Event Name is required"),
  eventDate: yup
    .date()
    .typeError("Invalid date format")
    .required("Event Date is required"),
  attendanceLimit: yup
    .number()
    .positive("Attendance limit must be a positive number")
    .integer("Attendance limit must be an integer")
    .required("Attendance limit is required"),
  hostName: yup
    .array()
    .of(yup.string().required("Each host must have a valid username"))
    .min(1, "At least one host is required"),
  speakerName: yup
    .array()
    .of(yup.string().required("Each speaker must have a valid username"))
    .min(1, "At least one speaker is required"),
  status: yup
    .string()
    .oneOf(["Upcoming", "Ongoing", "Completed"], "Invalid status")
    .required("Status is required"),
});

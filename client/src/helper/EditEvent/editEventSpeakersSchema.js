import * as yup from "yup";

// Form Validation Schema
export const editEventSpeakersSchema = yup.object().shape({
  speakersName: yup
    .array()
    .of(yup.string().required("Each speaker must have a valid username"))
    .min(1, "At least one speaker is required"),
});

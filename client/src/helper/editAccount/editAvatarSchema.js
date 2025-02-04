import * as yup from "yup";

// Form Validation Schema
export const editAvatarSchema = yup.object().shape({
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

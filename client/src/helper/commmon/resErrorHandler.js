export function resErrorHandler(errorResponse) {
  // Initialize an empty errors object
  const errors = {};

  // Handle network errors like FETCH_ERROR
  if (errorResponse.status === "FETCH_ERROR" && errorResponse.error) {
    errors.message =
      errorResponse.error ||
      "Oops! Something went wrong while loading the data.";
  }

  // Handle validation errors with data.errors structure
  else if (errorResponse.data?.errors?.common) {
    errors.message = errorResponse.data.errors.common.msg || "";
  }

  // Handle unknown or generic errors with a fallback
  else if (errorResponse.message) {
    errors.fetch = errorResponse.message;
  } else {
    errors.fetch = errors.fetch || "An unknown error occurred.";
  }

  return errors;
}

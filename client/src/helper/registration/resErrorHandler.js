export function resErrorHandler(errorResponse) {
  // Initialize an empty errors object
  const errors = {};

  // Handle network errors like FETCH_ERROR
  if (errorResponse.status === "FETCH_ERROR" && errorResponse.error) {
    errors.fetch =
      errorResponse.error ||
      "Oops! Something went wrong while loading the data.";
  }

  // Handle validation errors with data.errors structure
  else if (errorResponse.data?.errors) {
    const serverErrors = errorResponse.data.errors;
    if (serverErrors.username) {
      errors.username = serverErrors.username.msg || "";
    }
    if (serverErrors.email) {
      errors.email = serverErrors.email.msg || "";
    }
    if (serverErrors.password) {
      errors.password = serverErrors.password.msg || "";
    }
  }

  // Handle unknown or generic errors with a fallback
  else if (errorResponse.message) {
    errors.fetch = errorResponse.message;
  } else {
    errors.fetch = errors.fetch || "An unknown error occurred.";
  }

  return errors;
}

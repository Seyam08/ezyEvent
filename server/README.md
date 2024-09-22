# ezyEvent Backend API Documentation

This documentation covers the RESTful API endpoints for the **ezyEvent** backend, which facilitates event management. The API provides various features such as user authentication, event creation, and user role management. It is designed to handle user registration, login, and event functionalities efficiently.

## API Overview

The API is divided into the following sections:

- **User Routes**: Handles user registration, user data management, and role assignment.
- **Login Routes**: Manages user authentication and token-based authorization.
- **Event Routes**: Facilitates event creation, updating, deletion, and attendance tracking.

Each endpoint includes details on:

- HTTP methods
- Request parameters and headers
- Sample request and response formats

Replace `example.com` with your actual domain when deploying the API.

---

<!-- User routes start from here -->

## User Routes

### Get All Users

---

**Endpoint:**  
`GET /api/users/`

**Description:**  
This endpoint retrieves all user information. No authentication is required to access this endpoint.

**Request Example:**

**_example.com/api/users/_**

**Response Example:**

```json
{
  "users": [
    {
      "username": "john@1",
      "name": "John Doe",
      "email": "johndoe@gmail.com",
      "eventsHosted": ["event_id_1", "event_id_2", "event_id_3"],
      "eventsAttended": ["event_id_1", "event_id_2"],
      "eventsSpeaking": ["event_id_4", "event_id_5"]
    },
    {
      "username": "john@2",
      "name": "John Doe 2",
      "email": "johndoe2@gmail.com",
      "eventsHosted": [],
      "eventsAttended": [],
      "eventsSpeaking": []
    }
  ]
}
```

### Get User Info by Username

---

**Endpoint:**  
`GET /api/users/:username`

**Description:**  
This endpoint retrieves user information by username. No authentication is required to access this endpoint.

**Request Example:**

**_example.com/api/users/john@1_**

**Response Example:**

```json
{
  "username": "john@1",
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "role": ["user"],
  "eventsHosted": [],
  "eventsAttended": [],
  "eventsSpeaking": []
}
```

### User Registration

---

**Endpoint:**  
`POST /api/users`

**Description:**  
This endpoint allows users to register by providing necessary information. An avatar upload is available; if the client doesn't upload an avatar, a default avatar will be set for the user.

**Request Example:**  
**_example.com/api/users_**

**Request Format:**

- Content-Type: `application/x-www-form-urlencoded` or `multipart/form-data`

**Request Body Example:**

```json
{
  "username": "john@1", // A Unique username
  "name": "John Doe",
  "email": "johndoe@gmail.com", // A un-registered email
  "password": "password123",
  "avatar": "optional_avatar_file" // Optional new avatar file
}
```

**Response Example:**

```json
{
  "message": "User registration successful!"
}
```

### Edit User

---

**Endpoint:**  
`PUT /api/users/:username`

**Description:**
This endpoint allows users to edit their profile information. Users must be logged in to access this endpoint and can update their name, email, password, and avatar.

**Request Example:**  
**_example.com/api/users/john@1_**

**Request Format:**

- Content-Type: `application/x-www-form-urlencoded` or `multipart/form-data`

**Request Body Example:**

```json
{
  "name": "John Doe", // Updated name of the user
  "email": "johndoe@gmail.com", // Updated email address
  "password": "newpassword123", // New password (if changing)
  "avatar": "avatar_file.jpg" // Optional new avatar file
}
```

**Response Example:**

```json
{
  "message": "Sucessfully edited!"
}
```

### Delete User

---

**Endpoint:**  
`DELETE /api/users/:username`

**Description:**  
This endpoint allows users to delete their account. The user must provide their password for verification and must be logged in to access this endpoint.

**Request Example:**  
**_example.com/api/users/john@1_**

**Request Format:**

- Content-Type: `application/json` or `application/x-www-form-urlencoded`

**Request Body Example:**

```json
{
  "password": "user_password" // Password required for account verification
}
```

**Response Example:**

```json
{
  "message": "Sucessfully deleted user!"
}
```

### Conclusion

The user routes provide essential functionalities for managing user profiles in the ezyEvent application. Users can register, retrieve their information, update their details, and delete their accounts securely. These endpoints are designed to ensure ease of use while maintaining necessary security measures, such as password verification for sensitive actions. By following the provided API specifications, developers can seamlessly integrate user management features into their applications.

# ezyEvent Backend API Documentation

This documentation covers the RESTful API endpoints for the **ezyEvent** backend, which facilitates event management. The API provides various features such as user authentication, event creation, and user role management. It is designed to handle user registration, login, and event functionalities efficiently.

## Installation

Install this app with npm

1. Clone the repository:

   ```
   git clone https://github.com/Seyam08/ezyEvent.git
   ```

2. Navigate to the project directory:

   ```
   cd ezyEvent\server
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Rename the .env-example file to .env and config it with own credential.

5. Start the application:

   Development version

   ```
   npm run dev
   ```

   Production version

   ```
   npm start
   ```

6. Open the package.json file to see all the scripts.

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

---

<!-- User routes start from here -->

## User Routes

The User Routes serve as a critical component of this application, providing a secure and efficient mechanism for user management and interaction. Designed with RESTful principles, these routes facilitate user registration, authentication, and profile management, ensuring that users can easily access and update their information within the application.

Authentication is a key feature of these routes, allowing for secure access to user-specific functionalities. By implementing JSON Web Tokens (JWT) and session-based authentication, ensuring that user data remains protected, while still allowing authorized users to manage their profiles effectively.

Additionally, these routes provide functionalities to retrieve user information, edit profile details, and manage event attendance. With a focus on user roles and permissions, our application guarantees that users can only access or modify data relevant to their roles, enhancing both security and user experience.

In summary, the User Routes form the backbone of user interaction within our application, offering a seamless and secure environment for managing user-related functionalities.

### Get All Users

---

**Endpoint:**  
`GET /api/users/`

**Description:**  
This endpoint retrieves all user information. User need to authenticate to access this route.

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
      "eventsSpeaking": ["event_id_4", "event_id_5"],
      "avatar": "avatars/avatar-default-1733086474786.jpg"
    },
    {
      "username": "john@2",
      "name": "John Doe 2",
      "email": "johndoe2@gmail.com",
      "eventsHosted": [],
      "eventsAttended": [],
      "eventsSpeaking": [],
      "avatar": "avatars/avatar-default-1733086474786.jpg"
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
  "eventsSpeaking": [],
  "avatar": "avatars/avatar-default-1733086474786.jpg"
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
  "username": "john@1", // A Unique username required
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
  "message": "Successfully edited!"
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
  "message": "Successfully deleted user!"
}
```

### Conclusion

The user routes provide essential functionalities for managing user profiles in the ezyEvent application. Users can register, retrieve their information, update their details, and delete their accounts securely. These endpoints are designed to ensure ease of use while maintaining necessary security measures, such as password verification for sensitive actions. By following the provided API specifications, developers can seamlessly integrate user management features into their applications.

---

---

<!-- User routes start from here -->

## Authentication

**Description:**  
This route handles user authentication using session-based authentication. Passwords are securely hashed using bcrypt, and JWT is used to generate session tokens. Upon successful login, a signed session cookie is generated, which remains valid for 24 hours.

### Login

---

**Endpoint:**  
`POST /api/login`

**Description:**  
This route handles user login feature.

**Request Example:**  
**_example.com/api/login_**

**Request Format:**

- Content-Type: `application/json` or `application/x-www-form-urlencoded`

**Request Body Example:**

```json
{
  "username": "example_username",
  "password": "example_password"
}
```

**Response Example:**

```json
{
  "message": "login successful",
  "profile": {
    "_id": "1234567890abcdef",
    "username": "johndoe",
    "name": "John Doe",
    "email": "johndoe@email.com",
    "avatar": "avatar.png",
    "role": ["user"],
    "eventsHosted": [],
    "eventsAttended": [],
    "eventsSpeaking": []
  }
}
```

### Get User Profile

---

**Endpoint:**  
`GET /api/profile`

**Description:**  
This route retrieves the authenticated user's profile information. The user must be logged in to access this route.

**Request Example:**  
**_example.com/api/profile_**

**Authentication Required:**  
Yes, the user must be logged in.

**Response Example:**

```json
{
  "profile": {
    "_id": "66eb48338079f7f79fbcc3f0",
    "username": "johndoe@1",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "avatar": "default-avatar.jpg",
    "role": ["user"],
    "eventsHosted": [],
    "eventsAttended": [],
    "eventsSpeaking": []
  }
}
```

### Logout

---

**Endpoint:**  
`DELETE /api/logout`

**Description:**  
This route allows users to log out by invalidating their session. The user must be logged in to access this endpoint.

**Request Example:**  
**_example.com/api/logout_**

**Request Format:**

Just hit this route while logged in.

**Response Example:**

```json
{
  "message": "logged out"
}
```

### Conclusion

The login and logout routes manage user authentication within the ezyEvent application. By using bcrypt for password security and JWT for session management, these routes ensure secure login sessions. The login route establishes a session with a signed cookie valid for 24 hours, while the logout route allows users to securely terminate their session. These endpoints form the foundation for secure and efficient user auth

---

---

<!-- Event routes start from here -->

<!-- introduction -->

## Event Routes

The Event Routes section of this API documentation provides endpoints for managing events within the application. These routes enable users to create, retrieve, update, and delete events while ensuring that the appropriate authentication and authorization mechanisms are in place.

### Key Features:

- **Event Creation:** Users can create new events by providing essential details such as event name, date, attendance limit, host, speaker, and status. The authenticated user is automatically set as the default host.
- **Event Retrieval:** Users can fetch event details either by ID or retrieve a list of all events. This ensures users can easily access information about upcoming, ongoing, and completed events.

- **Event Updates:** Hosts can modify event details, including date, attendance limits, and speaker lists. Updates can be made for various attributes of the event while maintaining user authentication.

- **Attendance Management:** The API allows users to attend or remove their attendance from events. This feature helps keep track of attendees and ensures that hosts have up-to-date attendance information.

- **Speaker Management:** Hosts can edit the list of speakers for their events, allowing flexibility in event planning and management.

- **Event Deletion:** Only event hosts can delete their events, ensuring that only authorized users can remove an event from the system.

### Authentication and Authorization

All event-related routes require users to be authenticated. Certain actions, such as editing speaker lists and deleting events, require the user to have the host role for the specific event. This adds a layer of security and ensures that event management is handled by authorized users only.

### Usage

This API is designed to be RESTful and utilizes standard HTTP methods for communication. The expected content types for requests include `application/json` and `application/x-www-form-urlencoded`, providing flexibility in how data is submitted to the API.

### Get All Events

---

**Endpoint:**  
`GET /api/events`

**Description:**  
This endpoint retrieves a list of all events. The user must be authenticated to access this route.

**Request Example:**  
**_example.com/api/events_**

**Response Example:**

```json
{
  "events": [
    {
      "_id": "abc123",
      "eventName": "Tech Conference 2024",
      "eventDate": "2024-10-10T00:00:00.000Z",
      "attendanceLimit": 100,
      "status": "Upcoming",
      "hostId": ["host123"],
      "speakerId": ["speaker123"],
      "attendeesId": ["attendee123", "attendee456"]
    },
    {
      "_id": "abc124",
      "eventName": "JavaScript Meetup",
      "eventDate": "2024-09-30T00:00:00.000Z",
      "attendanceLimit": 50,
      "status": "Ongoing",
      "hostId": ["host124"],
      "speakerId": ["speaker124"],
      "attendeesId": ["attendee789"]
    }
  ]
}
```

### Get Event by ID

---

**Endpoint:**  
`GET /api/event/:eventId`

**Description:**  
This endpoint retrieves details about a specific event by its ID. The user must be authenticated to access this route.

**Request Example:**  
**_example.com/api/event/66f3e35f7edb98_**

**Authentication Required:**  
Yes, the user must be logged in.

**Response Example:**

```json
{
  "_id": "66f3e35f7edb98_",
  "eventName": "Express meetup",
  "eventDate": "2024-10-18T00:00:00.000Z",
  "attendanceLimit": 35,
  "status": "Ongoing",
  "hostId": ["66eb48338079f7f"],
  "speakerId": ["66d75fe457f21", "66d762739fc"],
  "attendeesId": ["66d762739fc"]
}
```

### Create Event

---

**Endpoint:**  
`POST /api/events`

**Description:**  
This endpoint is used to create a new event. The user must be authenticated to access this route. The logged-in user will automatically be set as the default host if the `hostName` array is empty or not provided. All usernames provided in `hostName` and `speakerName` must be registered users.

**Request Example:**  
**_example.com/api/events_**

**Content-Type:**  
`application/json` or `application/x-www-form-urlencoded`

**Request Object:**

```json
{
  "eventName": "React Conference", // Must be a string
  "eventDate": "2024-10-18", // Must be a valid date
  "attendanceLimit": 25, // Must be a number
  "hostName": ["jhon@1"], // Must be an array of usernames; each username must be registered; the logged-in user will be set as the default host if not provided
  "speakerName": ["andrew@1"], // Must be an array of usernames; each username must be registered
  "status": "Ongoing" // Must be one of ['Upcoming', 'Ongoing', 'Completed']
}
```

**Response Example:**

```json
{
  "message": "Event registration successful!"
}
```

### Edit Event

---

**Endpoint:**  
`PUT /api/event/:eventId`

**Description:**  
This endpoint allows updating the event details like event date, attendance limit, and status. The user must be authenticated and only certain fields can be updated.

**Request Example:**  
**_example.com/api/event/66f3e35f7edb98_**

**Authentication Required:**  
Yes, the user must be logged in.

**Request Body:**

````json
{
  "eventDate": "2024-10-18",  // must be a date
  "attendanceLimit": 25,       // must be a number
  "status": "Ongoing"          // must be one of ['Upcoming', 'Ongoing', 'Completed']
}

**Response Example:**

```json
{
    "message": {
        "_id": "66f3e35f7ed",
        "eventName": "express con 15",
        "eventDate": "2024-12-20T00:00:00.000Z",
        "attendanceLimit": 10,
        "status": "Completed",
        "hostId": [
            "66f3e35f7ed"
        ],
        "speakerId": [
            "66f3e35f7ed",
            "66d762739fc"
        ],
        "attendeesId": []
    }
}
````

### Attend Event

---

**Endpoint:**  
`POST /api/event/attend/:eventId`

**Description:**  
This endpoint allows a logged-in user to attend an event. Authentication is required.

**Request Example:**  
**_example.com/api/event/attend/66dcb3cf6d_**

**Authentication Required:**  
Yes, the user must be logged in.

**Response Example:**

```json
{
  "message": "Event attended successfully!"
}
```

### Remove Attendance

---

**Endpoint:**  
`DELETE /api/event/removeattend/:eventId`

**Description:**  
This endpoint allows a logged-in user to remove their attendance from an event. Authentication is required.

**Request Example:**  
**_example.com/api/event/removeattend/66dcb3cf6d_**

**Authentication Required:**  
Yes, the user must be logged in.

**Response Example:**

```json
{
  "message": "Removed attendance successfully!"
}
```

### Edit Speaker List as Host

---

**Endpoint:**  
`PATCH /api/event/editspeaker/:eventId`

**Description:**  
This endpoint allows the host of an event to edit the speaker list. Authentication is required, and the user must have a host role to use this route.

**Request Example:**
**_example.com/api/event/editspeaker/66dcb3cf6d_**

```json
{
  "speakerNames": ["jhon@1", "jhon@2", "jhon@3"] // value type array of usernames and each username must be registered
}
```

**Response Example:**
will return the updated event

```json
{
  "message": {
    "_id": "66f3e35f7edb",
    "eventName": "express metup",
    "eventDate": "2024-12-20T00:00:00.000Z",
    "attendanceLimit": 10,
    "status": "Completed",
    "speakerId": ["66eb432c060659", "66d75fe457f210", "66d762739fcc22"]
  }
}
```

### Edit Attendance List as Host

---

**Endpoint:**  
`PATCH /api/event/editattendence/:eventId`

**Description:**  
This endpoint allows the host of an event to edit the attendance list. Authentication is required, and the user must have the host role to use this route.

**Request Example:**
**_example.com/api/event/editattendence/66dcb3cf6d_**

```json
{
  "attendeesNames": ["jhon@1", "jhon@2", "jhon@3"] // value type array of usernames and each username must be registered
}
```

**Response Example:**
will return the updated event

```json
{
  "message": {
    "_id": "66f3e35f7edb987e46676556",
    "eventName": "express con 15",
    "eventDate": "2024-12-20T00:00:00.000Z",
    "attendanceLimit": 10,
    "status": "Completed",
    "attendeesId": ["66eb432c060659", "66d75fe457f210", "66d762739fcc2f"]
  }
}
```

### Delete Event by ID

---

**Endpoint:**  
`DELETE /api/event/:eventId`

**Description:**  
This endpoint allows the host of an event to delete the event. Authentication is required, and the user must have the host role for the specified event to perform this action.

**Request Example:**
**_example.com/api/event/66dcb3cf6d_**

**Authentication Required:**  
Yes, the user must be logged in and have the host role for the event being deleted.

**Response Example:**

```json
{
  "message": "Event deleted successfully!"
}
```

## Conclusion

The Event Routes provide a comprehensive and secure framework for managing events within this application. By leveraging RESTful principles and ensuring robust authentication and authorization mechanisms, these routes empower users to create, modify, and delete events with ease while maintaining the integrity of the data.

Through this API, users can effectively manage event logistics, track attendance, and collaborate with speakers, all while ensuring that only authorized personnel have access to critical functionalities. The emphasis on user roles and responsibilities guarantees that event hosts have the necessary control over their events, facilitating smooth operation and enhanced user experience.

Encouraging developers to explore these routes. For any further questions or clarifications, please refer to the detailed endpoint documentation provided above.

# ezyEvent Frontend Documentation

**ezyEvent** is a full-featured event management system built with **React.js** and powered by **Redux Toolkit (RTK) Query** for seamless state management and API interactions.

## 🌟 Key Features

- **Discover** upcoming events
- **Create & manage** custom events
- **RSVP** to events with confirmation
- **Track** hosted/attended events via an interactive dashboard

## 🛠️ Technical Highlights

### React.js Architecture

- Component-based UI design
- Hooks-driven state management
- Optimized performance with Vite

### Redux Toolkit (RTK) Query

- Automated API endpoint management
- Built-in data caching
- Optimistic UI updates

### Security & Authentication

- JWT-based authentication
- Protected routes
- Session persistence

## Installation

Install this app with npm

1. Clone the repository:

   ```
   git clone https://github.com/Seyam08/ezyEvent.git
   ```

2. Navigate to the project directory:

   ```
   cd ezyEvent\client
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Rename the .env-example file to .env.local and config it with own credential.

5. Start the application:

   Development version

   ```
   npm run dev
   ```

   build command

   ```
   npm run build
   ```

   preview command

   ```
   npm run preview
   ```

6. Open the package.json file to see all the scripts.

## 🚀 Tech Stack

- **Library**:

  ![React.js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

- **Styling**:

  [![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](#)
  [![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=fff)](#)

- **Libraries and Tools**:

  - ![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=fff) - Official, efficient way to write Redux logic (state management).
  - [`jose`] — Library for handling JWTs, encryption, and authentication tokens.
  - ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=fff) - Lightweight library for building fast and flexible forms.
  - [yup] - Lightweight library for building fast and flexible forms.
  - [react-hot-toast] - Beautiful, customizable toast notifications for React.
  - [react-modal] - Accessible modal dialogs for React apps.
  - ![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white) - Routing library for navigating between React pages.
  - ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff) - Next-generation frontend build tool and dev server, super fast.

- **Version Control**:  
  [![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff)](#) and [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](#)

- **Deployment**:  
  [![Netlify](https://img.shields.io/badge/Netlify-%23000000.svg?logo=netlify&logoColor=#00C7B7)](#)

## 📋 Core Features

- User Authentication (Login / Register)
- Event Creation Form
- View Event Listings
- Event Details Page
- Event RSVP (Confirmation) System
- User Dashboard (Manage Created Events)
- Responsive Design (Mobile, Tablet, Desktop)

---

## 🎨 UI/UX Highlights

- **Responsive Layout**: Mobile-first design
- **Smooth Navigation**: Single Page Application (SPA) experience
- **Animations**: Fade-in transitions on page load and modals
- **Dark Mode**

## 📁 Folder Structure

```
  📦 client
├── 📂 public
├── 📂 src
│ ├── 📂 app
│ ├── 📂 assets
│ ├── 📂 Components
│ ├── 📂 constants
│ ├── 📂 features
│ │ ├── 📂 api
│ │ ├── 📂 auth
│ │ ├── 📂 Events
│ │ ├── 📂 Profile
│ │ └── 📂 users
│ ├── 📂 helper
│ ├── 📂 hooks
│ ├── 📂 icons
│ ├── 📂 layouts
│ ├── 📂 pages
│ ├── 📂 partials
│ ├── 📂 Router
│ ├── 📄 App.jsx
│ ├── 📄 index.css
│ └── 📄 main.jsx
```

## Routing and Navigation

Used **React Router v6** with `createBrowserRouter` for client-side routing.

### Route Configuration

| Route                                 | Component            | Access    | Type          | Notes                   |
| ------------------------------------- | -------------------- | --------- | ------------- | ----------------------- |
| `/`                                   | `LandingPage`        | Public    | Standard      | Home page               |
| `/login`                              | `Login`              | Public    | Wrapped       | PublicRoute wrapper     |
| `/register`                           | `Register`           | Public    | Wrapped       | PublicRoute wrapper     |
| `/coming-soon`                        | `ComingSoon`         | Public    | Standard      | Maintenance/placeholder |
| `/event/:id`                          | `EventPage`          | Public    | Dynamic       | Event details           |
| `/users/:id`                          | `PublicProfile`      | Public    | Dynamic       | User profiles           |
| `/dashboard`                          | `Layout`             | Protected | Nested        | PrivateRoute wrapper    |
| `/dashboard/speakers`                 | `Speakers`           | Protected | Nested        | Dashboard sub-route     |
| `/dashboard/all-events`               | `AllEvents`          | Protected | Nested        | Events management       |
| `/dashboard/all-users`                | `AllUsers`           | Protected | Nested        | User management         |
| `/dashboard/upcoming-events`          | `UpcomingEvents`     | Protected | Nested        | Events calendar         |
| `/dashboard/accounts`                 | `AccountsPageLayout` | Protected | Double-nested | Account section         |
| `/dashboard/accounts/my-profile`      | `MyProfile`          | Protected | Double-nested | User profile            |
| `/dashboard/accounts/hosted-events`   | `HostedEvents`       | Protected | Double-nested | User's hosted events    |
| `/dashboard/accounts/attended-events` | `AttendedEvents`     | Protected | Double-nested | Event participation     |
| `/dashboard/accounts/as-speaker`      | `AsSpeaker`          | Protected | Double-nested | Speaker engagements     |
| `*`                                   | `NotFoundPage`       | Public    | Catch-all     | 404 page                |

### Key Features:

- **Route Protection**: Uses custom `PrivateRoute` and `PublicRoute` components
- **Nested Routing**: Dashboard has multiple levels of nested routes
- **Dynamic Segments**: `:id` parameters for events and users
- **Layout Routes**: Shared layouts for dashboard sections
- **Comprehensive Error Handling**: Catch-all 404 route

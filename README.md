
<img width="1920" height="5901" alt="routeMate-HomePage" src="https://github.com/user-attachments/assets/5e281311-ceb5-4677-9243-81b877e23da5" />


<img width="1920" height="2161" alt="routemate-Overview" src="https://github.com/user-attachments/assets/ffc0d554-12b7-4d81-8f4c-10e3f8950098" />
# RouteMate 🗺️✈️

> **Smart Trip Planning Platform** — Plan destinations, organize itineraries, manage hotels and transportation, track travel expenses, save trips, and keep everything organized in one responsive travel dashboard.

RouteMate is a modern **frontend-only trip planning application** built with **React.js**. It provides travelers with an interactive dashboard for creating and managing trips, organizing day-by-day activities, booking hotels and transportation, tracking budgets, viewing saved trips, and receiving real-time in-app notifications.

The application is designed with a clean, responsive interface that supports both **light and dark themes** and works across desktop, tablet, and mobile devices.

---

## 📸 Overview

RouteMate provides a centralized travel planning experience where users can:

* Create and manage trips
* Search and explore destinations
* Build day-by-day itineraries
* Add and manage activities
* Add hotels to trips
* Add transportation
* Track travel budgets and expenses
* Save favorite trips
* View upcoming trips
* Review recent activity
* Receive in-app notifications
* Switch between light and dark themes
* Manage account settings
* Use the application on responsive layouts

---

## ✨ Features

### 🧳 Trip Management

Create and manage complete travel plans with:

* Trip title
* Destination
* Country
* Start date
* End date
* Number of travelers
* Travel budget
* Cover image
* Trip description
* Trip status
* Saved trip state

Each trip receives a unique ID and is persisted in browser storage.

---

### 📅 Itinerary Management

Build structured travel itineraries by adding activities to trips.

Activities can contain information such as:

* Activity title
* Description
* Date
* Time
* Location
* Category
* Additional details

Activities can be added and removed directly from the trip workflow.

---

### 🏨 Hotel Management

Users can add hotel bookings to their trips.

Hotel information includes:

* Hotel name
* Location
* City
* Country
* Rating
* Price per night
* Currency
* Check-in date
* Check-out date
* Number of nights
* Number of guests
* Total booking price
* Hotel image
* Booking timestamp

When a hotel is added, RouteMate automatically creates an in-app notification.

---

### 🚆 Transportation Management

Users can add transportation arrangements to their trips.

Supported transportation data includes:

* Transportation type
* Provider
* Transport name
* Departure location
* Arrival location
* Departure date
* Departure time
* Arrival time
* Duration
* Price
* Currency
* Number of passengers
* Total cost
* Image
* Booking timestamp

---

### 💰 Budget & Expense Tracking

RouteMate provides budget tracking for trips.

Users can:

* Set a trip budget
* Add expenses
* View total expenses
* Calculate remaining budget
* View budget utilization
* Monitor spending from the dashboard

The dashboard provides a visual budget overview with:

* Total budget
* Total spent
* Remaining budget
* Percentage used
* Budget status

---

### 🔔 Notifications

RouteMate includes a persistent in-app notification system.

Notifications are generated for actions such as:

* ✈️ Trip created
* 📅 Activity added
* 💰 Expense added
* 🏨 Hotel booked
* 🚆 Transport added

The notification system supports:

* Unread notification count
* Notification badge
* Notification dropdown
* Notification timestamps
* Mark as read
* Mark all as read
* Navigation to related trip
* Persistent notification storage

Notifications are stored in:

```text
routemate-notifications
```

using browser `localStorage`.

---

### 📊 Dashboard

The RouteMate dashboard provides a centralized overview of the user's travel activity.

Dashboard statistics include:

* Total trips
* Unique destinations
* Total activities
* Total travel expenses

The dashboard also includes:

* Welcome banner
* Budget overview
* Recent activity
* Upcoming trips
* Quick navigation
* Notification system

---

### 🕘 Recent Activity

RouteMate maintains a recent activity history based on user actions.

The activity system can display:

* Trip creation
* Activity additions
* Expense additions
* Hotel bookings
* Transport additions

The latest activities are automatically sorted by timestamp.

---

### 🗓️ Upcoming Trips

The dashboard automatically identifies future trips based on their start date.

Upcoming trips display:

* Trip cover image
* Trip title
* Destination
* Country
* Start date
* Number of travelers

Users can click a trip to open its detailed page.

---

### ❤️ Saved Trips

Users can save trips for quick access.

Saved trips are derived from the main trip state and can be toggled directly from the trip interface.

---

### 🗺️ Map

RouteMate includes a dedicated map experience for viewing and working with destinations.

The map page is designed to support destination-focused trip planning and future map enhancements.

---

### 🌙 Dark / Light Mode

RouteMate supports:

* Light theme
* Dark theme
* Persistent theme preference
* Responsive theme-aware components

The theme is managed through:

```text
ThemeContext
```

---

### 👤 Authentication UI

RouteMate includes frontend authentication flows for:

* Login
* Registration
* Protected routes
* User information
* Logout
* Account settings

The current project is frontend-only, so authentication is implemented on the client side rather than through a production backend authentication server.

---

## 🧱 Technology Stack

### Frontend

| Technology       | Purpose                       |
| ---------------- | ----------------------------- |
| React.js         | UI development                |
| React Router     | Client-side routing           |
| Tailwind CSS     | Styling                       |
| Lucide React     | Icons                         |
| JavaScript / JSX | Application logic             |
| Vite             | Development and build tooling |

### Client-Side State

| Technology        | Purpose                       |
| ----------------- | ----------------------------- |
| React Context API | Global application state      |
| React Hooks       | Component state and lifecycle |
| localStorage      | Client-side persistence       |

---

## 🏗️ Architecture

RouteMate follows a component-based React architecture.

```text
User Interface
      │
      ▼
React Components
      │
      ▼
React Router
      │
      ▼
Context Providers
      │
      ├── AuthContext
      ├── ThemeContext
      ├── TripContext
      ├── ItineraryContext
      └── NotificationContext
      │
      ▼
localStorage
```

The project does not currently require a backend or database.

---

# 📁 Project Structure

A simplified project structure looks like:

```text
RouteMate/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   │
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── BudgetOverview.jsx
│   │   │   ├── RecentActivity.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   ├── UpcomingTrips.jsx
│   │   │   └── WelcomeBanner.jsx
│   │   │
│   │   ├── landing/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── Stats.jsx
│   │   │   ├── CTA.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── BackToTop.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   └── trips/
│   │       ├── TripCard.jsx
│   │       ├── TripForm.jsx
│   │       └── ...
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   ├── TripContext.jsx
│   │   ├── ItineraryContext.jsx
│   │   └── NotificationContext.jsx
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── trips/
│   │   │   ├── Trips.jsx
│   │   │   ├── CreateTrip.jsx
│   │   │   ├── TripDetails.jsx
│   │   │   ├── EditTrip.jsx
│   │   │   └── SavedTrips.jsx
│   │   │
│   │   ├── itinerary/
│   │   │   └── Itinerary.jsx
│   │   │
│   │   ├── hotels/
│   │   │   └── Hotels.jsx
│   │   │
│   │   ├── transport/
│   │   │   └── Transport.jsx
│   │   │
│   │   ├── budget/
│   │   │   └── Budget.jsx
│   │   │
│   │   ├── map/
│   │   │   └── Map.jsx
│   │   │
│   │   ├── activity/
│   │   │   └── Activity.jsx
│   │   │
│   │   ├── settings/
│   │   │   └── Settings.jsx
│   │   │
│   │   ├── Dashboard.jsx
│   │   └── LandingPage.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

# 🔄 State Management

RouteMate uses React Context API instead of introducing a large external state-management library.

## AuthContext

Responsible for:

* Current user
* Login state
* Registration
* Logout
* Authentication persistence

---

## ThemeContext

Responsible for:

* Light mode
* Dark mode
* Theme switching
* Theme persistence

---

## TripContext

The main source of truth for trip-related data.

It manages:

```text
trips
savedTrips
totalBudget
```

and operations including:

```text
createTrip()
updateTrip()
deleteTrip()
getTripById()
toggleSavedTrip()

addActivity()
removeActivity()

addExpense()
removeExpense()

addHotelToTrip()
removeHotelFromTrip()

addTransportToTrip()
removeTransportFromTrip()
```

---

## ItineraryContext

Responsible for itinerary-related state and interactions.

It supports the application's day-by-day travel planning experience.

---

## NotificationContext

Responsible for:

```text
notifications
unreadCount
addNotification()
markAsRead()
markAllAsRead()
removeNotification()
clearNotifications()
```

Notifications are persisted using:

```text
routemate-notifications
```

---

# 💾 Local Storage

Because RouteMate is frontend-only, browser `localStorage` is used for persistence.

Current storage keys include:

```text
routemate-trips
routemate-notifications
```

Additional keys may be used by authentication and theme functionality.

### Example trip storage

A trip follows a structure similar to:

```json
{
  "id": "trip-123456",
  "title": "Japan Adventure",
  "destination": "Tokyo",
  "country": "Japan",
  "startDate": "2026-10-10",
  "endDate": "2026-10-20",
  "travelers": 2,
  "budget": 3000,
  "coverImage": "",
  "description": "A trip across Japan",
  "status": "planned",
  "isSaved": false,
  "activities": [],
  "hotels": [],
  "transport": [],
  "expenses": [],
  "createdAt": "2026-09-29T12:00:00.000Z",
  "updatedAt": "2026-09-29T12:00:00.000Z"
}
```

---

# 🛣️ Application Routes

The application currently uses React Router.

## Public Routes

```text
/
```

Landing page.

```text
/login
```

Login page.

```text
/register
```

Registration page.

---

## Protected Routes

```text
/dashboard
```

Main travel dashboard.

```text
/trips
```

All trips.

```text
/trips/create
```

Create a new trip.

```text
/trips/:tripId
```

Trip details.

```text
/trips/:tripId/edit
```

Edit an existing trip.

```text
/saved-trips
```

Saved trips.

```text
/itinerary
```

Itinerary management.

```text
/hotels
```

Hotel management.

```text
/transport
```

Transportation management.

```text
/budget
```

Budget and expenses.

```text
/map
```

Destination map.

```text
/activity
```

Activity history.

```text
/settings
```

Account settings.

---

# 🚀 Getting Started

## Prerequisites

Before running RouteMate, make sure you have:

* Node.js installed
* npm installed
* Git installed

Check your versions:

```bash
node -v
```

```bash
npm -v
```

---

# 📥 Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/RouteMate.git
```

Move into the project:

```bash
cd RouteMate
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Run Development Server

Start the Vite development server:

```bash
npm run dev
```

Vite will provide a local URL similar to:

```text
http://localhost:5173
```

Open the URL in your browser.

---

# 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

# 🔐 Environment Variables

The current RouteMate implementation is designed to work without a backend API.

Therefore, there are no required backend environment variables.

If future integrations such as maps, destination APIs, hotel APIs, or authentication services are added, environment variables can be introduced through Vite's:

```text
.env
```

or:

```text
.env.local
```

---

# 📱 Responsive Design

RouteMate is designed to work across:

* 📱 Mobile
* 📲 Tablet
* 💻 Laptop
* 🖥️ Desktop

Responsive behavior includes:

* Mobile navigation
* Responsive dashboard grids
* Mobile-friendly forms
* Responsive trip cards
* Adaptive notification dropdown
* Responsive sidebar
* Mobile-friendly itinerary layouts
* Dark/light theme support

---

# 🎨 Design System

RouteMate follows a modern SaaS-style design language.

### Primary Design Characteristics

* Rounded cards
* Soft borders
* Subtle shadows
* Blue primary actions
* Slate-based typography
* Responsive layouts
* Dark mode
* Lucide icons
* Consistent spacing
* Interactive hover states
* Smooth transitions

### UI Principles

The interface focuses on:

1. Clear information hierarchy
2. Minimal visual clutter
3. Consistent component design
4. Responsive behavior
5. Accessible interactive elements
6. Reusable React components

---

# 🔔 Notification Flow

The notification architecture works as follows:

```text
User Action
    │
    ├── Create Trip
    ├── Add Activity
    ├── Add Expense
    ├── Book Hotel
    └── Add Transport
          │
          ▼
    TripContext
          │
          ▼
    addNotification()
          │
          ▼
 NotificationContext
          │
          ▼
     localStorage
          │
          ▼
       Header
          │
          ▼
   Notification Bell
          │
          ▼
    Notification Dropdown
```

Notifications can also contain a route to the related trip:

```text
/trips/:tripId
```

---

# 🧩 Component Design

RouteMate follows reusable component principles.

For example, dashboard statistics are handled by:

```text
StatsCard.jsx
```

instead of repeating the same card markup.

Dashboard sections are separated into:

```text
WelcomeBanner
StatsCard
BudgetOverview
RecentActivity
UpcomingTrips
```

This makes the dashboard easier to maintain and extend.

---

# 📊 Dashboard Data

The dashboard calculates its statistics dynamically from `TripContext`.

### Total Trips

```js
trips.length
```

### Unique Destinations

Destinations are normalized and counted using a `Set`.

### Total Activities

Activities are calculated across all trips.

### Total Expenses

Expenses are calculated from each trip's expense records.

This means dashboard values update automatically when users modify their trip data.

---

# 🧪 Testing Checklist

Before deployment, verify the following:

### Authentication

* [ ] Registration works
* [ ] Login works
* [ ] Logout works
* [ ] Protected routes work
* [ ] User information displays correctly

### Trips

* [ ] Create trip
* [ ] Edit trip
* [ ] Delete trip
* [ ] View trip details
* [ ] Save/unsave trip
* [ ] Upcoming trips update correctly

### Activities

* [ ] Add activity
* [ ] Remove activity
* [ ] Activity appears in dashboard
* [ ] Activity appears in activity history

### Hotels

* [ ] Add hotel
* [ ] Remove hotel
* [ ] Hotel information displays correctly
* [ ] Hotel notification appears

### Transport

* [ ] Add transportation
* [ ] Remove transportation
* [ ] Transport information displays correctly

### Budget

* [ ] Add budget
* [ ] Add expense
* [ ] Remove expense
* [ ] Budget percentage updates
* [ ] Remaining budget updates

### Notifications

* [ ] Notification appears after creating a trip
* [ ] Notification appears after booking a hotel
* [ ] Notification appears after adding an activity
* [ ] Notification appears after adding an expense
* [ ] Notification appears after adding transport
* [ ] Unread count updates
* [ ] Notification can be marked as read
* [ ] Mark all as read works
* [ ] Clicking notification opens the related trip
* [ ] Notifications survive page refresh

### UI

* [ ] Light mode works
* [ ] Dark mode works
* [ ] Mobile navigation works
* [ ] Responsive dashboard works
* [ ] Notification dropdown works
* [ ] User dropdown works

---

# 🚀 Deployment

RouteMate can be deployed as a static frontend application.

Recommended deployment platforms include:

* Netlify
* Vercel
* Cloudflare Pages
* GitHub Pages

For a Vite deployment, the production build is generated using:

```bash
npm run build
```

The resulting:

```text
dist/
```

directory can be deployed to a static hosting provider.

---

# 🌐 Deployment Configuration

## Netlify

Typical build settings:

```text
Build command:
npm run build
```

```text
Publish directory:
dist
```

Because RouteMate uses React Router, SPA fallback configuration may be required so direct navigation to routes such as:

```text
/dashboard
/trips
/hotels
/budget
```

does not return a 404 after deployment.

---

# 🔮 Future Improvements

RouteMate is designed so additional features can be added later.

Potential future improvements include:

### Backend

* Node.js backend
* Express.js API
* MongoDB/PostgreSQL
* REST API
* User authentication
* Cloud data synchronization

### AI Travel Assistant

Possible AI functionality:

* AI itinerary generation
* Destination recommendations
* Budget optimization
* Activity recommendations
* Travel-plan summarization
* Smart packing lists

### Maps

Potential integrations:

* Google Maps
* Mapbox
* OpenStreetMap
* Geolocation services
* Route calculation

### Travel APIs

Future integrations could include:

* Hotel search APIs
* Flight APIs
* Transportation APIs
* Destination APIs
* Weather APIs

### Collaboration

Future versions could support:

* Shared trips
* Multiple travelers
* Trip invitations
* Collaborative itineraries
* Comments
* Real-time updates

### Notifications

Future versions could support:

* Push notifications
* Email notifications
* Travel reminders
* Flight alerts
* Hotel check-in reminders
* Activity reminders

---

# 🔒 Security Considerations

The current application is a frontend-only project and should not be treated as a production-grade secure authentication system.

For a production deployment with sensitive user information, the application should use:

* Secure backend authentication
* HTTP-only cookies
* Server-side authorization
* Input validation
* Rate limiting
* Secure API endpoints
* Database access controls
* HTTPS
* Secure secret management

API keys should never be exposed directly in client-side code.

---

# 📌 Project Limitations

The current version intentionally operates without a backend.

Therefore:

* Data is stored locally in the browser
* Data is not synchronized between devices
* Clearing browser storage removes locally stored application data
* Authentication is client-side
* Hotel and transportation data is application-managed
* There is no real payment processing
* There is no real booking confirmation with external providers
* Notifications are in-app notifications rather than browser push notifications

These limitations make the current version suitable for a **frontend portfolio project, prototype, and UX demonstration**.

---

# 🎯 Project Goals

RouteMate was designed to demonstrate practical frontend development skills including:

* React component architecture
* React Context API
* React Router
* State management
* Local persistence
* Responsive UI development
* Reusable components
* Form handling
* Dynamic dashboards
* CRUD-style operations
* Notification systems
* Theme management
* Modern SaaS UI development

---

# 🧠 What This Project Demonstrates

RouteMate demonstrates how a modern React application can be structured around reusable components and shared application state.

Key concepts demonstrated include:

```text
Component Architecture
        ↓
Context-Based State
        ↓
Reusable UI Components
        ↓
Client-Side Persistence
        ↓
Dynamic Dashboard
        ↓
Interactive User Workflows
        ↓
Responsive SaaS Interface
```

---

# 📈 Development Roadmap

## Phase 1 — Core UI

* [x] Landing page
* [x] Authentication pages
* [x] Dashboard
* [x] Responsive layout
* [x] Dark/light theme

## Phase 2 — Trip Management

* [x] Create trip
* [x] Edit trip
* [x] Delete trip
* [x] Trip details
* [x] Saved trips
* [x] Upcoming trips

## Phase 3 — Travel Planning

* [x] Itinerary
* [x] Activities
* [x] Hotels
* [x] Transportation
* [x] Budget
* [x] Expenses
* [x] Map page

## Phase 4 — Dashboard Intelligence

* [x] Dynamic statistics
* [x] Budget overview
* [x] Recent activity
* [x] Activity history
* [x] Upcoming trips

## Phase 5 — Notifications

* [x] Notification context
* [x] Persistent notifications
* [x] Notification badge
* [x] Notification dropdown
* [x] Unread count
* [x] Mark as read
* [x] Mark all as read
* [x] Trip notifications
* [x] Hotel notifications
* [x] Activity notifications
* [x] Expense notifications
* [x] Transport notifications

## Phase 6 — Future

* [ ] Backend API
* [ ] Database
* [ ] Real authentication
* [ ] AI travel assistant
* [ ] Real map integration
* [ ] Hotel API integration
* [ ] Flight API integration
* [ ] Collaborative trips
* [ ] Push notifications

---

# 🤝 Contributing

Contributions are welcome.

To contribute:

### 1. Fork the repository

```bash
git fork
```

### 2. Clone your fork

```bash
git clone https://github.com/YOUR_USERNAME/RouteMate.git
```

### 3. Create a feature branch

```bash
git checkout -b feature/your-feature
```

### 4. Install dependencies

```bash
npm install
```

### 5. Make your changes

Follow the existing project structure and component conventions.

### 6. Commit your changes

```bash
git add .
```

```bash
git commit -m "feat: add your feature"
```

### 7. Push your branch

```bash
git push origin feature/your-feature
```

### 8. Open a Pull Request

Describe:

* What changed
* Why it was changed
* How it was tested

---

# 📝 Git Commit Convention

The project can follow conventional commit-style messages.

Examples:

```text
feat: add trip notification system
```

```text
feat: add hotel booking management
```

```text
fix: resolve notification provider hierarchy
```

```text
fix: correct responsive dashboard layout
```

```text
refactor: modularize dashboard components
```

```text
style: improve dark mode dashboard cards
```

```text
docs: update project README
```

---

# 📄 License

This project is currently intended as a personal portfolio and demonstration project.

If you plan to distribute RouteMate publicly as open-source software, add an appropriate license such as MIT.

---

# 👨‍💻 Author

**Muhammad Bilal**

Software Engineering Graduate
Frontend / Full-Stack Developer

### Focus Areas

* React.js
* JavaScript
* TypeScript
* Next.js
* Node.js
* Express.js
* MongoDB
* REST APIs
* Tailwind CSS
* Full-Stack Web Development


Create → Plan → Organize → Track → Travel
```

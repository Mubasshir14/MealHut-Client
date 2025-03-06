# MEAL HUT Frontend

Check out our [Live Link](https://meal-hut-client-imvx.vercel.app/)


## Description

MealHut is an innovative food-based website that allows users to create and manage Food Provider shops, offering a wide variety of food in different categories. Users can browse, select, and customize meals based on their preferences. The platform also provides health-related features like BMI calculation, helping users stay informed about their dietary choices. Users receive timely email updates about their orders, ensuring a smooth and transparent experience from purchase to delivery.
This system is designed to enhance user experience with easy navigation and quick access to personalized meal options. Whether users are looking for a healthy diet or indulging in their favorite meals, MealHut offers both convenience and health-conscious features in one place.

## Features

## User Registration & Authentication:
Set up a smooth user registration and login process, ensuring that users can sign up and log in easily. Additionally, implemented role-based authentication, which allows you to differentiate between regular users and admins. Users are assigned roles, and access to various parts of the website is restricted based on these roles.

## Public Routes:
### Home Page:
This page serves as an overview of the platform, welcoming users and providing a brief introduction to the site and its offerings. Like meals page and provider details page

### All Meal Page:
Here, all available meals are showcased with options for filtering and sorting, allowing users to find their desired meal with ease.

### Meal Details Page:
This page displays detailed information about a specific meal


## Private Routes:
### Checkout Page:
Accessible only to authenticated users, this page allows users to place orders. It ensures that only those logged in can make purchases.

### Dashboard (Role-Based Access):
#### Customer/User Role:
Users can view their order history and account details, allowing them to track past orders.

#### Meal Provider Role:
Meal Provider have full access to manage meals, view all orders, and oversee the platform's activities, ensuring smooth operations.

## Technologies Used

### Frontend:
- **NextJs ):** For building UI components.
- **React :** For building UI components.
- **TypeScript:** For type safety and better developer experience.
- **TailwindCSS:** For styling and responsive design.
- **Redux Toolkit:** For state management.
- **Recharts:** For data visualization in dashboards.
- **SanCdn :** For styling and responsive design.
- **Sonner:** For toast notifications.


## Prerequisites

Make sure you have the following installed:

- **Node.js** (version 16 or above)
- **npm** or **yarn**
- **MongoDB instance** (local or cloud-based)

## Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd <repository-folder>
```

2. **Install dependencies:**

```bash
npm install
```

## Scripts

- **Start Development Server:**

```bash
npm run dev
```

- **Build for Production:**

```bash
npm run build
```


## Folder Structure
```bash
PERSONAL-PORTFOLIO/
│── .next/
│── .vercel/
│── node_modules/
│── public/
│── src/
│ ├── app/
| | │── (withCommonlayout)
│ | | ├── (home)
│ | | ├── cart
│ | | ├── meals
│ | | ├── providers
│ | | ├── search
| | │── (withDashboardlayout)
│ | | ├── customers
│ | | ├── mealProvider
│ | | ├── layout.tsx
| | │── login
| | │── layout.tsx
| | │── global.css
| | │── register
│ │ ├── error.tsx
│ │ ├── favicon.png
│ │ ├── layout.tsx
│ │ ├── loading.tsx
│ │ ├── not-found.tsx
│ ├── assets/
│ ├── components/
│ ├── hooks/
│ ├── services/
│ │ ├── Redux
│ │ ├── store.ts
│ │ ├── storage.ts
│ ├── lib/
│ │ ├── utils.ts
│ ├── utils/
│── .env
│── .gitignore
│── eslint.config.mjs
│── next-env.d.ts
│── next.config.ts
```
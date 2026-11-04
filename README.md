# Joineazy – Student Assignment Management Dashboard

A responsive web application built using React and Tailwind CSS that simplifies assignment management between professors and students.

## About the Project

Joineazy is a role-based assignment management platform developed as part of the Frontend Intern Assignment.

The application allows professors to create and manage assignments, assign work to students, and monitor submission progress. Students can view their assigned work, access assignment resources, and confirm their submissions.

## Features

### Student Features
- Secure-looking mock login with role-based access.
- View assignments assigned to the logged-in student.
- Search assignments by title or description.
- View assignment descriptions, due dates, and Google Drive links.
- Two-step assignment submission confirmation.
- Track submitted, pending, and overdue assignments.
- View overall assignment completion progress.
- Dedicated student dashboard and profile.
 
### Admin Features
- Admin login with role-based access.
- Create, edit, and delete assignments.
- Assign assignments to all students or selected students.
- Add assignment descriptions, due dates, and Google Drive links.
- Monitor individual student submission statuses.
- View class completion percentages.
- View assignment statistics through the Admin Dashboard.
- Dedicated Admin profile and navigation.

### General Features
- Responsive design for desktop and mobile devices.
- React Router navigation.
- Data persistence using browser localStorage.
- Role-based visibility of assignments.
- Search functionality.
- Reusable React components.

## Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application logic |
| Tailwind CSS | Styling and responsive design |
| Vite | Development server and build tool |
| React Router DOM | Page navigation |
| Lucide React | Icons |
| localStorage | Data persistence |
| Git and GitHub | Version control |

## Demo Accounts

The application uses mock authentication with predefined accounts.

### Admin Accounts

| Name | Email | Password |
|---|---|---|
| Professor John | john@joineazy.com | John@123 |
| Professor Smith | smith@joineazy.com | Smith@123 |

### Student Accounts

| Name | Email | Password |
|---|---|---|
| Sharanya | sharanya@joineazy.com | Shara@123 |
| Rahul | rahul@joineazy.com | Rahul@123 |
| Priya | priya@joineazy.com | Priya@123 |
| Arjun | arjun@joineazy.com | Arjun@123 |
| Meghana | meghana@joineazy.com | Meghana@123 |

**Note:** These are demonstration credentials for mock authentication. This project does not implement production authentication.

## Installation and Setup

### Prerequisites
- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Tejasri016/Joineazy-Frontend-Intern-Assignment.git
```

### 2. Navigate to the project directory

```bash
cd Joineazy-Frontend-Intern-Assignment
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Visit:

http://localhost:5173/

## Project Structure

```text
joineazy/
├── public/
├── src/
│   ├── components/
│   │   ├── AdminLayout.jsx
│   │   ├── AdminSidebar.jsx
│   │   ├── AssignmentCard.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   └── StudentLayout.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── data/
│   │   ├── assignmentStorage.js
│   │   └── users.js
│   │
│   ├── pages/
│   │   ├── AdminAssignments.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminProfile.jsx
│   │   ├── Login.jsx
│   │   ├── StudentAssignments.jsx
│   │   ├── StudentDashboard.jsx
│   │   └── StudentProfile.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Data Persistence

The application uses browser localStorage to store:
- Logged-in user information.
- Assignment details.
- Assignment allocation information.
- Individual student submission statuses.

Data remains available after refreshing the browser on the same browser profile.

## Application Workflow

1. Users log in using their predefined credentials.
2. The application identifies the user's role.
3. Students access their own assigned assignments.
4. Admins create and allocate assignments.
5. Students confirm assignment submissions.
6. Admins monitor submission statuses and class completion.

## Future Enhancements

- Backend integration and database support.
- Production-grade authentication and authorization.
- Email notifications for assignment deadlines.
- File upload functionality.
- Advanced filtering and sorting.
- Dark mode.
- Automated testing.

## Author

**Tejasri016**

GitHub: https://github.com/Tejasri016

## License

This project was developed for educational and internship assignment purposes.
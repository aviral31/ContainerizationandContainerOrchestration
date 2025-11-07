# Learner Report Card System

A full-stack application for managing and tracking student progress, built with React, Node.js, and MongoDB.

![Application Overview](placeholder_for_app_overview_screenshot.png)

## Features

- 🔐 User Authentication & Role-based Access
- 📊 Student Dashboard
- 👨‍🏫 Faculty Management
- 📝 Question Upload System
- 📅 Attendance Tracking
- 🎯 Career Services Integration

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI v5)
- Chakra UI
- Axios for API calls
- React Router for navigation

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── api/
│   │   └── ...
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Docker (for containerization)

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   node index.js
   ```

3. Create a `config.env` file with:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3001
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm start
   ```

3. Create `.env` file:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:3000
   ```

## Running the Application

### Development Mode

1. Start Backend:
   ```bash
   cd backend
   node index.js
   ```

2. Start Frontend:
   ```bash
   cd frontend
   npm start
   ```

### Using Docker

Build and run the containers using docker-compose:

```bash
docker-compose up
```

## Application Screenshots

### Login Page
![Login Page](placeholder_for_login_screenshot.png)

### Student Dashboard
![Student Dashboard](placeholder_for_student_dashboard.png)

### Faculty Dashboard
![Faculty Dashboard](placeholder_for_faculty_dashboard.png)

### Question Upload Interface
![Question Upload](placeholder_for_question_upload.png)

## API Documentation

The backend API provides the following endpoints:

- `/student` - Student-related operations
- `/admin` - Administrative functions
- `/faculty` - Faculty management
- `/careerService` - Career service integrations
- `/attendance` - Attendance tracking

For detailed API documentation, refer to the [API Documentation](placeholder_for_api_docs_link)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material UI Kit React
- Minimal UI Kit
- Original project inspiration from [UnpredictablePrashant/learnerReportCS_frontend](https://github.com/UnpredictablePrashant/learnerReportCS_frontend)

## Contact

Project Link: [https://github.com/aviral31/ContainerizationandContainerOrchestration](https://github.com/aviral31/ContainerizationandContainerOrchestration)

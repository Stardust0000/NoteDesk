# NoteDesk

NoteDesk is a secure web-based notes application that allows authenticated users to create, edit, and manage personal notes through a REST API-driven backend.

The application demonstrates backend development using Django and Django REST Framework with authentication, data validation, and CRUD operations.

---

## Tech Stack

**Backend**
- Python
- Django
- Django REST Framework
- JWT Authentication

**Frontend**
- React
- HTML5
- CSS3

**Database**
- SQLite

**Tools**
- Git
- GitHub
- Postman
- VS Code

---

## Features

- User authentication using JWT
- Secure login and registration system
- Create, read, update, and delete notes
- User-specific note access control
- RESTful API architecture
- Input validation and error handling
- Structured backend using Django REST Framework

---

## Architecture

Frontend: React  
Backend: Django REST API  
Database: SQLite

The frontend communicates with the backend through REST API endpoints. Authentication is handled using JWT tokens to ensure secure user sessions.

---

## API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Notes
```
GET /api/notes/
POST /api/notes/create
PUT /api/notes/{id}
DELETE /api/notes/{id}
```
---

## Installation and Setup

Clone the repository
```
git clone https://github.com/Stardust0000/NoteDesk.git
```
---
Navigate to the project folder
```
cd frontend
```

Create a virtual environment
```
python -m venv venv
```
Activate the virtual environment
Windows
```
venv\Scripts\activate
```
Mac/Linux
```
source venv/bin/activate
```
Install dependencies
```
pip install -r requirements.txt
```
Run migrations
```
python manage.py migrate
```
Start the development server
```
python manage.py runserver
```
The application will run at
```
http://127.0.0.1:8000/
```
---

## Future Improvements

- Search functionality for notes
- Pagination for large note collections
- Docker containerization
- Redis caching for performance optimization
- Deployment using cloud platforms

---

## Author

Neha Navade

GitHub  
https://github.com/Stardust0000

LinkedIn  
https://www.linkedin.com/in/neha70741/


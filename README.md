# NoteDesk
A minimal notes app backend built with Django REST Framework, exposing versioned APIs for CRUD operations.

---

## Tech Stack
- Python
- Django
- Django REST Framework
- SQLite (dev)
- Git

---

## Setup Instructions
- Clone the repository
- Create and activate virtual environment
- Install dependencies
- Run the development server

---

## API Endpoints Implemented

- `GET /api/v1/notes/`  
  Returns a list of notes in JSON format.  
  **Status codes:** 200 OK

- `POST /api/v1/notes/`  
  Creates a new note using JSON request data.  
  **Status codes:**  
  - 201 Created (on success)  
  - 400 Bad Request (on validation error)

All endpoints return JSON responses.

---

## Planned Improvements

The following features are intentionally not implemented yet to maintain a time-boxed scope:

- JWT-based authentication
- User-specific note isolation
- Update and delete endpoints
- Search and filtering
- Frontend integration using React

---

## Scalability Note

This backend is structured to support authentication, permissions, and additional endpoints without major refactors.

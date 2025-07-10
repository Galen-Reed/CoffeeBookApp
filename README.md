# CoffeeBook App
A full-stack Flask+React application that lets users explore cafes, discover coffees, and add personal notes.

---

## Features

- User Authentication (Sign Up / Log In / Log Out)
  - OAuth via GitHub
  - Username/passwords are securely hashed with bcrypt
- View cafes and their cofee offerings
- Notes system:
  - Users can add, edit, and delete notes for specific coffees
  - Notes include a rating and a comment
- Clean, responsive UI with a custom theme built using MUI Joy UI
- Frontend validation with Formik + Yup
- Backend validation and serialization with Marshmallow
- RESTful API with full CRUD for notes
- Global user state with React Context API

---

## Tech Stack

### Frontend

- React
- React Router
- MUI Joy UI
- Formik + Yup
- Context API for global state

### Backend

- Flask
- Flask-SQLAlchemy
- Marshmallow (serialization and validation)
- Flask-Bcrypt (password hashing)
- Flask-Login
- GitHub OAuth
- SQLLite (dev) / PostgreSQL-ready

---

## Installation & Setup

1. Clone this repository:
`git clone https://github.com/Galen-Reed/phase-5-project`
`cd phase-5-project`

2. Backend Setup (Flask)
`cd server`
`pipenv install`
`pipenv shell`
`flask db init`
`flask db migrate -m "Initial migration"`
`flask db upgrade`
`python app.py`

3. Frontend Setup (React)
`cd client`
`npm install`
`npm start`

## Contributing
Contributions, issues, and feature requests are welcome! Feel free to fork the repository and submit pull requests.

## License 
This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).


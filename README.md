# SURVEY-MANAGER
SURVEY 📊 MANAGEMENT 📈 SYSTEM

Survey Manager is a web application for creating and managing surveys. It offers a user-friendly interface for non-technical users to easily create surveys, answer questions, and view analytics on the responses.

## Folder Structure

```
📂 SURVEY-MANAGER
│
├── 📄 README.md
├── 📂 backend
│   ├── 📂 __pycache__
│   ├── 📂 instance
│   ├── 📂 venv
│   ├── 📄 app.py
│   ├── 📄 init_db.py
│   ├── 📄 schema.sql
│   └── 📄 survey.db
├── 📂 node_modules
│   ├── 📂 modules
│   └── 📄 package-lock.json
├── 📂 public
│   ├── 📄 logo.ico
│   └── 📄 vite.svg
├── 📂 src
│   ├── 📂 assets
│   │   ├── 📄 logo.ico
│   │   └── 📄 vite.svg
│   ├── 📂 components
│   ├── 📂 pages
│   │   ├── 📄 AnswerQuestions.jsx
│   │   ├── 📄 Dashboard.jsx
│   │   ├── 📄 ManageQuestions.jsx
│   └── 📂 utils
│       └── 📄 api.js
├── 📄 App.css
├── 📄 App.jsx
├── 📄 index.css
└── 📄 main.jsx
```

The project folder structure consists of the following files and folders:

- **📄 README.md**: This file contains the documentation and information about the Survey Manager application, including how to use it and any additional details.

- **📂 backend**: This folder contains the backend-related files for the Survey Manager application.
  - **📄 app.py**: This file contains the Flask backend for the Survey Manager application. It handles the API endpoints and database interactions.
  - **📄 init_db.py**: This file initializes the database schema.
  - **📄 schema.sql**: This file contains the SQL statements to create the necessary database schema.
  - **📄 survey.db**: This is the SQLite database file for the Survey Manager application.

- **📂 node_modules**: This folder contains all the npm packages required for the frontend of the application.
  - **📄 package-lock.json**: This file describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.

- **📂 public**: This folder contains the static assets used in the web application.
  - **📄 logo.ico**: This is the favicon for the application.
  - **📄 vite.svg**: This is a Vite logo used for development purposes.

- **📂 src**: This folder contains the source code for the frontend of the application.
  - **📂 assets**: This subfolder contains additional assets used in the application.
    - **📄 logo.ico**: This is the favicon for the application.
    - **📄 vite.svg**: This is a Vite logo used for development purposes.
  - **📂 components**: This subfolder will contain any reusable React components.
  - **📂 pages**: This subfolder contains the main page components of the application.
    - **📄 AnswerQuestions.jsx**: This component handles the interface for answering survey questions.
    - **📄 Dashboard.jsx**: This component displays analytics and visual data of survey responses.
    - **📄 ManageQuestions.jsx**: This component handles the creation and management of survey questions.
  - **📂 utils**: This subfolder contains utility functions used across the application.
    - **📄 api.js**: This file contains functions for making API requests to the backend.

  - **📄 App.css**: This file contains the main CSS styles for the application.

  - **📄 App.jsx**: This file is the main entry point for the React application.

  - **📄 index.css**: This file contains global CSS styles for the application.

  - **📄 main.jsx**: This file is the entry point for the React application and is responsible for rendering the App component.

## Usage

To use the Survey Manager web application, follow these steps:

1. **Clone or download this project repository.**

2. **Install the required dependencies for the frontend:**

```bash
npm install
```

3. **Install the required dependencies for the backend:**

```bash
pip install -r backend/requirements.txt
```

4. **Initialize the database:**

```bash
cd backend
python init_db.py
```

5. **Run the backend Flask server:**

```bash
python app.py
```

6. **Run the frontend development server:**

```bash
npm run dev
```

7. **Open a web browser and access the Survey Manager web application by navigating to `http://localhost:3000`.**

## Code Explanation

The Survey Manager web application is implemented using React for the frontend and Flask for the backend. Here's a breakdown of the different components:

- **JavaScript (React)**: The frontend is implemented using React. The components in the `src/pages` folder handle the main functionalities of the application. The `src/utils/api.js` file contains functions for making API requests to the backend.

- **Flask**: The backend is implemented in the `backend/app.py` file. It handles the routing and API endpoints for the application.

- **CSS**: The styles for the application are defined in the `src/App.css` and `src/index.css` files.

## Troubleshooting

If you encounter any issues or errors while using the Survey Manager web application, consider the following:

- Double-check that all the necessary files and folders are present in the correct locations, as described in the folder structure section.

- Ensure that you have Node.js and npm installed on your system, and the required dependencies are installed by running `npm install`.

- Ensure that you have Python installed on your system, and the required dependencies are installed by running `pip install -r backend/requirements.txt`.

- Verify that the database file `survey.db` is initialized and located in the `backend` folder.

- If you encounter any issues with the backend, check that there are no errors in the `backend/app.py` file and that the required dependencies are installed.

If the problem persists, feel free to open an issue in the GitHub repository for further assistance.

---

This README file provides an overview of the Survey Manager web application, its folder structure, usage instructions, code explanation, and troubleshooting tips. Use it as a guide to understand and utilize the Survey Manager app.

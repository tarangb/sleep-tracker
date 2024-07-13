# Sleep Tracker Application

## Description

The Sleep Tracker application allows users to log and analyze their sleep patterns. This project includes a frontend built with React and a backend built with Node.js.
A screenshots folder is added under SLEEP-TRACKER.

## Table of Contents

- Prerequisites
- Installation
- Running the Application
- Running Tests
- Project Structure
- Sleep-Tracker Featurs
- Time Taken
- Things To Do

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm. You can download Node.js from [here](https://nodejs.org/).
- You have a Git client installed. You can download it from [here](https://git-scm.com/).

## Installation

To install the Sleep Tracker application, follow these steps:

1. **Clone the repository**:

    ```sh
    git clone https://github.com/tarangb/sleep-tracker.git
    ```

2. **Navigate to the project directory**:

    ```sh
    cd sleep-tracker
    ```

3. **Install dependencies for the frontend**: (attached screenshot: frontend_server_running.PNG)

    ```sh
    cd frontend
    npm install
    ```

4. **Install dependencies for the backend**: (attached screenshot: backend_server_running.PNG)

    ```sh
    cd ../backend
    npm install
    ```

## Running the Application

### Running the Backend

1. **Navigate to the backend directory**:

    ```sh
    cd backend
    ```

2. **Start the backend server**: (attached screenshot: backend_server_running.PNG)

    ```sh
    npm start build
    ```

    The backend server will start on `http://localhost:5000`.

### Running the Frontend

1. **Navigate to the frontend directory**:

    ```sh
    cd ../frontend
    ```

2. **Start the frontend development server**: (attached screenshot: frontend_server_running.PNG)

    ```sh
    npm start build
    ```

    The frontend development server will start on `http://localhost:3000`.

## Running Tests

1. **To run tests for the frontend, navigate to the `frontend` directory and use the following command: (attached screenshot: backend_test.PNG)

	```sh
	npm test

2. **To run tests for the backend, navigate to the `backend` directory and use the following command: (attached screenshot: frontend_test.PNG)

	```sh
	cd ../backend
	npm test


## Project Structure: (attached screenshot: ProjectStructure.PNG)

sleep-tracker/
├── backend/              # Backend code
│   ├── src/
│   ├── test/
│   ├── package.json
│   └── ...
├── frontend/             # Frontend code
│   ├── src/
│   ├── test/
│   ├── package.json
│   └── ...
├── README.md             # This file
├── screenshots
└── ...


## Sleep-Tracker Featurs

1. **This app starts with displaying a form to take details: (attached screenshot: FormPage.PNG)
			--Name : String
			--Gender : Options[Male, Female, Others]
			--Sleep Duration in hours : Number [ranging from 1 to 24], 1 by default.
			--Date : date [stored in yyyy-mm-dd format in database]
			
2. **Stores the the data into Sqlite 3 database with primary key (Name, Gender, Date).
			primary key depends on all three parameters as a combinnation of these 3 parameters maintain uniqueness.
			
3. **Validations on all the fields as all 4 fields are considered mandatory.  (attached screenshot: FormPageValidations.PNG)

4. **A user can update sleep duration for a date by re-entering data in form.

5. **DataPage lists a table with all the entries.  (attached screenshot: DataTable.PNG)

6. **A user can see latest 7 days chart of its sleep pattern by clicking on its row (tooltip gives the hint to click).   (attached screenshot: SleepChart.PNG)

7. **The api to fetch 7 days data is designed to fetch n number of days data. Max: 30 days, Default: 7 days.

8. **Chart can also be identified by the name and gender on its footnote(below x-axis).   (attached screenshot: SleepChart.PNG)

9. **Tooltip on the chart shows the sleep hours for each bar.	

10. **Tests added for both frontend and backend.		

11. **Code is easily extendable to add more features and api's going forward.

12. **Code is well commented and easy to read.


## Time Taken

1. **Took around 2 days to learn basics of React and TypeScript.
		Go through online tutorials and sample projects.
	
2. **Took around 3 days for end to end development.


## Things To Do

1. **Add more tests.

2. **Add login functionality by asssigning "id" to each user.

3. **Add configuration options to chart. (Ex: Show datewise sorted or sleep duration wise sorted.)

4. **Add authentication and authorization mechanism when the code is extended and has different user roles. (ex: admin, user)

5. **Add api to delete entries, also tied up with user's role rights.

6. **Add more exception handling.
# Employee Management System (React + Redux)

A simple Employee Management System built with React, Redux Toolkit, and
React Hook Form.\
It supports full CRUD operations, search, pagination, sorting, bulk
delete, and Docker deployment.

------------------------------------------------------------------------

##  Features

-   ✅ Add / Edit / Delete Employees
-   ✅ Search by Name
-   ✅ Pagination with Custom Page Size
-   ✅ Sort by ID, Name, Gender
-   ✅ Select Multiple & Bulk Delete
-   ✅ Form Validation with React Hook Form
-   ✅ Docker Build & Run

------------------------------------------------------------------------

##  Tech Stack

-   React 18+
-   Redux Toolkit
-   React Hook Form
-   Docker
-   JavaScript (ES6)

------------------------------------------------------------------------

##  Installation (Local)

### 1. Clone repository

    git clone https://github.com/tung231195/employ-managements.git
    cd employee-management

### 2. Install dependencies

    npm install

### 3. Run project

    npm start

Open browser:

    http://localhost:3000

------------------------------------------------------------------------

##  Docker Build & Run

### ✅ 1. Create Dockerfile

  FROM node:20-alpine

  WORKDIR /src

  COPY package*.json ./

  RUN npm install --production

  COPY . .

  EXPOSE 3000

  CMD ["npm", "start"]


------------------------------------------------------------------------

### ✅ 2. Build Docker Image

    docker build -t employee-app .

------------------------------------------------------------------------

### ✅ 3. Run Container

    docker run -p 3000:3000 employee-app

Open in browser:

    http://localhost:3000

------------------------------------------------------------------------
##  Author

-   Name: Kenny Danh
-   Email: kennydanhl@gmail.com

------------------------------------------------------------------------

## ✅ License

This project is created by kenny danh
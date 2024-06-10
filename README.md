# Guitar Shop

Guitar Shop is a modern web application for real-time messaging built with React. It includes user management, product management, authentication, and database integration.

## Description

The Guitar Shop application provides an API and interface for managing an online guitar store. The service supports creating, editing, deleting, and retrieving information about products and users. The application is developed using Node.js and Express.js for the backend, React for the frontend, and supports working with MongoDB. It includes a CLI for initial database seeding with test data and uses Docker for setting up and running external services.

## Features

### REST API Service
- Create, edit, delete products.
- Retrieve product lists with pagination, sorting, and filtering support.
- Retrieve detailed product information.
- Create and authenticate users.
- Check user status.

### Frontend
- Implement all scenarios for working with products and users.
- Pages for registration, login, product list, detailed product information, adding, and editing products.
- Support for form validation and error display.

### CLI
- Command for generating test data and seeding the database.
- Support for help command with descriptions of available commands.

### Technical Details
- Monorepo
- Docker and docker-compose for setting up and running external services.
- REST API specification in OpenAPI format.


## Technologies Used
### Backend
- **Node.js**: Platform for executing JavaScript code on the server.
- **NestJS**: Framework for building efficient and scalable server-side applications on Node.js.
- **Express.js**: Web framework for Node.js used in the application.
- **TypeScript**: Strongly typed programming language that extends JavaScript capabilities.
- **MongoDB**: Databases supported in the project.
- **Mongoose**: Library for working with MongoDB.
- **Passport**: Middleware for authentication in Node.js applications.
- **bcrypt**: Library for password hashing.
- **RxJS**: Library for working with asynchronous programming.

### Frontend
- **React 18**: Library for building user interfaces.
- **Vite**: Build tool for frontend projects.
- **TypeScript**: Strongly typed programming language.
- **Redux Toolkit**: Tools for state management in applications.
- **React Router Dom**: Library for routing in React applications.
- **axios**: Library for making HTTP requests.
  

## License

Guitar Shop is licensed under the MIT license.
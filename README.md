# Groupr Project

This project follows a modern microservices architecture with a clear separation between frontend and backend services. The application is fully containerized using Docker for consistent development and deployment environments.

## Architecture Overview

The project is structured into three main components:

### Backend Service
- Built with Ruby on Rails 7.2
- Uses PostgreSQL as the database
- RESTful API design
- Implements JSON responses using JBuilder
- Follows TDD practices with RSpec
- Includes comprehensive testing setup with Factory Bot and Faker

### Frontend Service
- Built with React + TypeScript using Vite
- Uses Chakra UI as the design system
- Implements React Router for navigation
- Uses React Query + Axios for API communication
- Follows component-based architecture
- Implements SASS for styling
- Includes testing setup with React Testing Library

### Database Service
- PostgreSQL database
- Runs in a separate container
- Persistent storage for development

## Project Structure

```
.
├── backend/           # Rails API application
├── frontend/         # React frontend application
├── docker-compose.yml # Docker services configuration
└── setup.sh         # Development environment setup script
```

## Development Setup

### Prerequisites

Before starting, ensure you have the following installed:
- Docker and Docker Compose
- Git
- SSH key configured with access to the repositories

### Setting Up the Development Environment

1. Clone the main repository:
```bash
git clone git@github.com:gropupr/devenv.git
cd devenv
```

2. Run the setup script:
```bash
chmod +x setup.sh
./setup.sh
```

The setup script will:
1. Clone both frontend and backend repositories if they don't exist
2. Build and start the database service
3. Build the backend service and set up the databases
4. Build the frontend service and install dependencies
5. Start both frontend and backend services

### Accessing the Services

Once everything is running, you can access:
- Frontend application: http://localhost:4000
- Backend API: http://localhost:3000

### Development Workflow

1. Backend Development:
   - All Rails commands should be run inside the backend container
   - Example: `docker-compose run --rm backend rails c`
   - Tests can be run with: `docker-compose run --rm backend rspec`

2. Frontend Development:
   - All npm commands should be run inside the frontend container
   - Example: `docker-compose run --rm frontend npm test`
   - The development server will automatically reload on changes

### Running Tests

- Backend Tests: `docker-compose run --rm backend rspec`
- Frontend Tests: `docker-compose run --rm frontend npm test`

## Additional Information

### Environment Variables
- Backend environment variables are managed through `.env` files
- Frontend environment variables are managed through Vite's environment configuration

### Code Quality
- Backend uses RuboCop for linting
- Frontend uses ESLint and Prettier for code formatting
- Both services implement comprehensive testing suites

### Architectural Decisions
- SOLID principles are followed throughout the codebase
- Component-based architecture in the frontend
- RESTful API design in the backend
- Clear separation of concerns between services

## Troubleshooting

If you encounter any issues:

1. Ensure all required ports are available (3000, 4000, 5432)
2. Try rebuilding the services: `docker-compose build --no-cache`
3. Check the logs: `docker-compose logs -f [service_name]`
4. Ensure all environment variables are properly set

## Contributing

Please refer to the contribution guidelines in the respective frontend and backend repositories for detailed information about the development workflow and coding standards. 
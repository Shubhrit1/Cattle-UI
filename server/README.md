# Bharat Livestock AI - Backend API

This is the backend API server for the Bharat Livestock AI project, providing endpoints for authentication, breed recognition, animal management, and user administration.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Breed Recognition**: AI-powered breed identification from images
- **Animal Management**: CRUD operations for animal registration and tracking
- **User Management**: Admin panel for managing FLW accounts
- **File Upload**: Secure image and document upload handling
- **Rate Limiting**: Protection against abuse and spam
- **Security**: Helmet, CORS, and input validation

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user profile
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token

### Breeds
- `GET /api/breeds` - Get all breeds (public)
- `GET /api/breeds/:id` - Get breed by ID (public)
- `POST /api/breeds/recognize` - AI breed recognition (FLW/Admin)
- `POST /api/breeds` - Create breed (Admin only)
- `PUT /api/breeds/:id` - Update breed (Admin only)
- `DELETE /api/breeds/:id` - Delete breed (Admin only)

### Animals
- `GET /api/animals` - Get all animals (FLW/Admin)
- `GET /api/animals/stats` - Get animal statistics (FLW/Admin)
- `GET /api/animals/:id` - Get animal by Pashu Aadhaar (FLW/Admin)
- `POST /api/animals` - Register new animal (FLW/Admin)
- `PUT /api/animals/:id` - Update animal (FLW/Admin)
- `DELETE /api/animals/:id` - Delete animal (FLW/Admin)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/stats` - Get user statistics (Admin only)
- `GET /api/users/:id` - Get user by ID (Admin only)
- `POST /api/users` - Create new user (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `PATCH /api/users/:id/status` - Update user status (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### File Upload
- `POST /api/upload/single` - Upload single file (FLW/Admin)
- `POST /api/upload/multiple` - Upload multiple files (FLW/Admin)

### Health Check
- `GET /api/health` - Server health status

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Start Production Server**
   ```bash
   npm start
   ```

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS
- `JWT_SECRET` - JWT signing secret
- `MAX_FILE_SIZE` - Maximum file upload size
- `UPLOAD_DIR` - File upload directory

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Role-Based Access Control

- **Admin**: Full access to all endpoints
- **FLW (Field Level Worker)**: Limited access to animal and breed endpoints
- **Public**: Access to breed information only

## File Uploads

Supported file types:
- Images: JPEG, JPG, PNG, GIF
- Documents: PDF, DOC, DOCX

Maximum file size: 10MB

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## Rate Limiting

- 100 requests per 15 minutes per IP address
- Applied to all `/api/*` endpoints

## Security Features

- Helmet.js for security headers
- CORS protection
- Request rate limiting
- File type validation
- JWT token expiration
- Input sanitization

## Development

The backend uses in-memory storage for simplicity. In production, you should:

1. **Add a Database**: Replace in-memory storage with MongoDB, PostgreSQL, or MySQL
2. **Add Redis**: For session management and caching
3. **Add Logging**: Implement proper logging with Winston or similar
4. **Add Testing**: Unit and integration tests
5. **Add Monitoring**: Health checks and performance monitoring
6. **Add Validation**: Input validation with Joi or similar
7. **Add Documentation**: API documentation with Swagger/OpenAPI

## Sample Requests

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@bharat-livestock.gov.in",
    "password": "admin123",
    "role": "admin"
  }'
```

### Breed Recognition
```bash
curl -X POST http://localhost:3001/api/breeds/recognize \
  -H "Authorization: Bearer <your-token>" \
  -F "image=@/path/to/animal-photo.jpg"
```

### Register Animal
```bash
curl -X POST http://localhost:3001/api/animals \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "breed": "Gir",
    "owner": "Farmer Name",
    "ownerContact": "+91 98765 43210",
    "age": "3 years",
    "gender": "Female",
    "location": "Village, District, State"
  }'
```
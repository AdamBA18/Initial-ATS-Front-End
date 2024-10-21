# ATS Pro

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   ```
   Replace `your_mongodb_connection_string_here` with your actual MongoDB connection string, and `your_jwt_secret_here` with a secure random string for JWT encryption.

4. Build the frontend:
   ```
   npm run build
   ```
5. Start the server:
   ```
   npm start
   ```

The application should now be running on `http://localhost:5000`.

## Development

For development, you can run the frontend and backend separately:

1. Start the backend:
   ```
   npm start
   ```
2. In a separate terminal, start the frontend development server:
   ```
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` and will proxy API requests to the backend at `http://localhost:5000`.
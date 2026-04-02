# Use Node.js 20 slim as base
FROM node:20-slim

# Set working directory to the app root
WORKDIR /app

# Copy the backend package files first for better caching
COPY backend/package*.json ./backend/

# Install dependencies in the backend folder
RUN cd backend && npm install --omit=dev

# Copy the rest of the backend source code
COPY backend/ ./backend/

# Expose port 5000 (standard for your Express app)
EXPOSE 5000

# Set the working directory to the backend folder for the start command
WORKDIR /app/backend

# Use the verified PORT environment variable or default to 5000
# Ensure stdout is piped correctly for App Runner logs
ENV PORT=5000
CMD ["node", "index.js"]

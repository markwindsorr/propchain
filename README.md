# PropChain

Property management platform with React frontend and Node.js backend.

## Quick Start

**Check Commit history to see development flow**

### 1. Install Dependencies

```bash
npm install
```

This installs both frontend and backend dependencies.

### 2. Configure Backend (Optional)

Create `server/.env` file:

```env
MYSQL_HOST=localhost
MYSQL_USERNAME=your_username
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=insurance
PORT=8000
```

**Note:** Server will start without database connection.

### 3. Run Project

```bash
npm start
```

This starts both:

-   **Frontend** at `http://localhost:5173`
-   **Backend API** at `http://localhost:8000`

## Available Scripts

-   `npm install` - Install all dependencies
-   `npm start` - Run both frontend and backend
-   `npm run dev` - Run frontend only
-   `npm run server` - Run backend only
-   `npm run build` - Build frontend for production
-   `npm run lint` - Run ESLint
-   `npm test` - Run tests (see Testing section below)

## Testing

The project includes unit tests for wallet utilities using Vitest.

### Running Tests

**In WSL/Linux:**

```bash
npm test
```

**Note:** Tests are configured with Vitest and work correctly in WSL/Linux environments. Due to Vitest worker thread limitations in Git Bash/Windows environments, tests may timeout when run directly from Git Bash or PowerShell. If you encounter issues, run tests from WSL.

### Test Coverage

-   `src/utils/wallet.test.ts` - Tests for wallet utility functions
    -   Address truncation
    -   MetaMask detection
    -   Error message handling

## Project Structure

```
propchain/
├── src/          # React frontend
├── server/       # Express backend
└── package.json  # Root package.json
```

---

**That's it! Happy coding! 🚀**

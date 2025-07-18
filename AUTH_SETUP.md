# Dream Aura Authentication Setup

## Backend Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create `.env` file in backend folder:

```env
MONGODB_URI=mongodb://localhost:27017/dreamaura
JWT_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=5000
```

3. Start the backend server:

```bash
npm start
```

## Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start the frontend development server:

```bash
npm run dev
```

## How to Use

1. Click "Get Started" button in the header to go to `/register` page
2. Fill in all required fields (username, email, password, address, city, state, pincode, country, phone)
3. Click "Continue" to send OTP to your email
4. Enter the 6-digit OTP received in email
5. After successful verification, you'll be registered and logged in automatically
6. Click "Sign In" button to go to `/login` page for existing users
7. Use email and password to login directly

## Pages

- `/register` - Registration page with 2-step process
- `/login` - Login page for existing users
- `/` - Home page with property listings

## API Endpoints

- `POST /api/register` - Register new user (sends OTP)
- `POST /api/verify-otp` - Verify OTP and complete registration
- `POST /api/login` - Login existing user

## Features

✅ 2-step registration with email OTP verification
✅ Secure password hashing with bcrypt
✅ JWT token authentication
✅ Separate pages for login and registration (not modals)
✅ Clean, modern UI design matching the provided mockup
✅ Responsive design
✅ Form validation
✅ Error handling
✅ Auto-login after successful registration
✅ Persistent login state with localStorage
✅ Navigation between login/register pages
✅ Remember me functionality on login page

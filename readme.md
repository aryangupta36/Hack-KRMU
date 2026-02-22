# Hack-KRMU: Agricultural Disease Detection & Advisory System

A full-stack application that helps farmers identify crop diseases using AI and provides expert advice in multiple languages. The system integrates weather data, ML-powered disease detection, and real-time alerts.

## 📋 Project Overview

**AgriMitra** (CropGuard) is designed to:
- Detect plant diseases from images using YOLO ML models
- Provide treatment advice based on disease diagnosis
- Display weather conditions and farming recommendations
- Support multiple languages (English, Kiswahili, Hindi, Español)
- Progressive Web App (PWA) for offline functionality
- Real-time local crop alerts

## 📁 Project Structure

```
Hack-KRMU/
├── Frontend/                   # React + Vite PWA
│   ├── src/
│   │   ├── App.jsx            # Main app router (onboarding → dashboard → diagnosis)
│   │   ├── main.jsx           # Entry point with PWA registration
│   │   ├── index.css          # Tailwind CSS imports
│   │   ├── pages/
│   │   │   ├── onBoarding.jsx # Multi-language selection & intro
│   │   │   ├── Dashboard.jsx  # Main dashboard with weather & alerts
│   │   │   └── Diagnosis.jsx  # Disease detection analysis screen
│   │   └── ...
│   ├── public/                # Static assets (icons, images)
│   ├── package.json           # Dependencies: React, Tailwind, Vite
│   ├── vite.config.js         # Vite + Tailwind + PWA config
│   └── ...
│
├── Backend/                   # Node.js + Python ML service
│   ├── server.js             # Express server
│   ├── ml.py                 # YOLO model inference
│   ├── requirement.txt        # Python dependencies
│   ├── package.json          # Node dependencies
│   ├── routes/               # API endpoints
│   │   ├── dashboard.js      # Dashboard data
│   │   ├── diagnosis.js      # Diagnosis processing
│   │   ├── history.js        # User history
│   │   ├── resource.js       # Resources
│   │   └── user.js           # User management
│   ├── services/             # Business logic
│   │   ├── adviceService.js  # Treatment recommendations
│   │   ├── historyService.js # History management
│   │   ├── mlService.js      # ML inference wrapper
│   │   ├── translateService.js # Multi-language support
│   │   └── weatherService.js # Weather integration
│   └── ...
│
└── readme.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- **Frontend**: Node.js 16+, npm or yarn
- **Backend**: Node.js 16+, Python 3.9+, pip

### Frontend Setup

1. Navigate to Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```
The app will open at `http://localhost:5173`

4. Build for production:
```bash
npm run build
```

### Backend Setup

1. Navigate to Backend directory:
```bash
cd Backend
```

2. Install Node dependencies:
```bash
npm install
```

3. Install Python dependencies:
```bash
pip install -r requirement.txt
```

4. Start the server:
```bash
node server.js
```
The API will run on `http://localhost:5000` (or configured port)

## 📱 App Workflow

### 1. **Onboarding**
- First-time users select their preferred language
- Options: English, Kiswahili, हिंदी, Español
- Data stored in localStorage

### 2. **Dashboard**
- Welcome message with farmer profile
- Real-time weather data (location, temperature, humidity, wind)
- Local crop alerts (e.g., disease outbreaks)
- Quick action buttons: diagnosis, history, crops, expert advice, market prices
- Pro tips for farmers
- Bottom navigation bar with key features

### 3. **Diagnosis**
- Camera/image upload screen
- YOLO-based disease detection
- Real-time progress tracking with step indicators
- Treatment recommendations
- Confidence scores and severity assessment

### 4. **History & Resources**
- Past diagnoses and treatments
- Expert recommendations
- Market prices integration
- Community features

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite 7** - Build tool & dev server
- **Tailwind CSS 4** - Utility-first styling
- **Axios** - HTTP client
- **Zustand** - State management
- **React Router 7** - Navigation
- **Vite PWA Plugin** - Progressive Web App support
- **ESLint** - Code linting

### Backend
- **Express.js** - Web framework
- **Node.js** - Runtime
- **Python** - ML inference
  - **YOLOv8** - Object detection & disease classification
  - **OpenCV** - Image processing
  - **FastAPI** - Alternative API server (optional)
  - **Pillow** - Image manipulation
  - **NumPy** - Numerical computing

### Features
- Multi-language support (translate service)
- Weather integration (real-time data)
- User authentication/session management
- Image upload & processing (Multer)
- CORS enabled for cross-origin requests
- PWA support (offline functionality, installable)

## 📡 API Endpoints

Main routes available:
- `POST /diagnosis` - Submit crop image for analysis
- `GET /dashboard` - Fetch dashboard data
- `GET /history` - User diagnosis history
- `POST /history` - Save diagnosis result
- `GET /resources` - Disease resources & treatments
- `GET /user/profile` - User information
- `GET /weather` - Weather data for location

## 🎨 Key Components

### Navigation
- **Bottom Tab Navigation**: Home, Scan/Diagnosis, Add (+), Community, Profile
- **Screen States**: `onboarding`, `dashboard`, `diagnosis`

### Styling
- Responsive design with Tailwind breakpoints (sm, md, lg)
- Green theme (#16a34a primary color)
- Card-based layout
- Adaptive images and spacing

### State Management
- React hooks (useState) for local state
- localStorage for persistence (onboarding status)
- Zustand store for global app state (optional)

## 🔧 Configuration

### Tailwind CSS
- Modern Tailwind v4 with @tailwindcss/vite plugin
- Responsive utilities
- Custom theme colors

### Vite Config
- React plugin for JSX
- Tailwind CSS integration
- PWA manifest configuration
- Development & build optimization

### PWA Features
- App name: "AgriMitra"
- Short name: "Agri"
- Installable to home screen
- Offline support via Service Worker
- App icons (192x512px)

## 📦 Dependencies Overview

### Critical Frontend Packages
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "vite": "^7.3.1",
  "@tailwindcss/vite": "^4.1.18",
  "axios": "^1.13.5",
  "zustand": "^5.0.11",
  "react-router-dom": "^7.13.0",
  "vite-plugin-pwa": "^1.2.0"
}
```

### Critical Backend Packages
```json
{
  "express": "^5.2.1",
  "cors": "^2.8.6",
  "multer": "^2.0.2",
  "axios": "^1.13.5",
  "express-session": "^1.19.0"
}
```

### Python ML Stack
```
ultralytics==8.2.0        # YOLO models
opencv-python==4.10.0.84  # Image processing
numpy==1.26.4             # Numerical computing
pillow==10.4.0            # Image manipulation
fastapi==0.115.0          # API server option
uvicorn==0.30.6           # ASGI server
```

## 🔍 Current Features Implemented

✅ Responsive UI with Tailwind CSS  
✅ Multi-language onboarding  
✅ Dashboard with weather & alerts  
✅ Diagnosis analysis screen  
✅ PWA for offline access  
✅ Bottom navigation  
✅ Express backend structure  
✅ YOLO ML integration (Python)  

## 🚧 Future Enhancements

- Camera integration for real-time image capture
- User authentication & profiles
- Backend API connection
- Real weather data integration
- Map-based crop alert visualization
- Push notifications
- Export diagnosis reports
- Farmer community forums

## 🐛 Known Issues & Fixes

✅ **Fixed**: Component capitalization (OnBoarding instead of onBoarding)  
✅ **Fixed**: Tailwind CSS imports (@tailwind directives)  
✅ **Fixed**: Navigation state management (screen routing)  
✅ **Fixed**: Diagnosis component React-Router dependency removed  

## 📝 Environment Variables

Create a `.env` file in both Frontend and Backend directories:

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=30000
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
ML_SERVICE_URL=http://localhost:8000
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a pull request

## 📄 License

ISC License

## 👥 Team

Developed for Hack-KRMU hackathon  
Team: Hack-Hunters
Team ID: hk-13

---

**Last Updated**: February 18, 2026

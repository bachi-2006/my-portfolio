export const Projects = [
  // ─── IoT & Embedded Systems ─────────────────────────────────────────────────
  {
    title: "Smart Home Global Control System",
    categories: ["IoT & Embedded Systems"],
    img: [
      "/projects/project-arduino.png",
      "/projects/project-led.png",
    ],
    description:
      "A cloud-connected, low-latency IoT ecosystem linking an ESP32 hardware device (using IR sensors/LEDs) to a futuristic neon Web dashboard and a Capacitor-based Android mobile application. Uses Firebase Realtime Database as a single source of truth, enabling real-time status tracking, device toggles, lighting modes (Wave, Pulse, Disco), and emergency shutdown from anywhere globally.",
    tools: ["Node.js", "Express", "Socket.IO", "Firebase RTDB", "ESP32", "C/C++", "Capacitor", "Android", "HTML/CSS/JS"],
    links: [
      "https://github.com/bachi-2006/SmartHome-Global-Control",
      "https://www.linkedin.com/posts/rohith-dachepally_proud-to-share-our-award-winning-project-activity-7266166695298252801-fhbw",
    ],
  },

  // ─── Web Development ─────────────────────────────────────────────────────────
  {
    title: "Mio AI",
    categories: ["Web Development", "AI & Machine Learning"],
    img: ["/projects/mio_ai.png"],
    description:
      "A multi-purpose AI assistant platform featuring an interactive chat interface, code generation, voice control/audio synthesis, translation utilities, and AI image generation. Built with a React/Vite/TypeScript frontend, Auth0 authentication, and a Supabase backend for real-time conversation caching and profile management.",
    tools: ["Vite", "React", "TypeScript", "Tailwind CSS", "Auth0", "Supabase", "Google Gemini 1.5 Flash"],
    links: ["https://github.com/bachi-2006/Mio-AI"],
  },
  {
    title: "TripV5",
    categories: ["Web Development"],
    img: ["/projects/trip.png"],
    description:
      "An immersive travel planning and interactive mapping platform featuring a 3D Earth Globe component built with React Three Fiber (R3F) and Three.js. Integrates Mapbox GL for interactive destination mapping, Next.js for optimized rendering, and a Supabase client to support destination search and real-time planning data.",
    tools: ["Next.js", "React Three Fiber", "Three.js", "Mapbox GL", "Supabase", "TypeScript", "Framer Motion"],
    links: ["https://github.com/bachi-2006/TripV5"],
  },
  {
    title: "GController",
    categories: ["Web Development"],
    img: ["/projects/gcontroller.png"],
    description:
      "A zero-install, low-latency phone-to-PC remote gaming controller operating over WebSockets. Enables a mobile browser to pair via room codes and function as a steering wheel utilizing device gyroscope tilt controls, progressive steering algorithms, and spring-to-center physics feedback, triggering mouse/keyboard actions on a Windows host via PowerShell and user32.dll hooks.",
    tools: ["Node.js", "Express", "WebSockets", "HTML/CSS/JS", "PowerShell", "Windows API"],
    links: ["https://github.com/bachi-2006/GController"],
  },
  {
    title: "Train Flow Optimization",
    categories: ["Web Development", "AI & Machine Learning"],
    img: ["/projects/sih_train_flow.png"],
    description:
      "An intelligent railway scheduling and traffic flow optimization platform. Utilizes a Python-based decision engine to resolve railway junction conflicts and schedule train flows in real-time, accompanied by a FastAPI backend, an automated network health analysis system powered by Gemini AI, and a modern React/Vite dashboard.",
    tools: ["FastAPI", "React", "Vite", "TypeScript", "Python", "Gemini AI", "Tailwind CSS", "shadcn-ui"],
    links: ["https://github.com/bachi-2006/Train-Flow-Optimization"],
  },
  {
    title: "WiFi Password Predictor & Auditor",
    categories: ["Web Development", "AI & Machine Learning"],
    img: ["/projects/wifi_prediction.png"],
    description:
      "A network security and auditing suite. Features a parallelized personal-profile password predictor that runs multi-core generation to build targeted wordlists using customizable leet-speak mutations, dates, and name combinations, paired with a command-based WiFi brute-forcer using PyWiFi to scan local wireless networks and audit password strength.",
    tools: ["Python", "Flask", "PyWiFi", "SocketIO", "Multiprocessing", "Wordlist Generation", "Network Security"],
    links: ["https://github.com/bachi-2006/WiFi-Password-Predictor"],
  },

  // ─── AI & Machine Learning ───────────────────────────────────────────────────
  {
    title: "RoadSense AI",
    categories: ["Web Development", "AI & Machine Learning"],
    img: ["/projects/promptwars.png"],
    description:
      "A panic-safe, mobile-first emergency road accident reporting platform. Integrates the Gemini API (gemini-3.1-pro-preview) for structured JSON incident extraction and hybrid urgency calculation, styled with a glassmorphic dashboard using Framer Motion, and supported by Firebase Anonymous Auth and offline Firestore caching.",
    tools: ["React", "Vite", "Gemini AI", "Framer Motion", "Firebase Auth", "Firestore"],
    links: ["https://github.com/bachi-2006/RoadSense-AI"],
  },
  {
    title: "Drug Interaction Detection System",
    categories: ["AI & Machine Learning", "Data Analytics"],
    img: ["/projects/drug_recognition.png"],
    description:
      "An AI-driven drug intelligence and safety platform. Utilizes an IBM Granite large language model via HuggingFace Transformers to extract structured drug info from unstructured text, coupled with a FastAPI backend and a Streamlit UI to check drug-to-drug interactions, recommend age-specific dosages, and suggest safe alternative medications.",
    tools: ["FastAPI", "Streamlit", "IBM Granite LLM", "Python", "PyTorch", "HuggingFace"],
    links: ["https://github.com/bachi-2006/Drug-Interaction-Detection"],
  },
  {
    title: "EduTutor AI",
    categories: ["AI & Machine Learning", "Web Development"],
    img: ["/projects/eduteach.png"],
    description:
      "An AI-powered personalized tutoring assistant built with Streamlit. Features a Student portal for querying concepts and requesting study materials, and a Teacher portal for grading assignments and generating detailed feedback, powered by the IBM Granite-3.3 LLM for processing educational text.",
    tools: ["Streamlit", "IBM Granite LLM", "HuggingFace", "Python"],
    links: ["https://github.com/bachi-2006/EduTutor-AI"],
  },
  {
    title: "Gesture Control System",
    categories: ["AI & Machine Learning"],
    img: ["/projects/gesture_control.png"],
    description:
      "A real-time computer vision interface for OS automation on Windows. Uses MediaPipe to track hand landmarks from a live webcam feed and OpenCV to process frames, translating gestures into keyboard and mouse commands (like cursor movement, clicking, volume control, window minimizing/maximizing, and launching applications).",
    tools: ["Python", "MediaPipe", "PyAutoGUI", "OpenCV", "Computer Vision", "Windows API"],
    links: ["https://github.com/bachi-2006/Gesture-Control"],
  },
  {
    title: "Sales Forecasting System",
    categories: ["Data Analytics", "AI & Machine Learning"],
    img: ["/projects/sales_forecasting.png"],
    description:
      "A statistical time-series forecasting dashboard built with Streamlit. Analyzes historical uploaded sales data using seasonal decomposition, trains Moving Average, ARIMA, and Exponential Smoothing (Holt-Winters) models, ranks them by RMSE, and visualizes future sales projections with interactive Plotly graphs.",
    tools: ["Python", "Streamlit", "statsmodels", "Pandas", "Plotly", "ARIMA"],
    links: ["https://github.com/bachi-2006/Sales-Forecasting-System"],
  },

  // ─── App Development ─────────────────────────────────────────────────────────
  {
    title: "Outpass Permission Management System",
    categories: ["App Development"],
    img: ["/projects/pandi_pirral.png"],
    description:
      "A secure, mobile-first Outpass Permission Management System (OPMS) for educational institutions. Built with Flutter and Dart, the application uses Firebase Authentication, Firestore for real-time outpass status tracking, local caching with Hive, and integrated QR code scanning (mobile_scanner) for security gate validation.",
    tools: ["Flutter", "Dart", "Firebase Auth", "Firestore", "GoRouter", "Hive", "QR Code"],
    links: ["https://github.com/bachi-2006/OPMS"],
  },
  {
    title: "LRMS — Library Resource Management System",
    categories: ["App Development"],
    img: ["/projects/potti.png"],
    description:
      "A comprehensive Library Resource Management System (LRMS) mobile application built with Flutter. Implements a multi-role architecture supporting Student (for search, reserve, and profile management), Librarian (for cataloging and reservation verification), and Admin views, with Provider state management and a Firebase database.",
    tools: ["Flutter", "Dart", "Firebase Core", "Firebase Auth", "Firestore", "Provider", "Clean Architecture"],
    links: ["https://github.com/bachi-2006/LRMS"],
  },

  // ─── Python Tools ────────────────────────────────────────────────────────────
  {
    title: "RGB Keyboard Equalizer",
    categories: ["Python Tools"],
    img: ["/projects/rgb_controller.png"],
    description:
      "A real-time peripheral lighting visualizer for Windows. Captures system audio loopback via WASAPI, performs real-time Fast Fourier Transforms (FFT) in NumPy, and maps frequency bands (bass to treble) dynamically to the four color-coded physical keyboard zones of compatible MSI laptops using a reverse-engineered MysticLight HID feature-report protocol.",
    tools: ["Python", "PyAudio (pyaudiowpatch)", "PyWinUSB", "WASAPI loopback", "Windows API"],
    links: ["https://github.com/bachi-2006/RGB-Keyboard-Equalizer"],
  },
];

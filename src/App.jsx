import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddWord from "./pages/AddWord";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import AnalyticsTracker from "./components/AnalyticsTracker";
import { initGA } from "./analytics";

function App() {
  useEffect(() => {
    initGA(); // initialize GA once
  }, []);

  return (
    <Router>
      <AnalyticsTracker />
      <AuthProvider>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-word" element={<AddWord />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { ThemeProvider } from './context/ThemeContext';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import AddWord from './pages/AddWord';
// import Favorites from './pages/Favorites';
// import Profile from './pages/Profile';

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <ThemeProvider>
//           <div className="min-h-screen flex flex-col">
//             <Navbar />
//             <main className="flex-grow">
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/add-word" element={<AddWord />} />
//                 <Route path="/favorites" element={<Favorites />} />
//                 <Route path="/profile" element={<Profile />} />
//               </Routes>
//             </main>
//             <Footer />
//           </div>
//         </ThemeProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;

import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import Kalkulator from "@/pages/Kalkulator";
import Materi from "@/pages/Materi";
// import Tutorial from "@/pages/Tutorial"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <Router>
      <Navbar sticky />
      <main className="p-6 flex-grow">
        <Toaster />
        <Routes>
          <Route path="/" element={<Navigate to="/kalkulator" />}></Route>
          <Route path="/kalkulator" element={<Kalkulator />} />
          <Route path="/materi" element={<Materi />} />
        </Routes>
      </main>
      <Footer className="bg-navbar-footer-background" />
    </Router>
  );
}

export default App;

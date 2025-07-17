import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer" 
import Kalkulator from "@/pages/Kalkulator"
import Materi from "@/pages/Materi"
import Tutorial from "@/pages/Tutorial"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"


function App() {
  return (
    <Router>
      <Navbar />
      <main className="p-4">
        <Toaster/>
        <Routes>
          <Route path="/" element={<Navigate to="/kalkulator" />}></Route>
          <Route path="/kalkulator" element={<Kalkulator />} />
          <Route path="/materi" element={<Materi />} />
          <Route path="/tutorial" element={<Tutorial />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
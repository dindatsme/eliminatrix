import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/ui/navbar"

function App() {
  return (
    <>
      <Navbar variant="solid" sticky/>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
    </>
  )
}

export default App
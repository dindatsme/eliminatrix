import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { NavLink } from "react-router-dom"

const navbarVariants = cva(
  "w-full border-b border-border backdrop-blur supports-[backdrop-filter]:bg-opacity-70 transition-colors",
  {
    variants: {
      variant: {
        solid: "bg-background shadow-sm",
        transparent: "bg-transparent border-transparent",
        glass: "bg-background/60 backdrop-blur-md",
      },
      sticky: {
        true: "sticky top-0 z-50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "solid",
      sticky: false,
    },
  }
)

export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, variant, sticky, ...props }, ref) => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => setMounted(true), [])

    const toggleTheme = () => {
        if (!mounted) return
        setTheme(theme === "dark" ? "light" : "dark")
    }

    const isDark = theme === "dark"
    return (
      <nav
        ref={ref}
        className={cn(navbarVariants({ variant, sticky }), className)}
        {...props}
      >
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="text-lg font-bold text-primary">Eliminatrix</div>
          <div className="flex items-center gap-6">
            <NavLink to="/kalkulator" className={({ isActive }) => cn("text-sm transition-colors", isActive ? "text-primary underline font-medium" : "text-muted-foreground hover:text-foreground")}>Kalkulator</NavLink>
            <NavLink to="/materi" className={({ isActive }) => cn("text-sm transition-colors", isActive ? "text-primary underline font-medium" : "text-muted-foreground hover:text-foreground")}>Materi</NavLink>
            <NavLink to="/tutorial" className={({ isActive }) => cn("text-sm transition-colors", isActive ? "text-primary underline font-medium" : "text-muted-foreground hover:text-foreground")}>Tutorial</NavLink>
            {mounted && (
              <Button
                variant="default"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-500" />}
              </Button>
            )}
          </div>
        </div>
      </nav>
    )
  }
)

Navbar.displayName = "Navbar"

export { Navbar, navbarVariants }

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
        <div className="flex h-14 items-center justify-between bg-navbar-footer-background px-6">
          <div className="text-3xl font-text-me-one font-extrabold text-main-foreground">ELIMINATRIX</div>
          <div className="flex items-center max-w-3/7 gap-2 text-xs md:gap-5">
            <NavLink to="/kalkulator" className={({ isActive }) => cn("md:text-sm transition-colors", isActive ? "text-navbar-footer-foreground hover:text-nf-foreground-active underline font-medium" : "hover:text-nf-foreground-active text-navbar-footer-foreground font-medium")}>Kalkulator</NavLink>
            <NavLink to="/materi" className={({ isActive }) => cn("md:text-sm transition-colors", isActive ? "text-navbar-footer-foreground hover:text-nf-foreground-active underline font-medium" : "hover:text-nf-foreground-active text-navbar-footer-foreground font-medium")}>Materi</NavLink>
            {mounted && (
              <Button
                variant="default"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="bg-navbar-footer-foreground hover:bg-nf-foreground-hover active:bg-nf-foreground-active"
              >
                {isDark ? <Sun className="w-5 h-5 text-mode-toggle" /> : <Moon className="w-5 h-5 text-mode-toggle" />}
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

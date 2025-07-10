import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"

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

    return (
      <nav
        ref={ref}
        className={cn(navbarVariants({ variant, sticky }), className)}
        {...props}
      >
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="text-lg font-bold text-primary">Eliminatrix</div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:underline">Kalkulator</a>
            <a href="#" className="text-sm text-muted-foreground hover:underline">Materi</a>
            <a href="#" className="text-sm text-muted-foreground hover:underline">Tutorial</a>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(val) => setTheme(val ? "dark" : "light")}
              />
              <Moon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </nav>
    )
  }
)

Navbar.displayName = "Navbar"

export { Navbar, navbarVariants }

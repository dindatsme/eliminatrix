import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Mail, Linkedin, Github } from "iconoir-react"

const footerVariants = cva(
    "border-t border-border px-6 py-6 md:px-10 mt-10 text-muted-foreground",
    {
      variants: {
        variant: {
          default: "",
          compact: "py-4 text-sm",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
)

export interface FooterProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerVariants> {}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
	({ className, variant, ...props }, ref) => {
		return (
			<footer ref={ref} className={cn(footerVariants({ variant }), className)} {...props}>
				<div className="container flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
					<div>
						<div className="text-lg font-semibold text-primary">Eliminatrix</div>
						<p className="text-xs mt-1 text-muted-foreground">
							Copyright © {new Date().getFullYear()}. All rights reserved.
						</p>
					</div>

					<div className="flex items-center gap-3 self-start md:self-center">
						<a href="https://mail.google.com/mail/?view=cm&to=hanminra05@email.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary-foreground/10 hover:bg-secondary-foreground/15 transition-colors" aria-label="Email">
							<Mail className="w-4 h-4" />
						</a>
						<a href="#" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary-foreground/10 hover:bg-secondary-foreground/15 transition-colors" aria-label="LinkedIn">
							<Linkedin className="w-4 h-4" />
						</a>
						<a href="https://github.com/dindatsme" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary-foreground/10 hover:bg-secondary-foreground/15 transition-colors" aria-label="Github">
							<Github className="w-4 h-4" />
						</a>
					</div>
				</div>
			</footer>
		)
	}
)
Footer.displayName = "Footer"

export { Footer, footerVariants }
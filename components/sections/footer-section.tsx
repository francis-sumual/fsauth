import Link from "next/link";
import { Calendar } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6" />
              <span className="text-lg font-bold">FSDevelopment</span>
            </div>
            <p className="text-sm text-muted-foreground">NextJS 15, AuthJS. Shadcn</p>
            <p className="text-sm text-muted-foreground">Prisma ORM, Neon PostgreSql</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Link</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#register" className="text-sm text-muted-foreground hover:text-foreground">
                  Register
                </Link>
              </li>
              <li>
                <Link href="#list" className="text-sm text-muted-foreground hover:text-foreground">
                  Registration List
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Special</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  L2Collection
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  FSDevelopment
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FSDevelopment. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

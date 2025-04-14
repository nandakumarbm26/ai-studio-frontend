import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogoutProvider } from "./AuthUI";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

function AppNavbar() {
  return (
    <div className="w-full max-h-[70px] h-[8vh] bg-yellow-100 flex flex-row  items-center px-5 py-2 gap-5 justify-between">
      <div className="flex flex-row gap-5 items-center w-full">
        <SidebarTrigger />
        <div>Home</div>
        <div>Contacts</div>
        <div>Models</div>
      </div>
      <div className="flex flex-row gap-5">
        <div>Avatar</div>
        <LogoutProvider>
          <Button>
            <LogOutIcon />
          </Button>
        </LogoutProvider>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";

function Navbar() {
  return (
    <header className="w-full border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-primary flex items-center gap-2"
        >
          <Image
            className="w-full h-8 object-left object-contain "
            src="/assets/logo/astraph.png"
            alt="Astraph.AI"
            width={400}
            height={100}
          />
        </Link>

        {/* Nav Links (optional) */}
        <nav className="hidden md:flex gap-6 text-sm text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition">
            Features
          </Link>
          <Link href="#why" className="hover:text-primary transition">
            Why Astraph
          </Link>
          <Link href="#docs" className="hover:text-primary transition">
            Docs
          </Link>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default AppNavbar;

export { Navbar, AppNavbar };

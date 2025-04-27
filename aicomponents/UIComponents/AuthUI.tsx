// Login.tsx
"use client";
import { JSX, ReactElement, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAlert } from "@/components/ui/alert";
import {
  apiClient,
  getCookie,
  loginUser,
  refreshToken,
  signUpUser,
} from "@/lib/api";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { AUTH_LOGIN, AUTH_LOGOUT, REFRESH_TOKEN } from "@/lib/queries";
import { GRAPHQL_PATH, LOGIN_PATH } from "@/lib/const";

function Login() {
  const router = useRouter();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const { addAlert } = useAlert();
  const handleLogin = async () => {
    try {
      const res = await loginUser(emailOrUsername, password);
      addAlert({
        type: "default", // "default", "warning", "success", etc.
        title: "Login Successful",
        description: "Redirecting to dashboard.",
      });
      router.push("/dashboard/agents");
    } catch (err: any) {
      addAlert({
        type: "destructive", // "default", "warning", "success", etc.
        title: "Something went wrong.",
        description: err.message,
      });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto space-y-4 flex flex-col justify-center items-center">
      <div className="w-full max-w-[300px]">
        <h1 className="font-bold text-xl">Login to Astraph.AI</h1>
        <h2 className="text-sm">unleashing capabilities of AI.</h2>
      </div>
      <Separator className="w-full max-w-[300px]" />

      <div className="space-y-1 w-full max-w-[300px]">
        <Label htmlFor="credentials">Username/email</Label>
        <Input
          placeholder="Email or Username"
          id="credentials"
          name="credentials"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          required
        />
      </div>
      <div className="space-y-1 w-full max-w-[300px]">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button onClick={handleLogin} className="w-full max-w-[300px]">
        Login
      </Button>
      <Separator className="w-full max-w-[300px]" />

      <Link href="signup">
        Don't have an account? <span className="hover:underline">Signup</span>
      </Link>
    </div>
  );
}

function SignUp() {
  const { addAlert } = useAlert();
  const router = useRouter();
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    code: "+91",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    if (form.password !== form.confirmPassword) {
      addAlert({
        type: "destructive", // "default", "warning", "success", etc.
        title: "Passwords do not match",
        description: "Please make sure Passwords are same.",
      });
      return;
    }
    try {
      const { confirmPassword, ...signUpData } = form;
      await signUpUser(signUpData);
      addAlert({
        type: "default", // "default", "warning", "success", etc.
        title: "SignUp Successful",
        description: "Redirecting to dashboard.",
      });
      router.push("/dashboard/agents");
    } catch (err: any) {
      addAlert({
        type: "destructive", // "default", "warning", "success", etc.
        title: "Something went wrong.",
        description: err.message,
      });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto space-y-4 flex flex-col justify-center items-center">
      <div className="w-full max-w-[300px]">
        <h1 className="font-bold text-xl">Create an account.</h1>
        <h2 className="text-sm">unleash capabilities of AI.</h2>
      </div>
      <Separator className="w-full max-w-[300px]" />
      <div className="space-y-1 w-full max-w-[300px]">
        <Label htmlFor="fname"> First Name</Label>
        <Input
          placeholder="First Name"
          id="fname"
          name="fname"
          value={form.fname}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-1 w-full max-w-[300px]">
        <Label htmlFor="lname"> Last Name</Label>
        <Input
          placeholder="Last Name"
          name="lname"
          id="lname"
          value={form.lname}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-1 w-full max-w-[300px]">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="flex gap-1">
          <Input
            placeholder="Intl. Code"
            className="w-1/4"
            name="code"
            value={form.code}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Phone Number"
            name="phone"
            id="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="space-y-1 w-full max-w-[300px]">
        <Label htmlFor="email">Email</Label>
        <Input
          placeholder="Email Address"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-1 w-full max-w-[300px]">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-1 w-full max-w-[300px]">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          id="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <Button onClick={handleSignUp} className="space-y-1 w-full max-w-[300px]">
        Sign Up
      </Button>
      <Separator className="w-full max-w-[300px]" />

      <Link href="login">
        Already have an account? <span className="hover:underline">Login</span>
      </Link>
    </div>
  );
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true); // loading state until auth check

  useEffect(() => {
    async function checkAuth() {
      const token = getCookie("access_token");

      if (!token) {
        try {
          const res = await refreshToken();

          if (res.errors || !res.data) {
            if (pathname !== LOGIN_PATH) {
              router.replace(LOGIN_PATH);
            }
          }
        } catch (err) {
          if (pathname !== LOGIN_PATH) {
            router.replace(LOGIN_PATH);
          }
        }
      }
      setIsLoading(false);
    }

    checkAuth();
  }, [router]);

  if (isLoading) {
    return null; // or a loading spinner if you want
  }

  return <>{children}</>;
}

const LogoutProvider = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const { addAlert } = useAlert();
  return (
    <div
      onClick={() => {
        apiClient(GRAPHQL_PATH, "POST", AUTH_LOGOUT())
          .then((res) => {
            if (res.error) {
              throw "GraphQL error";
            }
            addAlert({
              type: "default", // "default", "warning", "success", etc.
              title: "Logged Out successfully!",
              description: "",
            });
            router.push("/auth/login");
          })
          .catch((err) => {
            addAlert({
              type: "destructive", // "default", "warning", "success", etc.
              title: "Something went wrong",
              description: "",
            });
          });
      }}
    >
      {children}
    </div>
  );
};

export { Login, SignUp, AuthProvider, LogoutProvider };

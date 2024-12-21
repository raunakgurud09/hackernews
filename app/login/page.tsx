"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthProvider";
import { BASE_HN_URL } from "@/utils/constants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, FormEvent } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    const success = await login(username);
    if (!success) {
      setError("Invalid username or user not found");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start mt-20">
      <div className="mb-10">
        {/* <Logo /> */}

        <p
          className="font-6xl text-left"
          style={{ fontSize: "40px", fontWeight: "500" }}
        >
          Login
        </p>
      </div>
      <div className="max-w-md w-full  p-8 rounded-md shadow border">
        <form onSubmit={handleSubmit} className="">
          <div>
            <Label className="font-normal">Username</Label>
            <Input
              id="username"
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          {error && <p className="text-red-500 text-xxs text-left">{error}</p>}
          <Button type="submit" className="w-full mt-4">
            Sign In
            <ArrowRight />
          </Button>
        </form>
        <div className="text-xs text-center mt-4">
          Don&apos;t have an account ?
          <Link
            href={`${BASE_HN_URL}/login?goto=news`}
            target="_blank"
            className="ml-1 hover:underline decoration-primary"
          >
            <span className="text-primary">Create One!</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

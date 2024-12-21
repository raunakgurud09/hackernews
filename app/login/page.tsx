"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthProvider";
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
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 rounded-md shadow border ">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </main>
  );
}

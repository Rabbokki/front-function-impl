import React from "react";
import { NavBar } from "../../components/Nav-bar";
import { SignupForm } from "../../components/join/SignupForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <SignupForm />
      </div>
    </main>
  );
}

import React from "react";
import { NavBar } from "../../components/nav-bar";
import { SignupForm } from "../../components/signup-form";

export default function Signup() {
  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <SignupForm />
      </div>
    </main>
  );
}

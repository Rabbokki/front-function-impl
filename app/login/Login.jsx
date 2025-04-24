import { NavBar } from "../../src/components/Nav-bar";
import { LoginForm } from "../../src/components/LoginForm";

export default function LoginPage() {
  return React.createElement(
    "main",
    { className: "min-h-screen bg-traveling-bg" },
    React.createElement(NavBar, null),
    React.createElement(
      "div",
      { className: "container mx-auto px-4 py-12" },
      React.createElement(LoginForm, null)
    )
  );
}

"use client";

const React = require("react");
const { useState } = React;
const Link = require("next/link").default;
const { Eye, EyeOff, Mail, Lock } = require("lucide-react");
const { Button } = require("../../src/modules/Button");
const { Input } = require("../../src/modules/Input");
const { Label } = require("../../src/modules/Label");
const { Checkbox } = require("../../src/modules/Checkbox");
const { Card } = require("../../src/modules/Card");
const { Separator } = require("../../src/modules/Separator");

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 시도:", { email, password, rememberMe });
  };

  return React.createElement(
    "div",
    { className: "mx-auto max-w-md" },
    React.createElement(
      "div",
      { className: "mb-8 text-center" },
      React.createElement("h1", { className: "mb-2 text-3xl font-bold text-traveling-text" }, "로그인"),
      React.createElement("p", { className: "text-traveling-text/70" }, "트래블링에 오신 것을 환영합니다!")
    ),
    React.createElement(
      "div",
      { className: "relative mb-8 flex justify-center" },
      React.createElement(
        "div",
        { className: "relative h-64 w-64" },
        React.createElement(
          "svg",
          { viewBox: "0 0 200 200", className: "h-full w-full" },
          React.createElement("circle", { cx: 100, cy: 100, r: 80, fill: "#e7f5ff" }),
          React.createElement("rect", { x: 60, y: 70, width: 80, height: 60, rx: 10, fill: "#a78bfa", stroke: "#4338ca", strokeWidth: 2 }),
          React.createElement("rect", { x: 70, y: 60, width: 60, height: 10, rx: 5, fill: "#a78bfa", stroke: "#4338ca", strokeWidth: 2 }),
          React.createElement("circle", { cx: 85, cy: 100, r: 5, fill: "#4338ca" }),
          React.createElement("circle", { cx: 115, cy: 100, r: 5, fill: "#4338ca" }),
          React.createElement("rect", { x: 110, y: 90, width: 30, height: 40, rx: 2, fill: "#ff9a9e", stroke: "#4338ca", strokeWidth: 1 }),
          React.createElement("rect", { x: 115, y: 100, width: 20, height: 15, rx: 2, fill: "#fce7f3", stroke: "#4338ca", strokeWidth: 0.5 }),
          React.createElement("rect", { x: 115, y: 120, width: 20, height: 5, fill: "#4338ca" }),
          React.createElement("rect", { x: 50, y: 110, width: 40, height: 20, rx: 2, fill: "#fcd34d", stroke: "#4338ca", strokeWidth: 1 }),
          React.createElement("path", { d: "M60,115 L80,115", stroke: "#4338ca", strokeWidth: 1 }),
          React.createElement("path", { d: "M60,120 L70,120", stroke: "#4338ca", strokeWidth: 1 }),
          React.createElement("path", { d: "M130,60 Q140,50 150,60 Q140,70 130,60 Z", fill: "#93c5fd", stroke: "#4338ca", strokeWidth: 1 }),
          React.createElement("path", { d: "M140,55 L140,65", stroke: "#4338ca", strokeWidth: 1 }),
          React.createElement("path", { d: "M135,60 L145,60", stroke: "#4338ca", strokeWidth: 1 })
        )
      )
    ),
    React.createElement(
      Card,
      { className: "bg-white p-6 shadow-md" },
      React.createElement("form", { onSubmit: handleSubmit },
        // 나머지 입력 필드, 버튼은 JSX 변환 필요
        null
      )
    )
  );
}

module.exports = { LoginForm };

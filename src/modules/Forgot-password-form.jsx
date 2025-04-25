// ForgotPasswordForm.jsx
import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";
import { Label } from "./Label";
import { Card } from "./Label";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("비밀번호 재설정 이메일 전송:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-traveling-text">비밀번호 찾기</h1>
        <p className="text-traveling-text/70">가입하신 이메일로 비밀번호 재설정 링크를 보내드립니다.</p>
      </div>

      <div className="relative mb-8 flex justify-center">
        <div className="relative h-64 w-64">
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <circle cx="100" cy="100" r="80" fill="#e7f5ff" />
            <rect x="50" y="70" width="100" height="70" rx="5" fill="#a78bfa" stroke="#4338ca" strokeWidth="2" />
            <path d="M50,80 L100,110 L150,80" fill="none" stroke="#4338ca" strokeWidth="2" />
            <path d="M50,140 L85,110 M150,140 L115,110" fill="none" stroke="#4338ca" strokeWidth="2" />
            <rect x="85" y="50" width="30" height="25" rx="5" fill="#ff9a9e" stroke="#4338ca" strokeWidth="1.5" />
            <rect x="90" y="40" width="20" height="15" rx="10" fill="none" stroke="#4338ca" strokeWidth="1.5" />
            <circle cx="100" cy="60" r="5" fill="#4338ca" />
            <path d="M160,50 L163,56 L170,57 L165,62 L166,69 L160,66 L154,69 L155,62 L150,57 L157,56 Z" fill="#fcd34d" stroke="#4338ca" strokeWidth="0.5" />
            <path d="M40,100 L42,104 L47,105 L43.5,108 L44,113 L40,111 L36,113 L36.5,108 L33,105 L38,104 Z" fill="#fcd34d" stroke="#4338ca" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      <Card className="bg-white p-6 shadow-md">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label htmlFor="email" className="mb-2 block text-traveling-text">
                이메일
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="가입하신 이메일 주소를 입력하세요"
                  className="bg-traveling-background pl-10 border-traveling-text/30"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-traveling-text/50" />
              </div>
            </div>

            <Button type="submit" className="w-full bg-traveling-purple text-white hover:bg-traveling-purple/90">
              비밀번호 재설정 링크 받기
            </Button>

            <div className="mt-6 text-center">
              <Link href="/login" className="inline-flex items-center text-sm text-traveling-purple hover:underline">
                <ArrowLeft className="mr-1 h-4 w-4" />
                로그인으로 돌아가기
              </Link>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center py-4">
            <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
            <h2 className="mb-2 text-xl font-bold text-traveling-text">이메일이 전송되었습니다</h2>
            <p className="mb-6 text-center text-traveling-text/70">
              {email}로 비밀번호 재설정 링크를 보냈습니다. 이메일을 확인해주세요.
            </p>
            <Button
              className="w-full bg-traveling-purple text-white hover:bg-traveling-purple/90"
              onClick={() => setIsSubmitted(false)}
            >
              다른 이메일로 다시 시도
            </Button>
            <div className="mt-6 text-center">
              <Link href="/login" className="inline-flex items-center text-sm text-traveling-purple hover:underline">
                <ArrowLeft className="mr-1 h-4 w-4" />
                로그인으로 돌아가기
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;

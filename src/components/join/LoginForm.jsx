import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '../../modules/Button';
import { Input } from '../../modules/Input';
import { Label } from '../../modules/Label';
import { Checkbox } from '../../modules/Checkbox';
import { Card } from '../../modules/Card';
import { Separator } from '../../modules/Separator';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  loginAccount,
  getAccountDetails,
} from '../../hooks/reducer/account/accountThunk';
import { toast } from 'react-toastify';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleNaverLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/naver';
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const resultAction = await dispatch(loginAccount(loginData)).unwrap();
      console.log('로그인 성공:', resultAction);

      const { accessToken, refreshToken } = resultAction;

      if (rememberMe) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      } else {
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
      }

      const token = rememberMe
        ? localStorage.getItem('accessToken')
        : sessionStorage.getItem('accessToken');

      const user = await dispatch(getAccountDetails()).unwrap();

      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      toast.success('로그인 성공! 🎉');
      navigate('/'); // ✅ 이후 이동
    } catch (error) {
      console.error('로그인 실패:', error);
      toast.error((error || '서버 오류'));
    }
  };
  return (
    <div className="mx-auto max-w-md">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-traveling-text">로그인</h1>
        <p className="text-traveling-text/70">
          트래블링에 오신 것을 환영합니다!
        </p>
      </div>

      <div className="relative mb-8 flex justify-center">
        <div className="relative h-64 w-64">
          <svg viewBox="0 0 200 200" className="h-full w-full">
            {/* SVG 그림 부분 */}
          </svg>
        </div>
      </div>

      <Card className="bg-white p-6 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email" className="mb-2 block text-traveling-text">
              이메일
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="bg-traveling-background pl-10 border-traveling-text/30"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-traveling-text/50" />
            </div>
          </div>

          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <Label htmlFor="password" className="text-traveling-text">
                비밀번호
              </Label>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력하세요"
                className="bg-traveling-background pl-10 pr-10 border-traveling-text/30"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-traveling-text/50" />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-traveling-text/50"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <Checkbox
              id="remember-me"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 text-sm text-traveling-text/70"
            >
              로그인 상태 유지
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-traveling-purple text-white hover:bg-traveling-purple/90"
          >
            로그인
          </Button>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {/* 네이버 로그인 버튼 */}
            <Button
              type="button"
              variant="outline"
              className="flex items-center justify-center border-traveling-text/30 bg-white"
              onClick={handleNaverLogin}
            >
              <img
                src="/images/naverLogo.png"
                alt="Naver Logo"
                className="mr-2 h-5 w-5"
              />
              Naver
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex items-center justify-center border-traveling-text/30 bg-white"
              onClick={handleGoogleLogin}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.33l3.15 3.15c.87-2.6 3.09-4.58 5.67-4.58z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default LoginForm;

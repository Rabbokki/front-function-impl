
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function OAuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      // 필요하면 Redux 상태도 업데이트 가능

      navigate('/'); // 로그인 후 메인 페이지로 이동
    } else {
      navigate('/login'); // 실패 시 로그인 페이지로 이동
    }
  }, [searchParams, navigate]);

  return <div>로그인 처리 중입니다...</div>;
}

export default OAuthCallback;

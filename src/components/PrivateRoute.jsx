import React from 'react';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem('accessToken');

  if (!isLoggedIn) {
    // 로그인 안 돼있으면 로그인 페이지로 강제 이동
    alert('로그인이 필요합니다.');
    return <Navigate to="/login" replace />;
  }

  return children; // 로그인 돼있으면 원래 가려던 페이지 보여줌
}

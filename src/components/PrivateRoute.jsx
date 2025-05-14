import React from 'react';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children, requiredRole }) {
  const token =
    localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  const userData = localStorage.getItem('user') || sessionStorage.getItem('user');

  if (!token) {
    alert('로그인이 필요합니다.');
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userData) {
    try {
      const user  = JSON.parse(userData);
      if (user.role !== requiredRole) {
        alert('접근 권한이 없습니다.');
        return <Navigate to="/" replace />;
      }
    } catch (err) {
      console.error('유저 데이타 파싱 오류: ', err);
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}

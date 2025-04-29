import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // ✅ 백엔드 주소
  withCredentials: true, // 필요 시 쿠키 포함
});

// 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ 응답 인터셉터: 만료된 토큰 등 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert('로그인이 만료되었거나 인증되지 않았습니다.');
      // 필요하면 자동 로그아웃 처리 가능
      // localStorage.removeItem('accessToken');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

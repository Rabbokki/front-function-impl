import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', //  백엔드 주소
  withCredentials: true, // 필요 시 쿠키 포함
});

// 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = 
    localStorage.getItem('accessToken') ||
    sessionStorage.getItem('accessToken');

      const isAuthRequest = config.url.includes("/login") || config.url.includes("/signup");

    if (token && !isAuthRequest) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('✅ accessToken 포함됨:', token);
    } else {
      console.warn('🚫 토큰 없음 또는 인증 요청이므로 Authorization 생략');
    }
    return config;
  },
  (error) => Promise.reject(error)
);



// ✅ 응답 인터셉터: 만료된 토큰 등 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert('로그인이 만료되었거나 인증되지 않았습니다.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

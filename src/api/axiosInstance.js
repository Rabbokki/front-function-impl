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

    if (token) {
      config.headers['Access_Token'] = `${token}`;
      console.log('✅ accessToken 포함됨:', token);
    } else {
      console.warn('❌ accessToken 없음');
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

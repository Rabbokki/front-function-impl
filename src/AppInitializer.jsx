import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAccountDetails } from './hooks/reducer/account/accountThunk';

export default function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    if (token) {
      dispatch(getAccountDetails());
    }
  }, [dispatch]);

  return null;
}
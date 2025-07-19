import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAtom} from 'jotai';
import {accessTokenAtom, loginAtom, userIdValue} from '@/app/Jotai';
import {client} from '../lib/api/api';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [, setIsLogin] = useAtom(loginAtom);
  const [, setAccessToken] = useAtom(accessTokenAtom);
  const [, setUserId] = useAtom(userIdValue);
  const router = useRouter();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.post('/Login', {
        id: email,
        password
      });
      //통신 해서 토큰이 있는지 확인
      setAccessToken(response.data.accessToken);
      setIsLogin(true);
      router.push('/');
      localStorage.setItem('user', response.data.user.id);
      setUserId(response.data.user.id);
    } catch (err) {
      setError(err.response?.data?.message || '로그인에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await client.post('/Login/logout');
      setAccessToken('');
      setIsLogin(false);
      router.push('/');
    } catch (err) {
      console.error('로그아웃 실패:', err);
      throw err;
    }
  };

  return {login, logout, loading, error};
};

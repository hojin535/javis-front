import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginAtom, accessTokenAtom, userIdValue } from '../Recoil';
import { client } from '../api';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setIsLogin = useSetRecoilState(loginAtom);
  const setAccessToken = useSetRecoilState(accessTokenAtom);
  const setUserId = useSetRecoilState(userIdValue);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.post('/Login', {
        id:email,
        password
      });
      //통신 해서 토큰이 있는지 확인
      setAccessToken(response.data.accessToken);
      setIsLogin(true);
      navigate('/');
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
      navigate('/');
    } catch (err) {
      console.error('로그아웃 실패:', err);
      throw err;
    }
  };

  return { login, logout, loading, error };
};

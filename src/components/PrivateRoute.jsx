import { loginAtom } from '../Recoil';
import { Navigate } from 'react-router-dom';
import {useRecoilValue} from 'recoil';

export function PrivateRoute ({ children })  {
  const isLogin = useRecoilValue(loginAtom);
  // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
  return isLogin ? children : <Navigate to="/" />;
}


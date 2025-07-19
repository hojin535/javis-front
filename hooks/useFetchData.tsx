import {useCallback, useState} from 'react';
import {useAtom} from 'jotai';
import {accessTokenAtom} from '../app/Jotai';
import {client} from '../lib/api/api';

export const useFetchData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);

  const fetchData = useCallback(async (url, method = 'GET', data = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client({
        url,
        method,
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response;  // 전체 response 객체 반환
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          // refresh token으로 새로운 access token 요청
          const refreshResponse = await client.post('/Login/refresh');
          setAccessToken(refreshResponse.data.accessToken);

          // 원래 요청 재시도
          const retryResponse = await client({
            url,
            method,
            data,
            headers: {
              Authorization: `Bearer ${refreshResponse.data.accessToken}`
            }
          });
          return retryResponse;  // 전체 response 객체 반환
        } catch (refreshErr) {
          setError(refreshErr);
          throw refreshErr;
        }
      }
      setError(err.response?.data?.message || '요청 처리 중 오류가 발생했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [accessToken, setAccessToken]);

  return {fetchData, loading, error};
};

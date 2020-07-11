/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserProvider';
import axios from '../utils/axios';

export default function () {
  const { setUserState } = useContext(UserContext);

  const runProcess = async () => {
    try {
      const user = (await axios.get('/users/me')).data;
      setUserState(user);
    } catch (e) {
      if (!e.response || e.response.status !== 401) {
        alert.error(e.message);
      }
    }
  };

  useEffect(() => {
    runProcess();
  }, []);

  return null;
}

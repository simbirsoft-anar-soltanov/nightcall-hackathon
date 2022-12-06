import { useState, useEffect } from 'react';

export type tAlert = { status: string; title: string };

export const useAlert = () => {
  const [alert, setAlert] = useState<tAlert | null>(null);

  const onHandleChangeAlert = (payload: tAlert) => setAlert(payload);

  useEffect(() => {
    const clearAlert = setTimeout(() => setAlert(null), 5000);

    return () => {
      clearTimeout(clearAlert);
    };
  }, [alert]);

  return { alert, onHandleChangeAlert };
};

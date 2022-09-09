import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import trackPathForAnalytics from 'core/analytics/trackPageForAnalytics';

const useAnalytics = () => {
  const { pathname, search } = useLocation();

  const analytics = useCallback(() => {
    trackPathForAnalytics({
      path: pathname,
      search: search,
      title: pathname.split('/')[1],
    });
  }, [pathname, search]);

  useEffect(() => {
    analytics();
  }, [analytics]);
};

export default useAnalytics;

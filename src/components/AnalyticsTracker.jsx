import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView } from "../analytics";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

export default AnalyticsTracker;

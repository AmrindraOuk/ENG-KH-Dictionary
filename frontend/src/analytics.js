import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-N7NNJR20JJ";

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

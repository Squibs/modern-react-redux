import { useEffect, useState } from 'react';

interface IRouteProps {
  path: string;
  children: JSX.Element;
}

const Route = ({ path, children }: IRouteProps): JSX.Element | null => {
  // this piece of state is only being used to cause a window re-render by tracking the current window url
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname); // updates window url in currentPath state
    };

    // listening for popstate (navigation event form link.tsx component)
    window.addEventListener('popstate', onLocationChange);

    // cleanup function
    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  return currentPath === path ? children : null;
};

export default Route;

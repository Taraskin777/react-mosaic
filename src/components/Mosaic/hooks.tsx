import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleChange = () => setMatches(mediaQueryList.matches);

    handleChange(); // Викликаємо при першому рендерінгу
    mediaQueryList.addEventListener('change', handleChange);

    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

export default useMediaQuery;

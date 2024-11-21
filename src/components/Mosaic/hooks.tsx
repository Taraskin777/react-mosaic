import { useState, useEffect } from 'react';
import { ITicker } from '../../types/ticker.types';

type UseFetchTickersResult = {
  tickers: ITicker[];
  loading: boolean;
  selectedTickers: Record<'a' | 'b' | 'c' | 'new', ITicker | null>;
  setSelectedTickers: React.Dispatch<
    React.SetStateAction<Record<'a' | 'b' | 'c' | 'new', ITicker | null>>
  >;
};

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleChange = () => setMatches(mediaQueryList.matches);

    handleChange();
    mediaQueryList.addEventListener('change', handleChange);

    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

const useFetchTickers = (): UseFetchTickersResult => {
  const [tickers, setTickers] = useState<ITicker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTickers, setSelectedTickers] = useState<
    Record<'a' | 'b' | 'c' | 'new', ITicker | null>
  >({
    a: null,
    b: null,
    c: null,
    new: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/companies-lookup.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTickers(data);
        setSelectedTickers({
          a: data[0] || null,
          b: data[1] || null,
          c: data[2] || null,
          new: null,
        });
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { tickers, loading, selectedTickers, setSelectedTickers };
};

export { useMediaQuery, useFetchTickers };

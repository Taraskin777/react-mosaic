import React from 'react';
import { useState, useEffect } from 'react';
import { Mosaic, MosaicWindow, MosaicNode } from 'react-mosaic-component';
import TileContent from '../TileContent/tileContent';
import { ITicker } from '../../types/ticker.types';
import { generateNewId, removeNodeFromMosaic } from './mosaicHelpers';
import useMediaQuery from './hooks';
import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

export type ViewId = 'a' | 'b' | 'c' | 'new';

const MosaicWrapper = (): JSX.Element => {
  const [tickers, setTickers] = useState<ITicker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTickers, setSelectedTickers] = useState<
    Record<ViewId, ITicker | null>
  >({
    a: null,
    b: null,
    c: null,
    new: null,
  });

  const [mosaicValue, setMosaicValue] = useState<MosaicNode<ViewId> | null>({
    direction: 'row',
    first: 'a',
    second: {
      direction: 'column',
      first: 'b',
      second: 'c',
    },
  });

  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isMobile) {
      setMosaicValue({
        direction: 'column',
        first: 'a',
        second: {
          direction: 'column',
          first: 'b',
          second: 'c',
        },
      });
    } else {
      setMosaicValue({
        direction: 'row',
        first: 'a',
        second: {
          direction: 'column',
          first: 'b',
          second: 'c',
        },
      });
    }
  }, [isMobile]);

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

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    viewId: ViewId
  ) => {
    const ticker = tickers.find((t) => t.ticker === event.target.value);
    setSelectedTickers((prev) => ({ ...prev, [viewId]: ticker || null }));
  };

  // Replace the content of the tile
  const handleReplace = (id: ViewId) => {
    if (tickers.length === 0) return; // Якщо тикери не завантажені
    const ticker = tickers[Math.floor(Math.random() * tickers.length)];
    setSelectedTickers((prev) => ({ ...prev, [id]: ticker }));
  };

  const generateNewId = (): ViewId => {
    const timestamp = Date.now();
    return `new-${timestamp}` as ViewId;
  };

  // Split the tile into two child tiles
  const handleSplit = (id: ViewId) => {
    setMosaicValue((prev) => {
      if (!prev) {
        // Якщо дерево порожнє, створюємо новий вузол
        return {
          direction: 'row',
          first: id,
          second: generateNewId(), // Генеруємо унікальний ID
        };
      }

      // Рекурсивна функція для додавання нового вузла до дерева
      const addNewNode = (node: MosaicNode<ViewId>): MosaicNode<ViewId> => {
        if (node === id) {
          return {
            direction: 'row', // Напрямок поділу
            first: id,
            second: generateNewId(), // Генеруємо унікальний ID
          };
        }

        if (typeof node === 'object') {
          // Рекурсивно обходимо дерево
          return {
            ...node,
            first: addNewNode(node.first),
            second: addNewNode(node.second),
          };
        }

        return node;
      };

      return addNewNode(prev);
    });
  };

  // Expand the tile to take up the entire space
  const handleExpand = (id: ViewId) => {
    setMosaicValue(id);
  };

  // Remove the tile
  const handleClose = (id: ViewId) => {
    setMosaicValue((prev) => (prev ? removeNodeFromMosaic(prev, id) : null));
  };

  // Helper function to remove a node from the mosaic
  const removeNodeFromMosaic = (
    node: MosaicNode<ViewId>,
    id: ViewId
  ): MosaicNode<ViewId> | null => {
    if (!node) return null;
    if (node === id) return null;
    if (typeof node === 'object') {
      const newFirst = removeNodeFromMosaic(node.first, id);
      const newSecond = removeNodeFromMosaic(node.second, id);

      if (!newFirst && !newSecond) return null;
      if (!newFirst) return newSecond!;
      if (!newSecond) return newFirst!;

      return { ...node, first: newFirst, second: newSecond };
    }
    return node;
  };

  return (
    <Mosaic<ViewId>
      renderTile={(id, path) => {
        const ticker = selectedTickers[id];
        return (
          <MosaicWindow<ViewId>
            path={path}
            createNode={() => 'new'}
            title={'Company Info'}
            toolbarControls={[
              <select
                key="ticker-select"
                onChange={(e) => handleSelectChange(e, id)}
                value={ticker?.ticker || ''}
                style={{
                  marginLeft: '8px',
                  padding: '4px',
                  width: '100%',
                }}
              >
                <option value="" disabled>
                  Select framework
                </option>
                {tickers.map((ticker) => (
                  <option key={ticker.id} value={ticker.ticker}>
                    {ticker.name} ({ticker.ticker})
                  </option>
                ))}
              </select>,
              <button onClick={() => handleReplace(id)} key={`replace-${id}`}>
                Replace
              </button>,
              <button onClick={() => handleSplit(id)} key={`split-${id}`}>
                Split
              </button>,
              <button onClick={() => handleExpand(id)} key={`expand-${id}`}>
                Expand
              </button>,
              <button onClick={() => handleClose(id)} key={`close-${id}`}>
                Close
              </button>,
            ]}
          >
            {loading ? <div>Loading...</div> : <TileContent ticker={ticker} />}
          </MosaicWindow>
        );
      }}
      value={mosaicValue}
      onChange={setMosaicValue}
    />
  );
};

export default MosaicWrapper;

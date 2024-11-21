import React from 'react';
import { useState, useEffect } from 'react';
import { Mosaic, MosaicWindow, MosaicNode } from 'react-mosaic-component';
import TileContent from '../TileContent/tileContent';
import { generateNewId, removeNodeFromMosaic } from './mosaicHelpers';
import { useMediaQuery, useFetchTickers } from './hooks';
import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

export type ViewId = 'a' | 'b' | 'c' | 'new';

const MosaicWrapper = (): JSX.Element => {
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
  const { tickers, loading, selectedTickers, setSelectedTickers } =
    useFetchTickers();

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

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    viewId: ViewId
  ) => {
    const ticker = tickers.find((t) => t.ticker === event.target.value);
    setSelectedTickers((prev) => ({ ...prev, [viewId]: ticker || null }));
  };

  const handleReplace = (id: ViewId) => {
    if (tickers.length === 0) return;
    const ticker = tickers[Math.floor(Math.random() * tickers.length)];
    setSelectedTickers((prev) => ({ ...prev, [id]: ticker }));
  };

  const handleSplit = (id: ViewId) => {
    setMosaicValue((prev) => {
      if (!prev) {
        return {
          direction: 'row',
          first: id,
          second: generateNewId(),
        };
      }

      const addNewNode = (node: MosaicNode<ViewId>): MosaicNode<ViewId> => {
        if (node === id) {
          return {
            direction: 'row',
            first: id,
            second: generateNewId(),
          };
        }

        if (typeof node === 'object') {
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

  const handleExpand = (id: ViewId) => {
    setMosaicValue(id);
  };

  const handleClose = (id: ViewId) => {
    setMosaicValue((prev) => (prev ? removeNodeFromMosaic(prev, id) : null));
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
            <div className='mosaic-tile-content'>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <TileContent ticker={ticker} />
              )}
            </div>
          </MosaicWindow>
        );
      }}
      value={mosaicValue}
      onChange={setMosaicValue}
    />
  );
};

export default MosaicWrapper;

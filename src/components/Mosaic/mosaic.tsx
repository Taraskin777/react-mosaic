import React from 'react';
import { useState, useEffect } from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import TileContent from '../TileContent/tileContent';
import { ITicker } from '../../types/ticker.types';
import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

export type ViewId = 'a' | 'b' | 'c' | 'new';

const TITLE_MAP: Record<ViewId, string> = {
  a: 'Left Window',
  b: 'Top Right Window',
  c: 'Bottom Right Window',
  new: 'New Window',
};

const MosaicWrapper = (): JSX.Element => {
  const [tickers, setTickers] = useState<ITicker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  console.log(tickers);

  useEffect(() => {
    setLoading(true);
    fetch('/companies-lookup.json')
      .then((response) => response.json())
      .then((data) => setTickers(data))
      .finally(() => setLoading(false));
  }, []);
  return (
    <Mosaic<ViewId>
      renderTile={(id, path) => {
        const tickerIndex =
          id === 'a' ? 0 : id === 'b' ? 1 : id === 'c' ? 2 : -1;
        const ticker = tickers[tickerIndex];
        return (
          <MosaicWindow<ViewId>
            // toolbarControls={[
            //   <button onClick={() => console.log('Toolbar button clicked!')}>
            //     Click Me
            //   </button>,
            //   <button onClick={() => console.log('Toolbar button 2 clicked!')}>
            //     Click Me 2
            //   </button>,
            // ]}
            path={path}
            createNode={() => 'new'}
            title={'Company Info'}
            className="scrollable-content"
          > 
            {loading ? <div>Loading...</div> : <TileContent ticker={ticker} />}
          </MosaicWindow>
        );
      }}
      initialValue={{
        direction: 'row',
        first: 'a',
        second: {
          direction: 'column',
          first: 'b',
          second: 'c',
        },
      }}
    />
  );
};

export default MosaicWrapper;

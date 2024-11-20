import React from 'react';

import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import './App.css';
import MosaicWrapper from './components/Mosaic/mosaic';

function App() {
  return (
    <div className="App">
      <MosaicWrapper />
    </div>
  );
}

export default App;

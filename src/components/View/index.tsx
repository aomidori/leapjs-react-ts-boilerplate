import * as React from 'react';

import { ViewManager } from './viewManager';

let viewManager;

const View: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(
    () => {
      console.log('Canvas mounted.');
      if (canvasRef.current) {
        viewManager = new ViewManager(canvasRef.current);
        viewManager.init();
      }
    },
    [],
  )

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100vw', height: '100vh' }}
    />
  )
};

export default View;
import './App.css';
// import { TonConnectButton } from '@tonconnect/ui-react';
// import { useTonConnect } from './Hooks/useTonConnect';
// import { useCounterContract } from './Hooks/useCounterContract';
import ObjectDetection from './OjectDetect';
import StepCounter from './Step';

function App() {
  // const { connected } = useTonConnect();
  // const { value, address, sendIncrement } = useCounterContract();

  return (
    <div className="App">
      <div className="Container">
        <StepCounter />
        <ObjectDetection />
      </div>
    </div>
  );
}

export default App;

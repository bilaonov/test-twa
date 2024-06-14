import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from './Hooks/useTonConnect';
import { useCounterContract } from './Hooks/useCounterContract';
import ObjectDetection from './OjectDetect';

function App() {
  const { connected } = useTonConnect();
  const { value, address, sendIncrement } = useCounterContract();

  return (
    <div className="App">
      <div className="Container">
        <TonConnectButton />
        <ObjectDetection />
        <div className="Card">
          <b>Counter Address</b>
          <div className="Hint">{address?.slice(0, 30) + '...'}</div>
        </div>

        <div className="Card">
          <b>Counter Value</b>
          <div>{value ?? 'Loading...'}</div>
        </div>

        <a
          className={`Button ${connected ? 'Actives' : 'Disabled'}`}
          onClick={() => {
            sendIncrement();
          }}
        >
          Increment
        </a>
      </div>
    </div>
  );
}

export default App;

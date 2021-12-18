import './App.css';

import { NavComponent } from './components/Nav/NavComponent'
import { useWeb3Provider } from './hooks/useWeb3Provider';
import { useSigner } from './hooks/useSigner';
import { useDaiContract } from './hooks/useDaiContract';
import { useDaiBalance } from './hooks/useDaiBalance';
import { useAccount } from './hooks/useAccount';

function App() {

  const provider = useWeb3Provider();
  const signer = useSigner(provider);
  const account = useAccount(provider);
  const daiContract = useDaiContract(signer);
  const DAIBalance = useDaiBalance(daiContract, provider);
  // const aggregatorContract = useAggregatorContract(signer);

  return (
    <div className="App">
      <NavComponent/>
      <span>bank</span>
      <div>Account: {account}</div>
      <div>Dia Address: {daiContract?.address}</div>
      <div>DAI Balance: {DAIBalance}</div>
    </div>
  );
}

export default App;

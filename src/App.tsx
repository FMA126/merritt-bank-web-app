import './App.css';

import { NavComponent } from './components/Nav/NavComponent'
import { useWeb3Provider } from './hooks/account/useWeb3Provider';
import { useSigner } from './hooks/account/useSigner';
import { useDaiContract } from './hooks/contracts/useDaiContract';
import { useDaiBalance } from './hooks/useDaiBalance';
import { useAccount } from './hooks/account/useAccount';
import { useAggregatorContract } from './hooks/contracts/useAggregatorContract';
import { useAaveLendingPoolContract } from './hooks/contracts/useAaveLendingPoolContract';
import { useCDaiContract } from './hooks/contracts/useCDaiContract';
import { useAaveApy } from './hooks/calculateApy/useAaveApy';
import { ethers } from 'ethers';

function App() {

  const provider = useWeb3Provider();
  const signer = useSigner(provider);
  const account = useAccount(provider);
  const daiContract = useDaiContract(signer);
  const daiBalance = useDaiBalance(daiContract, provider);
  // const aggregatorContract = useAggregatorContract(signer);
  // const aaveLendingPoolContract = useAaveLendingPoolContract(signer);
  // const cDaiContract = useCDaiContract(signer);
  // const aaveLendingPoolApy = useAaveApy(aaveLendingPoolContract);
  // console.log(ethers.utils.parseEther(aaveLendingPoolApy.toString()))

  return (
    <div className="App">
      <NavComponent/>
      <span>bank</span>
      <div>Account: {account}</div>
      <div>DAI Balance: {daiBalance}</div>
      {/* <div>Aave APY: {ethers.utils.parseEther(aaveLendingPoolApy.toString())}</div> */}
    </div>
  );
}

export default App;

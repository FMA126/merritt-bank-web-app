import './App.css';
import { BankComponent } from './components/BankComponent/BankComponent';
import { NavComponent } from './components/Nav/NavComponent'
// import { useWeb3Provider } from './hooks/account/useWeb3Provider';
// import { useSigner } from './hooks/account/useSigner';
// import { useDaiContract } from './hooks/contracts/useDaiContract';
// import { useAggregatorContract } from './hooks/contracts/useAggregatorContract';
// import { useAaveApy } from './hooks/calculateApy/useAaveApy';
// import { useCompoundApy } from './hooks/calculateApy/useCompoundApy';
import { useWallet, Account } from './hooks/account/useWallet';

function App() {
  const account: Account = useWallet();
  // const [ provider, setProvider ] = useState<Web3Provider | null>(null);
  // const [ connectedAccount, setConnectedAccount ] = useState<string | null>(null);
  // useWeb3Provider(setProvider, setConnectedAccount);
  // const [ signer, setSigner ] = useState<Signer | null>(null);
  // useSigner(provider, setSigner);
  // const [ daiBalance, setDaiBalance ] = useState<string | null>(null);
  // const [ daiContract, setDaiContract ] = useState<Contract | null>(null);
  // useDaiContract(signer, connectedAccount, daiContract, setDaiContract, setDaiBalance);
  // const [ aggregatorContract, setAggregatorContract ] = useState<Contract | null>(null);
  // const [ aaveApy, setAaveApy ] = useState<BigNumber | null>(null);
  // const [ compoundApy, setCompoundApy ] = useState<BigNumber | null>(null);
  // const [ approvalStatus, setApprovalStatus ] = useState<boolean | null>(null);
  // const [ depositAmount, setDepositAmount ] = useState<number>(0);
  // const [ aggregatorBalance, setAggregatorBalance ] = useState<string | null>(null)

  // useAggregatorContract(signer, aggregatorContract, setAggregatorContract, setAggregatorBalance);
  // useAaveApy(signer, setAaveApy);
  // useCompoundApy(signer, setCompoundApy)
  // console.log(ethers.utils.parseEther(aaveLendingPoolApy.toString()))

  // const formatEther = (amount: BigNumber) => {
  //   if(amount) {
  //     return ethers.utils.formatEther(amount)
  //   }
  //   return amount;
  // }

  // const parseEther = (amount: string) => {
  //   if(amount) {
  //     return ethers.utils.parseEther(amount)
  //   }
  //   return amount;
  // }

  // const handleAggregatorApprove = async () => {
  //   try {
  //     const approve = await daiContract?.approve(aggregatorContract?.address, daiBalance && parseEther(daiBalance));
  //     await approve.wait()
  //     setApprovalStatus(true)
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  // const handleDepositInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setDepositAmount(Number.parseFloat(value));
  // }

  // const handleDeposit = async () => {
  //   try {
  //     const deposit = await aggregatorContract?.deposit(parseEther(depositAmount.toString()), compoundApy, aaveApy);
  //     deposit.wait();
  //     const balance = await aggregatorContract?.amountDeposited();
  //     setAggregatorBalance(formatEther(balance));
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }
  if (account.connectedStatus) {
    return (
      <div className="App">
        <NavComponent account={account}/>
        <BankComponent account={account}/>
        {/* {
        approvalStatus &&
        <div>
          <div>{depositAmount || 0}</div>
          <input type="number" placeholder='Amount to deposit' onChange={handleDepositInputChange} value={depositAmount}></input>
          <button onClick={handleDeposit}>Deposit</button>
        </div>
        }
        {
          aggregatorBalance &&
          <div>
            <div>Aggregator Balance: {aggregatorBalance}</div>
          </div>
        }  */}
      </div>
    );
  }
  return (<div>Please Connect MetaMask</div>)
}

export default App;

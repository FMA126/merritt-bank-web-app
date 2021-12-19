import './App.css';
import { BankComponent } from './components/BankComponent/BankComponent';
import { NavComponent } from './components/Nav/NavComponent'
import { useWallet, Account } from './hooks/account/useWallet';

function App() {
  const account: Account = useWallet();
 
  if (account.connectedStatus) {
    return (
      <div className="App">
        <NavComponent account={account}/>
        <BankComponent account={account}/>
      </div>
    );
  }
  return (<div>Please Connect MetaMask</div>)
}

export default App;

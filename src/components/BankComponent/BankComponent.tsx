import "./BankComponent.css";
import { Contract } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Account } from '../../hooks/account/useWallet';
import { useAaveApy } from '../../hooks/calculateApy/useAaveApy';
import { useCompoundApy } from '../../hooks/calculateApy/useCompoundApy';
import { createAggregatorContract } from '../../contracts/createAggregatorContract';
import { createDaiContract } from '../../contracts/createDaiContract';

type BankProps = {
    account: Account,
}

export const BankComponent = (props: BankProps) => {
    const { signer, connectedAccount } = props.account;
    const [daiContract, setDaiContract] = useState({} as Contract)

    useMemo(() => {
        setDaiContract(createDaiContract(signer));
    },[])
    const aggregatorContract = createAggregatorContract(signer);
    const [ daiBalance, setDaiBalance] = useState<string>('0');

    useEffect(() => {
        const fetchDaiBalance = async () => {
            const balance = await daiContract.balanceOf(connectedAccount);
            setDaiBalance(formatEther(balance));
        }
        fetchDaiBalance();
    },[daiBalance]);
    const aaveApy = useAaveApy(signer);
    const compoundApy = useCompoundApy(signer);
    const [ isApproved, setIsApproved ] = useState(false);

    useEffect(() => {
        const fetchApproval = async () => {
            const approved = await daiContract.allowance(aggregatorContract.address, connectedAccount);
            setIsApproved(formatEther(approved) !== '0.0');
        }
        fetchApproval();
    }, [isApproved])
    const [depositAmount, setDepositAmount] = useState(0);
    const [aggregatorBalance, setAggregatorBalance] = useState('0')

    useEffect(() => {
        const fetchAggregatorBalance = async () => {
            const balance = await aggregatorContract.amountDeposited();
            setAggregatorBalance(formatEther(balance));
        }
        fetchAggregatorBalance()
    }, [aggregatorBalance])

    const handleDepositInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDepositAmount(Number.parseFloat(value));
    }

    const handleDeposit = async () => {
        try {
            depositAggregator();
        } catch (err) {
            console.error(err)
        }
    }

    const handleWithdraw = async () => {
        const approvalStatus = await daiContract.approve(aggregatorContract.address, parseEther(depositAmount.toString()));
        await approvalStatus.wait();
        const withdraw = await aggregatorContract.withdraw();
        await withdraw.wait();
        const balance = await aggregatorContract.amountDeposited();
        const daiBalance = await daiContract.balanceOf(connectedAccount);
        setDaiBalance(formatEther(daiBalance));
        setAggregatorBalance(formatEther(balance));
    }

    const depositAggregator = async function approved() {
        const approvalStatus = await daiContract.approve(aggregatorContract.address, parseEther(depositAmount.toString()));
        await approvalStatus.wait();
        const deposit = await aggregatorContract.deposit(parseEther(depositAmount.toString()), compoundApy, aaveApy);
        await deposit.wait();
        const daiBalance = await daiContract.balanceOf(connectedAccount);
        const balance = await aggregatorContract.amountDeposited();
        setIsApproved(true);
        setDaiBalance(formatEther(daiBalance));
        setAggregatorBalance(formatEther(balance));
    }
    return (
        <div className="bank-container">
          <div className="bank-head">
            <h1>bank</h1>
            <div>DAI Balance: {daiBalance}</div>
            <div>Aave APY: {`${formatEther(aaveApy)} %`}</div>
            <div>Compound APY: {`${formatEther(compoundApy)} %`}</div>
          </div>
          <div className="bank-body">
            <div>
              <div>Aggregator Balance: {aggregatorBalance}</div>
            </div>
            <div>
              <input type="number" placeholder='Amount to deposit' onChange={handleDepositInputChange} value={depositAmount || 0}></input>
            </div>
            <div>
              <button className="deposit-button" onClick={handleDeposit}>Deposit</button>
              {!!Number.parseFloat(aggregatorBalance) && <button className="withdraw-button" onClick={handleWithdraw}>Withdraw</button>}
            </div>
          </div>
        </div>
    )
}
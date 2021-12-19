import React from 'react';
import { Account } from '../../hooks/account/useWallet';

type NavProps = {
    account: Account,
} 

export const NavComponent = (props: NavProps) => {
    return (
    <nav>
        <div>Connected Account: {props.account.connectedAccount}</div>
        {/* <button onClick={() => {console.log('connect clicked!')}}>Connect</button> */}
    </nav>
    )
}
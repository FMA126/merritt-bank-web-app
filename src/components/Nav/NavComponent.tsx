import { Account } from '../../hooks/account/useWallet';

type NavProps = {
    account: Account,
} 

export const NavComponent = (props: NavProps) => {
    return (
    <nav>
        <div>Connected Account: {props.account.connectedAccount}</div>
    </nav>
    )
}
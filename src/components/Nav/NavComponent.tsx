import { Account } from '../../hooks/account/useWallet';
import "./NavComponent.css"

type NavProps = {
    account: Account,
} 

export const NavComponent = (props: NavProps) => {
    return (
    <nav>
        <div>Connected Account: {`${props?.account?.connectedAccount?.substring(0,4)}...${props?.account?.connectedAccount?.substring(props?.account?.connectedAccount?.length - 4)}`}</div>
    </nav>
    )
}
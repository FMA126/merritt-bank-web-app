import { useEffect, useState } from "react"

export const useAccount = (provider: any) => {
    const [account, setAccount] = useState<any>(null);

    useEffect(() => {
        const getAccount = async () => {
            const [account0] = await provider.listAccounts();
            setAccount(account0);
        }
        if (provider) {
            getAccount();
        }
    }, [provider]);

    return account;
}
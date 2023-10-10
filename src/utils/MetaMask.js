
let accounts = [];

export function checkMetaMask() {
    if(window.ethereum){
        return true;
    }else{
        alert("install metamask extension!")
        return false;
    }
}

export async function getAccount() {
    if (checkMetaMask()) {
        if (accounts.length == 0) {
            accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
        }
    }
    return accounts[0];
}

export async function getBalance() {
    let account = await getAccount();
    if (account) {
        const ethHex = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [account, "latest"],
        });
        return parseInt(ethHex) / 10 ** 18;
    }
    return null;
}

export async function signData(data) {
    let account = await getAccount();
    if (account) {
        return await window.ethereum.request({
            method: 'personal_sign',
            params: [account, data],
        });
    }
    return null;
}

export async function runTransaction(...data) {
    if (checkMetaMask()) {
        return await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: data,
        });
    }
    return null;
}
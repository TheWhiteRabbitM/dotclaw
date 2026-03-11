export async function getValidators(api) {
    const validators = await api.query.session.validators();
    const validatorArray = validators.toJSON();
    const validatorList = validatorArray.slice(0, 5).map((v) => v.slice(0, 20) + '...');
    return `📋 Top 5 Validators:\n${validatorList.join('\n')}`;
}
export async function stake(api, wallet, amount) {
    const decimals = api.registry.chainDecimals[0];
    const amountBN = BigInt(Number(amount) * Math.pow(10, decimals));
    const tx = api.tx.staking.bond(amountBN.toString(), 'Staked');
    const hash = await sendTx(tx, wallet);
    return `✅ Staked ${amount} DOT\nTx: ${hash.slice(0, 20)}...`;
}
export async function unbond(api, wallet, amount) {
    const decimals = api.registry.chainDecimals[0];
    const amountBN = BigInt(Number(amount) * Math.pow(10, decimals));
    const tx = api.tx.staking.unbond(amountBN.toString());
    const hash = await sendTx(tx, wallet);
    return `✅ Unbonded ${amount} DOT\nTx: ${hash.slice(0, 20)}...`;
}
async function sendTx(tx, wallet) {
    return new Promise((resolve, reject) => {
        tx.signAndSend(wallet.pair, ({ status }) => {
            if (status.isFinalized)
                resolve(status.asFinalized.toHex());
        }).catch(reject);
    });
}

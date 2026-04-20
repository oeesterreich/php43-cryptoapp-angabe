app.component('wallet-list', {
    props: {
        wallets: {
            type: Array,
            required: true
        },
        purchases: {
            type: Array,
            required: true
        },
        prices: {
            type: Object,
            required: true
        }
    },
    template:
    /*html*/
        `
    <div class="wallet-list">
        <h3>Wallet Summary</h3>
        <ul>
            <li v-for="wallet in walletSummaries" :key="wallet.id">
                <strong>{{ wallet.name }}</strong><br/>
                Total Invested: {{ wallet.totalInvested.toFixed(2) }} EUR &mdash;
                Current Value: {{ wallet.totalValue.toFixed(2) }} EUR &mdash;
                Gain: <span :style="{ color: wallet.gain >= 0 ? 'green' : 'red' }">
                    {{ wallet.gain.toFixed(2) }}%
                </span>
            </li>
        </ul>
        <p v-if="wallets.length === 0">No wallets yet.</p>
    </div>
    `,
    computed: {
        walletSummaries() {
            return this.wallets.map(wallet => {
                const walletPurchases = this.purchases.filter(p => p.wallet_id === wallet.id);
                const totalInvested = walletPurchases.reduce((sum, p) => sum + p.price, 0);
                const totalValue = walletPurchases.reduce((sum, p) => {
                    const rate = this.prices[p.currency];
                    return sum + (rate ? p.amount * parseFloat(rate.EUR) : p.price);
                }, 0);
                const gain = totalInvested > 0 ? ((totalValue - totalInvested) / totalInvested) * 100 : 0;
                return { ...wallet, totalInvested, totalValue, gain };
            });
        }
    }
})
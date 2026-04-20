app.component('app-display', {
    props: {
        prices: {
            type: Object,
            required: true
        },
        purchases: {
            type: Array,
            required: true
        },
        wallets: {
            type: Array,
            required: true
        }
    },
    template:
    /*html*/
        `
    <div class="wallet-display">
        <div class="section-row">
            <div class="wallet-form">
                <h3>Add Wallet</h3>
                <label>Name</label>
                <input type="text" v-model="newWalletName" placeholder="e.g. My Bitcoin Wallet" />
                <div class="button" :class="{ disabledButton: !newWalletName }" @click="submitWallet">Add Wallet</div>
            </div>
            <purchase-form :wallets="wallets" :prices="prices" @add-to-wallet="$emit('add-to-wallet', $event)"></purchase-form>
        </div>
        <div class="section-row">
            <purchase-list :purchases="purchases" :prices="prices" @delete-purchase="$emit('delete-purchase', $event)"></purchase-list>
            <wallet-list :wallets="wallets" :purchases="purchases" :prices="prices"></wallet-list>
        </div>
        <div class="section-row" v-if="walletsWithPurchases.length">
            <wallet-detail v-for="wallet in walletsWithPurchases" :key="wallet.id" :wallet="wallet" :prices="prices"></wallet-detail>
        </div>
    </div>
   `,
    computed: {
        walletsWithPurchases() {
            return this.wallets.map(wallet => ({
                ...wallet,
                purchases: this.purchases.filter(p => p.wallet_id === wallet.id)
            }));
        }
    },
    data() {
        return {
            newWalletName: ''
        }
    },
    methods: {
        submitWallet() {
            if (!this.newWalletName) return;
            this.$emit('add-wallet', this.newWalletName);
            this.newWalletName = '';
        }
    }
})
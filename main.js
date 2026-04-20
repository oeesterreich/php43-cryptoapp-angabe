const API_URL = 'server/api.php?r=purchase';
const WALLET_URL = 'server/api.php?r=wallet';
const BITPANDA_URL = 'https://api.bitpanda.com/v1/ticker';

const app = Vue.createApp({
    data() {
        return {
            purchases: [],
            wallets: [],
            prices: {}
        }
    },
    mounted() {
        this.loadPurchases();
        this.loadWallets();
        this.loadPrices();
    },
    methods: {
        loadPurchases() {
            axios.get(API_URL)
                .then(response => { this.purchases = response.data; })
                .catch(error => { console.error('Error loading purchases:', error); });
        },
        loadWallets() {
            axios.get(WALLET_URL)
                .then(response => { this.wallets = response.data; })
                .catch(error => { console.error('Error loading wallets:', error); });
        },
        loadPrices() {
            axios.get(BITPANDA_URL)
                .then(response => { this.prices = response.data; })
                .catch(error => { console.error('Error loading prices:', error); });
        },
        addPurchase(purchase) {
            axios.post(API_URL, purchase)
                .then(() => { this.loadPurchases(); })
                .catch(error => { console.error('Error adding purchase:', error); });
        },
        deletePurchase(id) {
            axios.delete(API_URL + '/' + id)
                .then(() => { this.loadPurchases(); })
                .catch(error => { console.error('Error deleting purchase:', error); });
        },
        addWallet(name) {
            axios.post(WALLET_URL, { name })
                .then(() => { this.loadWallets(); })
                .catch(error => { console.error('Error adding wallet:', error); });
        }
    }
})
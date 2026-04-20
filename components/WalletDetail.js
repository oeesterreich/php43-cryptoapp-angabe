app.component('wallet-detail', {
    props: {
        wallet: {
            type: Object,
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
    <div class="wallet-container">
        <h3>{{ wallet.name }}</h3>
        <ul>
            <li v-for="purchase in wallet.purchases" :key="purchase.id">
                <strong>{{ purchase.currency }}</strong> &mdash;
                Amount: {{ purchase.amount }} &mdash;
                Paid: {{ purchase.price }} EUR &mdash;
                Date: {{ purchase.date }}<br/>
                <span v-if="currentValue(purchase) !== null">
                    Current Value: {{ currentValue(purchase).toFixed(2) }} EUR &mdash;
                    Gain: <span :style="{ color: gain(purchase) >= 0 ? 'green' : 'red' }">
                        {{ gain(purchase).toFixed(2) }}%
                    </span>
                </span>
            </li>
        </ul>
        <p v-if="wallet.purchases && wallet.purchases.length === 0">No purchases in this wallet.</p>
    </div>
    `,
    methods: {
        currentValue(purchase) {
            const rate = this.prices[purchase.currency];
            if (!rate) return null;
            return purchase.amount * parseFloat(rate.EUR);
        },
        gain(purchase) {
            const value = this.currentValue(purchase);
            if (value === null) return 0;
            return ((value - purchase.price) / purchase.price) * 100;
        }
    }
})
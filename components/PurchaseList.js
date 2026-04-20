app.component('purchase-list', {
    props: {
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
        <h3>All Purchases</h3>
        <ul>
            <li v-for="purchase in purchases" :key="purchase.id">
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
                <span v-else>No price data available</span>
                &mdash;
                <button @click="$emit('delete-purchase', purchase.id)">Delete</button>
            </li>
        </ul>
        <p v-if="purchases.length === 0">No purchases yet.</p>
    </div>
    `,
    emits: ['delete-purchase'],
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
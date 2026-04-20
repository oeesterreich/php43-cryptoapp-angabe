app.component('purchase-form', {
    props: {
        wallets: {
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
    <div class="wallet-form">
        <h3>Add Purchase</h3>
        <label>Date</label>
        <input type="datetime-local" v-model="date" />
        <label>Currency</label>
        <select v-model="currency" @change="updatePrice">
            <option value="">-- Select currency --</option>
            <option v-for="code in currencyCodes" :key="code" :value="code">{{ code }}</option>
        </select>
        <label>Amount</label>
        <input type="number" v-model="amount" @input="updatePrice" placeholder="e.g. 0.5" step="any" min="0" />
        <label>Price (EUR)</label>
        <input type="number" v-model="price" placeholder="e.g. 30000" step="any" min="0" />
        <label>Wallet</label>
        <select v-model="wallet_id">
            <option :value="null">-- No wallet --</option>
            <option v-for="wallet in wallets" :key="wallet.id" :value="wallet.id">{{ wallet.name }}</option>
        </select>
        <div class="button" :class="{ disabledButton: !isValid }" @click="submitForm">Add to Wallet</div>
    </div>
  `,
    data() {
        return {
            date: '',
            currency: '',
            amount: '',
            price: '',
            wallet_id: null
        }
    },
    computed: {
        currencyCodes() {
            return Object.keys(this.prices).sort();
        },
        isValid() {
            return this.date !== '' && this.currency !== '' &&
                   this.amount > 0 && this.price > 0;
        }
    },
    methods: {
        updatePrice() {
            if (this.currency && this.amount > 0 && this.prices[this.currency]) {
                this.price = (this.amount * parseFloat(this.prices[this.currency].EUR)).toFixed(2);
            }
        },
        submitForm() {
            if (!this.isValid) return;
            this.$emit('add-to-wallet', {
                date: this.date.replace('T', ' ') + ':00',
                currency: this.currency,
                amount: this.amount,
                price: this.price,
                wallet_id: this.wallet_id
            });
            this.date = '';
            this.currency = '';
            this.amount = '';
            this.price = '';
            this.wallet_id = null;
        }
    }
})
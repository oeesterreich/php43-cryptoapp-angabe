app.component('purchase-form', {
    props: {
    },
    template:
    /*html*/
        `
    <div class="wallet-form">
        <h3>Add Purchase</h3>
        <label>Date</label>
        <input type="datetime-local" v-model="date" />
        <label>Currency</label>
        <input type="text" v-model="currency" placeholder="e.g. BTC" />
        <label>Amount</label>
        <input type="number" v-model="amount" placeholder="e.g. 0.5" step="any" min="0" />
        <label>Price</label>
        <input type="number" v-model="price" placeholder="e.g. 30000" step="any" min="0" />
        <div class="button" :class="{ disabledButton: !isValid }" @click="submitForm">Add to Wallet</div>
    </div>
  `,
    data() {
        return {
            date: '',
            currency: '',
            amount: '',
            price: ''
        }
    },
    methods: {
        submitForm() {
            if (!this.isValid) return;
            this.$emit('add-to-wallet', {
                date: this.date.replace('T', ' ') + ':00',
                currency: this.currency,
                amount: this.amount,
                price: this.price
            });
            this.date = '';
            this.currency = '';
            this.amount = '';
            this.price = '';
        }
    },
    computed: {
        isValid() {
            return this.date !== '' && this.currency !== '' &&
                   this.amount > 0 && this.price > 0;
        }
    }
})
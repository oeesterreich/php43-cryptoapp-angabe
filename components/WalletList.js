app.component('wallet-list', {
    props: {
        purchases: {
            type: Array,
            required: true
        }
    },
    template:
    /*html*/
        `
    <div class="wallet-list">
        <h3>My Purchases</h3>
        <ul>
            <li v-for="purchase in purchases" :key="purchase.id">
                <strong>{{ purchase.currency }}</strong> &mdash;
                Amount: {{ purchase.amount }} &mdash;
                Price: {{ purchase.price }} &mdash;
                Date: {{ purchase.date }}
                <button @click="$emit('delete-purchase', purchase.id)">Delete</button>
            </li>
        </ul>
        <p v-if="purchases.length === 0">No purchases yet.</p>
    </div>
    `,
    emits: ['delete-purchase'],
    methods: {

    },
    computed: {

    }
})
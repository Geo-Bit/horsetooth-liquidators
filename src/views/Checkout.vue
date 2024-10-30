<template>
  <div>
    <h2>Checkout</h2>
    <form @submit.prevent="submitOrder">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="customerName" required />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="customerEmail" required />

      <button type="submit">Place Order</button>
    </form>
    <div v-if="orderPlaced">
      <h3>Order placed successfully!</h3>
      <p>Thank you for your order, {{ customerName }}!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
  data() {
    return {
      customerName: '',
      customerEmail: '',
      orderPlaced: false,
    };
  },
  methods: {
    submitOrder() {
      // Simulate placing an order
      this.orderPlaced = true;
      this.$store.commit('clearCart');
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 20px auto;
}
</style>
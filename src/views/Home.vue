<template>
  <div class="home">
    <div class="hero">
      <div class="container">
        <h1>Welcome to Horsetooth Liquidators</h1>
        <p class="tagline">Your source for quality liquidated equipment in Colorado!</p>
        <router-link to="/products" class="btn">View Our Inventory</router-link>
      </div>
    </div>
    
    <div class="container content-section">
      <div class="about-section">
        <h2>Located at the foot of the Rockies</h2>
        <p>Family owned and operated in Fort Collins since 1995, we specialize in 
           quality liquidated equipment at unbeatable prices.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                    url('@/assets/horsetooth.jpg');  /* You'll need to add this image */
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 0;
  text-align: center;
  margin-bottom: 40px;
}

.hero h1 {
  color: white;
  font-size: 2.5em;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.tagline {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.content-section {
  padding: 40px 0;
}

.about-section {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  color: var(--primary-red);
  margin-bottom: 20px;
}
</style>

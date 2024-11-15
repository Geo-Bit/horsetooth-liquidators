<template>
  <div class="home">
    <div class="hero">
      <div class="container">
        <img src="/logo.png" alt="Horsetooth Liquidators Logo" class="hero-logo">
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

      <!-- News & Announcements Section -->
      <div class="announcements">
        <h2>Latest Updates</h2>
        <div class="announcement-grid">
          <div class="announcement-card">
            <h3>Now Hiring: IT Security Specialist</h3>
            <p>Growing company seeks experienced security professional. Competitive salary, flexible hours.</p>
            <router-link to="/careers/security-specialist" class="link">Learn More →</router-link>
          </div>
          <div class="announcement-card">
            <h3>Local Business Award</h3>
            <p>Proud recipient of Fort Collins Chamber of Commerce "Business of the Year" nomination for 2024.</p>
          </div>
          <div class="announcement-card">
            <h3>Community Update</h3>
            <p>Join us this weekend for our monthly "Tech Talk" series featuring vintage computing equipment.</p>
          </div>
        </div>
      </div>

      <!-- Featured Categories -->
      <div class="featured-categories">
        <h2>Specializing In</h2>
        <div class="category-grid">
          <div class="category-card">
            <h3>Vintage Technology</h3>
            <p>From classic computers to retro gadgets</p>
          </div>
          <div class="category-card">
            <h3>Local History</h3>
            <p>Preserving Fort Collins' rich heritage</p>
          </div>
          <div class="category-card">
            <h3>Scientific Equipment</h3>
            <p>Professional-grade instruments</p>
          </div>
        </div>
      </div>

      <!-- Location & Hours -->
      <div class="location-section">
        <h2>Visit Our Showroom</h2>
        <div class="location-grid">
          <div class="hours">
            <h3>Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
          <div class="address">
            <h3>Location</h3>
            <p>1234 Innovation Drive</p>
            <p>Fort Collins, CO 80525</p>
            <p>Near the intersection of Harmony & Timberline</p>
          </div>
        </div>
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
                    url('https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&q=80');
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

.announcement-grid, .category-grid, .location-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 40px 0;
}

.announcement-card, .category-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.announcement-card:hover, .category-card:hover {
  transform: translateY(-5px);
}

.announcement-card h3, .category-card h3 {
  color: var(--secondary-blue);
  margin-bottom: 10px;
}

.link {
  color: var(--primary-red);
  text-decoration: none;
  font-weight: bold;
}

.link:hover {
  text-decoration: underline;
}

.location-section {
  background: #f9f9f9;
  padding: 40px;
  border-radius: 8px;
  margin-top: 40px;
}

.hours, .address {
  padding: 20px;
}

h2 {
  text-align: center;
  color: var(--primary-red);
  margin: 40px 0 20px;
}

h3 {
  color: var(--secondary-blue);
  margin-bottom: 15px;
}

.content-section > div {
  margin-bottom: 60px;
}

@media (max-width: 768px) {
  .announcement-grid, .category-grid, .location-grid {
    grid-template-columns: 1fr;
  }
}

.hero-logo {
  width: auto;
  height: 240px;
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));
}

@media (max-width: 768px) {
  .hero-logo {
    height: 80px;
  }
}
</style>

<template>
  <div class="about">
    <div class="hero">
      <div class="container">
        <h1>About Horsetooth Liquidators</h1>
        <p class="tagline">Bringing Fort Collins' Past into the Present</p>
      </div>
    </div>

    <div class="container content-section">
      <div class="about-grid">
        <!-- Company History -->
        <div class="about-card">
          <h2>Our Story</h2>
          <p>Founded in 1995 by the ambitious Mr. Badger, Horsetooth Liquidators started as a small surplus store 
             in Old Town Fort Collins. Through dedication and an eye for unique finds, we've grown into Northern 
             Colorado's premier liquidation destination.</p>
        </div>

        <!-- Mission -->
        <div class="about-card">
          <h2>Our Mission</h2>
          <p>We believe in preserving and sharing pieces of technological and local history. Each item in our 
             inventory tells a story, from vintage computers that powered early innovations to artifacts that 
             shaped Fort Collins' development.</p>
        </div>

        <!-- Team Section -->
        <div class="about-card team-section">
          <h2>Meet Our Team</h2>
          <div class="team-members">
            <div class="team-member">
              <h3>Mr. Badger</h3>
              <p class="title">CEO & Founder</p>
              <p>"Innovation is about making the most of every opportunity."</p>
            </div>
            <div class="team-member">
              <h3>Sly Fox</h3>
              <p class="title">Lead Systems Administrator</p>
              <p>"Working hard to keep our systems running... please be patient with any technical issues."</p>
            </div>
          </div>
        </div>

        <!-- Recent Updates -->
        <div class="about-card updates-section">
          <h2>Recent Company Updates</h2>
          <ul class="updates-list">
            <li>
              <span class="update-date">March 2024</span>
              <p>Expanding our technical infrastructure to better serve our customers</p>
            </li>
            <li>
              <span class="update-date">February 2024</span>
              <p>Initiated security audit to ensure best practices in our operations</p>
            </li>
            <li>
              <span class="update-date">January 2024</span>
              <p>Celebrated record growth in vintage technology sales</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
                    url('https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&q=80');
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

.about-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  padding: 20px 0;
}

.about-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.team-section {
  grid-column: span 2;
}

.team-members {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.team-member {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
}

.team-member h3 {
  color: var(--secondary-blue);
  margin-bottom: 5px;
}

.team-member .title {
  color: var(--rock-gray);
  font-style: italic;
  margin-bottom: 10px;
}

.updates-section {
  grid-column: span 2;
}

.updates-list {
  list-style: none;
  padding: 0;
}

.updates-list li {
  display: flex;
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.update-date {
  color: var(--rock-gray);
  min-width: 120px;
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .team-section, .updates-section {
    grid-column: span 1;
  }
}
</style> 
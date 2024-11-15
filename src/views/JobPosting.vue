<template>
  <div class="job-posting">
    <div class="hero">
      <div class="container">
        <h1>IT Security Specialist</h1>
        <p class="tagline">Join Our Growing Team</p>
      </div>
    </div>

    <div class="container content-section">
      <div class="job-details">
        <div class="urgent-notice">
          <h3>Immediate Opening</h3>
          <p>Position needs to be filled as soon as possible due to increasing security requirements.</p>
        </div>

        <section class="job-section">
          <h2>About the Role</h2>
          <p>Horsetooth Liquidators is seeking an experienced IT Security Specialist to join our technology team. 
             This position will work closely with our current system administrator to enhance and maintain our 
             e-commerce platform's security infrastructure.</p>
        </section>

        <section class="job-section">
          <h2>Key Responsibilities</h2>
          <ul>
            <li>Conduct regular security audits of our web infrastructure</li>
            <li>Implement and maintain security protocols</li>
            <li>Update legacy systems while maintaining operational stability</li>
            <li>Assist with modernizing our current technology stack</li>
            <li>Provide backup support for our overworked system administrator</li>
            <li>Document and maintain security procedures</li>
          </ul>
        </section>

        <section class="job-section">
          <h2>Required Qualifications</h2>
          <ul>
            <li>3+ years experience in IT security</li>
            <li>Strong knowledge of web application security</li>
            <li>Experience with SQL databases and API security</li>
            <li>Familiarity with legacy system maintenance</li>
            <li>Ability to work under pressure and handle multiple priorities</li>
            <li>Strong problem-solving skills and attention to detail</li>
          </ul>
        </section>

        <section class="job-section">
          <h2>Benefits</h2>
          <ul>
            <li>Competitive salary ($80,000 - $120,000 DOE)</li>
            <li>Flexible work hours</li>
            <li>Health insurance</li>
            <li>401(k) with company match</li>
            <li>Employee discount on vintage equipment</li>
            <li>Paid time off</li>
          </ul>
        </section>

        <section class="job-section application-info">
          <h2>How to Apply</h2>
          <p>Please send your resume and cover letter to:</p>
          <p class="email">careers@horsetoothliquidators.com</p>
          <p class="contact-note">For urgent inquiries, contact Mr. Badger directly at:</p>
          <p class="email">m.badger@horsetoothliquidators.com</p>
          <div class="note-box">
            <p><strong>Note from HR:</strong> Due to the urgent nature of this position, qualified candidates 
            will be contacted promptly. Our current sysadmin (Sly) has been working overtime to keep our 
            systems running smoothly and requires immediate assistance.</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
                    url('https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 80px 0;
  text-align: center;
  margin-bottom: 40px;
}

.tagline {
  color: white;
}

.job-details {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.urgent-notice {
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.job-section {
  margin-bottom: 40px;
}

.job-section h2 {
  color: var(--secondary-blue);
  border-bottom: 2px solid var(--rock-gray);
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.job-section ul {
  list-style-type: none;
  padding-left: 0;
}

.job-section ul li {
  margin-bottom: 10px;
  padding-left: 25px;
  position: relative;
}

.job-section ul li:before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--primary-red);
}

.application-info {
  background: #f9f9f9;
  padding: 30px;
  border-radius: 8px;
}

.email {
  color: var(--secondary-blue);
  font-weight: bold;
  font-size: 1.1em;
  margin: 10px 0;
}

.contact-note {
  margin-top: 20px;
  color: var(--rock-gray);
}

.note-box {
  background: white;
  border-left: 4px solid var(--primary-red);
  padding: 20px;
  margin-top: 30px;
  border-radius: 0 8px 8px 0;
}

@media (max-width: 768px) {
  .job-details {
    padding: 10px;
  }
  .hero {
    margin-top: 60px;
  }
}
</style> 
# Horsetooth Liquidators CTF Challenges
The following challenges were part of our Holiday Capture The Flag (CTF) event.

## Backup Protocol (25pts)

### Vulnerability
CWE-312: Cleartext Storage of Sensitive Information.

### Description
Our overworked admin Sly has been cutting corners with the company's backup procedures. After gaining access to the admin dashboard, you've noticed some concerning logs about database backups being stored in a public cloud bucket. Maybe there's something interesting in there? As Thumper, your next task is to find and crack any exposed credentials.

Note: Submit sly_fox's password as the flag with the format noco{password}

### Flag
noco{clever_fox_123}

## Admin Access Requires (75pts)

### Vulnerability
CWE-347: Improper Verification of Cryptographic Signature.

### Description
"Hey rookie_raccoon, I need you to update some inventory numbers," Sly called out. "Just use your regular account - we'll get you admin access later."

Sly muttered under his breath: "These JWT tokens are supposed to be secure, but I keep telling them not to trust client-side data..."

Note: Submit the flag found in the admin API documentation as noco{...}

### Flag
noco{3d35e2b64d5300c61c179814a9ca2460}

## Inventory Overflow (50pts)
### Vulnerability
CWE-20: Improper Input Validation

### Description
"The inventory system is a mess!" Sly groaned, staring at his screen. "rookie_raccoon implemented it without any input validation, and now Mr. Badger wants new features added..." Thumper noticed the inventory numbers seemed a bit too flexible.

Note: Submit any flag you find in the format noco{...} 

### Flag
noco{8f7d2a1e4c6b9f3a5d8e2c7b4f1a9e6d}

## Rookie Mistake (25pts)

### Vulnerability
CWE-312: Cleartext Storage of Sensitive Information

### Description
"I keep telling rookie_raccoon not to leave debug information in the code," Sly muttered, rubbing his tired eyes. "At least the password is hashed... but knowing our junior dev, they probably used a common password."

Note: Submit rookie_raccoon's password as the flag with the format noco{password}

Use the attached wordlist.txt to crack the hash!

### Flag
noco{trash_panda_123}

## Order Up! (50pts)

### Vulnerability
CWE-639: Authorization Bypass Through User-Controlled Key.

### Description
"Orders are piling up faster than I can handle them!" Sly exclaimed, frantically implementing a new order tracking system to meet Mr. Badger's demands. Between server maintenance and endless feature requests, proper security took a backseat. Can you help Thumper investigate the order history system and find what Sly was too overwhelmed to secure?

Note: Submit any flag you find in the format noco{...} 

### Flag
noco{7b4d8e2f1a9c6b3d5e8f2a1b4c7d9e6a}

## Confused Fox (25pts) 
### Vulnerability 
CWE-74: Improper Neutralization of Special Elements in Output Used by a Downstream Component ("Injection")

### Description
While reviewing the customer support features, you notice a chatbot named "Sly" helping customers. In his commit message, Sly (the developer) noted:

    "Added a friendly chatbot to help customers... *yawns* 
    Hope I didn't make him too chatty. Just need to make sure 
    he doesn't get confused by weird inputs..."

Sly's sleep-deprived coding sessions strike again. Maybe his chatbot assistant isn't as robust as he thinks?

Note: Submit any flag you find in the format noco{...} 

### Flag
noco{3a8f1c9d2e5b7f4a6d0c8e2b9a3f1d5}

## Late Night Easter Egg (25pts) 
### Vulnerability
CWE-312: Cleartext Storage of Sensitive Information 

### Description
During your initial scan of the website, you intercept a late-night commit message from Sly:

    commit 3a8f1e2
    Date: Tue Feb 13 02:47 AM 2024
    "Can't sleep, might as well make the boring stuff more fun... *yawns* 
    Added some retro vibes to that one page nobody likes seeing. 
    At least now it's entertaining while being unhelpful!"

Sly's sleep-deprived coding sessions might be worth investigating. What "boring" page did he decide to spruce up, and what secrets might he have left behind?

Note: Submit any flag you find in the format noco{...} 

### Flag
noco{7d48af9e1b5c8f2d36a0e4x9n2p5q7r}

## Support Ticket Snooping (100pts) 
### Vulnerability
CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')

### Description
During your initial review of Horsetooth Liquidators' e-commerce platform, you notice their product review system has an interesting feature - customers can create support tickets directly through reviews. Sly mentioned he quickly implemented this to help manage customer support requests, but he's been too overwhelmed to properly secure it.

"Yeah, the support ticket system... *yawns* I added that last month when Mr. Badger demanded a quicker way to handle customer issues," Sly explains, his tired eyes barely focusing on the screen. "I know I should've spent more time on input validation, but there were three other urgent features Mr. Badger needed that week..."

Can you demonstrate to Mr. Badger why rushing security-critical features is dangerous by finding and exploiting a vulnerability in the support ticket system?

Note: Submit any flag you find in the format noco{...} 

### Flag
noco{3b1b11d6f84e53d3c99327b324f506d9}
export const MESSAGES_DATA = {
  'rookie_raccoon': {
    inbox: [
      {
        id: 1,
        from: 'sly_fox',
        subject: 'Welcome to the Team!',
        content: 'Hey Rookie! Welcome to your summer internship at Horsetooth Liquidators. I\'ll be your mentor for the API development work. Looking forward to working with you on modernizing our backend services. Let\'s catch up tomorrow morning to go over the project scope.',
        date: '2024-03-15T10:30:00'
      },
      {
        id: 2,
        from: 'sly_fox',
        subject: 'RE: API Documentation',
        content: 'Good start on the API docs! I noticed you\'ve disabled token validation for testing - that\'s fine for now, but we\'ll need to review security best practices before pushing to production. Keep up the good work!',
        date: '2024-03-14T15:45:00'
      },
      {
        id: 3,
        from: 'mr_badger',
        subject: 'Development Environment Setup',
        content: 'Hi rookie_raccoon, hope you\'re settling in well! I\'ve set up your development environment and granted you access to our test APIs. Let sly_fox know if you need any help with the JWT implementation.',
        date: '2024-03-13T09:15:00'
      }
    ],
    outbox: [
      {
        id: 4,
        to: 'sly_fox',
        subject: 'Question about Admin Dashboard API',
        content: 'Hey sly_fox, I\'ve implemented the admin dashboard endpoint as requested. Should we be filtering out sensitive data in the response? Also, the token validation is still in testing mode - let me know when you want to review this.',
        date: '2024-03-14T11:30:00'
      }
    ]
  }
  // Add more users as needed
} 
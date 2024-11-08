export const MESSAGES_DATA = {
  'rookie_raccoon': {
    inbox: [
      {
        id: 1,
        from: 'mr_badger',
        subject: 'Server Room Access',
        content: 'Hey rookie, the access code to the server room is still 1234. Don\'t forget to change it next week!',
        date: '2024-03-15T10:30:00'
      },
      {
        id: 2,
        from: 'sly_fox',
        subject: 'RE: Backup Schedule',
        content: 'Thanks for setting up the backup schedule. Remember our AWS access key is AKIA1234EXAMPLE. Keep it safe!',
        date: '2024-03-14T15:45:00'
      }
    ],
    outbox: [
      {
        id: 3,
        to: 'sly_fox',
        subject: 'Database Credentials',
        content: 'Here are the staging DB credentials you asked for: user=admin, pass=staging123',
        date: '2024-03-13T09:15:00'
      }
    ]
  }
  // Add more users as needed
} 
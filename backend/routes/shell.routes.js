const express = require('express')
const router = express.Router()

// Predefined safe commands and responses
const COMMANDS = {
    'help': () => {
        return Object.entries(COMMANDS)
            .map(([cmd, info]) => `${cmd.padEnd(15)} - ${info.description}`)
            .join('\n')
    },
    'ls': {
        description: 'List files in current directory',
        response: `drwxr-xr-x  2 mr_badger mr_badger 4096 Nov 19 12:00 .
drwxr-xr-x 15 root     root     4096 Nov 19 12:00 ..
-rw-------  1 mr_badger mr_badger  220 Nov 19 12:00 .bash_logout
-rw-------  1 mr_badger mr_badger 3526 Nov 19 12:00 .bashrc
-rw-r--r--  1 mr_badger mr_badger   33 Nov 19 12:00 notes.txt
-rw-------  1 mr_badger mr_badger   41 Nov 19 12:00 .secret`
    },
    'whoami': {
        description: 'Show current user',
        response: 'mr_badger'
    },
    'pwd': {
        description: 'Print working directory',
        response: '/home/mr_badger'
    },
    'cat notes.txt': {
        description: 'Read personal notes',
        response: `TODO: Change password from Kj8#mP9$nQ2
Reminder: Security audit next week
Note: Must fix file upload vulnerability in admin panel`
    },
    'cat .secret': {
        description: 'Access denied',
        response: 'Permission denied: Only mr_badger can read this file'
    },
    'id': {
        description: 'Print user identity',
        response: 'uid=1000(mr_badger) gid=1000(mr_badger) groups=1000(mr_badger),27(sudo)'
    }
}

router.get('/terminal', (req, res) => {
    const cmd = req.query.cmd

    if (!cmd) {
        return res.json({ output: 'Type "help" for available commands' })
    }

    const command = COMMANDS[cmd]
    if (!command) {
        return res.json({ 
            output: `Command not found: ${cmd}\nType "help" for available commands` 
        })
    }

    const output = typeof command === 'function' 
        ? command()
        : command.response

    res.json({ output })
})

module.exports = router 
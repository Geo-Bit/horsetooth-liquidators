<?php
header('Content-Type: text/plain');

// Predefined safe commands
$allowed_commands = [
    'help' => 'Show this help message',
    'ls' => 'List files in current directory',
    'whoami' => 'Show current user',
    'pwd' => 'Print working directory',
    'cat notes.txt' => 'Read personal notes',
    'cat .secret' => 'Access denied',
    'id' => 'Print user identity'
];

$command = isset($_GET['cmd']) ? trim($_GET['cmd']) : 'help';

// Command responses
$responses = [
    'ls' => "drwxr-xr-x  2 mr_badger mr_badger 4096 Nov 19 12:00 .\ndrwxr-xr-x 15 root     root     4096 Nov 19 12:00 ..\n-rw-------  1 mr_badger mr_badger  220 Nov 19 12:00 .bash_logout\n-rw-------  1 mr_badger mr_badger 3526 Nov 19 12:00 .bashrc\n-rw-r--r--  1 mr_badger mr_badger   33 Nov 19 12:00 notes.txt\n-rw-------  1 mr_badger mr_badger   41 Nov 19 12:00 .secret",
    'whoami' => "mr_badger",
    'pwd' => "/home/mr_badger",
    'cat notes.txt' => "TODO: Change password from Kj8#mP9\$nQ2\nReminder: Security audit next week",
    'cat .secret' => "Permission denied",
    'id' => "uid=1000(mr_badger) gid=1000(mr_badger) groups=1000(mr_badger),27(sudo)"
];

if ($command === 'help') {
    echo "Available commands:\n\n";
    foreach ($allowed_commands as $cmd => $desc) {
        echo sprintf("%-15s %s\n", $cmd, $desc);
    }
} elseif (isset($responses[$command])) {
    echo $responses[$command] . "\n";
} else {
    echo "Command not found: $command\n";
    echo "Type 'help' for available commands\n";
}
?> 
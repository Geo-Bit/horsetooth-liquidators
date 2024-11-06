const bcrypt = require('bcrypt');

async function generateHash(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log(`Password: ${password}`);
    console.log(`Hash: ${hash}\n`);
}

// Generate hashes for all passwords
async function generateAllHashes() {
    await generateHash('Kj8#mP9$nQ2');  // mr_badger
    await generateHash('Rx5#vL9$tM4');  // sly_fox
    await generateHash('trash_panda123'); // rookie_raccoon
}

generateAllHashes(); 
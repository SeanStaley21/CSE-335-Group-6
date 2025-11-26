import bcrypt from 'bcrypt';

// Generate password hashes for the sample users
const passwords = {
  'mohamed_muse': 'mohamedMuse',
  'inesh_rajwade': 'ineshRajwade',
  'sean_staley': 'seanStaley'
};

async function generateHashes() {
  console.log('Generating password hashes...\n');
  
  for (const [username, password] of Object.entries(passwords)) {
    const hash = await bcrypt.hash(password, 12);
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log(`Hash: ${hash}\n`);
  }
}

generateHashes();

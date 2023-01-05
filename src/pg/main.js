const { Client } = require('pg');
const program = require('commander');
const prompts = require('prompts');

async function connect() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'myuser',
    password: 'mypass',
    database: 'fc21'
  });
  await client.connect();
  return client;
}

program.version('0.0.1')

// add
program
.command('add')
.action( async () => {
  const client = await connect();

  const userName = await prompts({
    type: 'text',
    name: 'userName',
    message: 'What is the user name?'
  });

  const res = await client.query('INSERT INTO users (name) VALUES ($1)', [userName.userName]);
  console.log(res);
  await client.end();
});

// remove
program
.command('remove')
.action( async () => {
  const client = await connect();

  const userName = await prompts({
    type: 'text',
    name: 'userName',
    message: 'What is the user name?'
  });

  const res = await client.query('DELETE FROM users WHERE name = $1::text', [userName.userName]);
  console.log(res);
  await client.end();
});

// list
program
.command('list')
.action( async () => {
  const client = await connect();
  const res = await client.query('SELECT * FROM users');
  console.log(res.rows);
  await client.end();
});

program.parse(process.argv);
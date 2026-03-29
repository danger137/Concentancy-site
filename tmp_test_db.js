const { Client } = require('pg');
const connectionString = "postgresql://neondb_owner:npg_fDRN7hoMk2Bb@ep-square-silence-aitwgaim-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function test() {
    const client = new Client({ connectionString });
    try {
        console.log('Connecting to:', connectionString.replace(/:[^:]+@/, ':****@'));
        await client.connect();
        console.log('Successfully connected!');
        const res = await client.query('SELECT count(*) FROM "SuccessStory"');
        console.log('Count:', res.rows[0].count);
    } catch (err) {
        console.error('Connection failed:', err.message);
    } finally {
        await client.end();
    }
}

test();

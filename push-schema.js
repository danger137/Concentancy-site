const { execSync } = require('child_process');

try {
    console.log("Starting prisma db push...");
    execSync('npx prisma db push --schema prisma/schema.prisma --accept-data-loss', {
        stdio: 'inherit',
        env: { ...process.env, PRISMA_HIDE_UPDATE_MESSAGE: '1' }
    });
    console.log("Success!");
} catch (err) {
    console.error("Error occurred!");
    console.error("Status:", err.status);
    console.error(err.message);
}

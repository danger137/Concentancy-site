
const { PrismaClient } = require('./src/lib/generated/client_new');
const prisma = new PrismaClient();

async function main() {
    const team = await prisma.teamMember.findMany();
    console.log('TEAM_MEMBERS_COUNT:', team.length);
    console.log('TEAM_MEMBERS:', JSON.stringify(team, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });

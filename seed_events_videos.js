const { PrismaClient } = require('./src/lib/generated/client_v2');

// Retry helper for Neon cold starts
async function withRetry(fn, retries = 5, delayMs = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      const msg = err?.message || '';
      const isRetryable = msg.includes("Can't reach database") || msg.includes('Timed out');
      if (!isRetryable || i === retries - 1) throw err;
      console.log(`⏳ Attempt ${i + 1} failed. Retrying in ${delayMs / 1000}s... (Neon might be waking up)`);
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
}

async function seed() {
  // Load .env
  try { require('dotenv').config(); } catch (e) {}

  // Use DIRECT_URL and add longer timeout
  let url = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (url && !url.includes('connect_timeout=')) {
    url += (url.includes('?') ? '&' : '?') + 'connect_timeout=60';
  } else if (url) {
    url = url.replace(/connect_timeout=\d+/, 'connect_timeout=60');
  }

  console.log('🔌 Connecting to:', url?.includes('-pooler') ? 'Pooled' : 'Direct');

  const prisma = new PrismaClient(url ? { datasourceUrl: url } : undefined);

  try {
    console.log('🌱 Seeding Events and Videos...\n');

    // 1. Seed Videos
    console.log('  🗑️  Clearing old videos...');
    await prisma.video.deleteMany({});

    const videos = [
      { title: 'Student Success Story', url: '/img/student.mp4', thumbnail: '/img/student_1.png', country: 'STUDENT' },
      { title: 'Visit Visa Guidance', url: '/img/visit.mp4', thumbnail: '/img/visit_visa_service.png', country: 'VISIT' },
      { title: 'Study in Europe', url: '/img/european_countries.mp4', thumbnail: '/img/event_europe.png', country: 'EUROPE' }
    ];

    for (const v of videos) {
      await withRetry(async () => {
        await prisma.video.create({ data: v });
        console.log(`  ✅ Synced video: ${v.title}`);
      });
    }

    // 2. Seed Events
    const events = [
      {
        title: 'UK Education Fair 2025',
        description: 'Meet representatives from top UK universities. Get on-the-spot assessment and scholarship guidance.',
        image: '/img/event_uk.png',
        time: '11:00 AM - 05:00 PM', location: 'Serena Hotel, Faisalabad',
        date: '15 March, 2025', dayLabel: 'DAY 1', dayId: 'day1',
        color: 'bg_green', textWhite: true
      },
      {
        title: 'European Study Seminar',
        description: 'Explore affordable study options in Romania, Hungary, and Malta. Free visa consultation.',
        image: '/img/event_europe.png',
        time: '02:00 PM - 06:00 PM', location: 'Infinity Office, Kohinoor Rd',
        date: '20 March, 2025', dayLabel: 'DAY 2', dayId: 'day2',
        color: 'bg_oran', textWhite: true
      }
    ];

    for (const e of events) {
      await withRetry(async () => {
        const existing = await prisma.event.findFirst({ where: { title: e.title } });
        if (existing) {
          await prisma.event.update({ where: { id: existing.id }, data: e });
          console.log(`  ✅ Updated event: ${e.title}`);
        } else {
          await prisma.event.create({ data: e });
          console.log(`  ✅ Created event: ${e.title}`);
        }
      });
    }

    console.log('\n🚀 Seeding complete!');
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    console.error('\n💡 Tip: Go to https://console.neon.tech and make sure your project is Active.');
  } finally {
    await prisma.$disconnect();
  }
}

seed();

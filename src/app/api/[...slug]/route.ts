import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';
import { v2 as cloudinary } from 'cloudinary';
import { deleteFromCloudinary } from '@/lib/cloudinary';
import path from 'path';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function verifyAdmin(req: NextRequest) {
    const adminAuth = req.cookies.get('admin_auth');
    return adminAuth?.value === 'true';
}

const FALLBACK_SETTINGS = {
    email: 'Infinityconsultantsfsd@gmail.com',
    phone: '+92 326 4571906',
    location: 'Mazzanine floor, Media com plaza, Office No. 63, 64 Kohinoor Rd, Faisalabad'
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const fullPath = slug.join('/');

    // Handle /api/blogs
    if (fullPath === 'blogs') {
        try {
            const { searchParams } = new URL(req.url);
            const q = searchParams.get('q') || "";
            const cat = searchParams.get('cat') || "";
            const id = searchParams.get('id');

            if (id) {
                const blog = await prisma.blog.findUnique({ where: { id } });
                return NextResponse.json(blog);
            }

            const blogs = await prisma.blog.findMany({
                where: {
                    OR: [
                        { title: { contains: q, mode: 'insensitive' } },
                        { category: { contains: q || cat, mode: 'insensitive' } },
                        { description: { contains: q, mode: 'insensitive' } }
                    ]
                },
                orderBy: { createdAt: 'desc' }
            });
            return NextResponse.json(blogs, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } });
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }

    // Handle /api/events
    if (fullPath === 'events') {
        const { searchParams } = new URL(req.url);
        const dayId = searchParams.get('dayId');
        try {
            const events = await prisma.event.findMany({
                where: dayId ? { dayId } : {},
                orderBy: { createdAt: 'asc' },
            });
            return NextResponse.json(events, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } });
        } catch (e: any) {
            console.error('Events API Error:', e);
            return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 });
        }
    }

    // Handle /api/services
    if (fullPath === 'services') {
        try {
            const services = await prisma.service.findMany({ orderBy: { createdAt: 'asc' } });
            return NextResponse.json(services, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } });
        } catch (e: any) {
            console.error('Services API Error:', e);
            return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 });
        }
    }

    // Handle /api/team
    if (fullPath === 'team') {
        try {
            const team = await prisma.teamMember.findMany({ orderBy: { createdAt: 'asc' } });
            return NextResponse.json(team, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } });
        } catch (e: any) {
            console.error('Team API Error:', e);
            return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 });
        }
    }

    // Handle /api/settings
    if (fullPath === 'settings') {
        try {
            let settings = await prisma.siteSetting.findUnique({ where: { id: 'default' } });
            if (!settings) settings = await prisma.siteSetting.create({ data: { id: 'default' } });
            return NextResponse.json(settings, { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120' } });
        } catch (e: any) {
            console.error('Settings API Error:', e);
            return NextResponse.json(FALLBACK_SETTINGS, { headers: { 'Cache-Control': 'public, s-maxage=10' } });
        }
    }

    // Handle /api/admin/tools
    if (fullPath === 'admin/tools') {
        if (!await verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        const { searchParams } = new URL(req.url);
        const action = searchParams.get('action');
        try {
            if (action === 'subscribers') {
                const data = await prisma.subscriber.findMany();
                return NextResponse.json(data);
            }
            if (action === 'settings') {
                const data = await prisma.siteSetting.findFirst();
                return NextResponse.json(data);
            }
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        } catch (e: any) {
            console.error('Admin Tools API Error:', e);
            return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 });
        }
    }

    // Handle /api/admin/cms/[...slug]
    if (fullPath.startsWith('admin/cms/')) {
        if (!await verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        const cmsSlug = slug.slice(2);
        const [entity, id] = cmsSlug;
        try {
            if (id) {
                const data = await (prisma as any)[entity].findUnique({ where: { id } });
                return data ? NextResponse.json(data) : NextResponse.json({ error: 'Not found' }, { status: 404 });
            }
            const data = await (prisma as any)[entity].findMany({ orderBy: { createdAt: 'desc' } });
            return NextResponse.json(data);
        } catch (e: any) {
            console.error('Admin CMS API Error:', e);
            return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 });
        }
    }

    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const fullPath = slug.join('/');

    // Handle /api/subscribe
    if (fullPath === 'subscribe') {
        try {
            const { email } = await req.json();
            if (!email || !email.includes('@')) return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });

            // Using create instead of upsert for better reliability on simple models
            const existing = await prisma.subscriber.findUnique({ where: { email } });
            if (existing) return NextResponse.json({ error: 'You are already subscribed to our newsletter.' }, { status: 400 });

            await prisma.subscriber.create({ data: { email } });
            return NextResponse.json({ success: true, message: 'You have been subscribed successfully! 🎉' });
        } catch (error: any) {
            console.error('Subscribe Error:', error);
            if (error.code === 'P2002') return NextResponse.json({ error: 'You are already subscribed to our newsletter.' }, { status: 400 });
            return NextResponse.json({ error: 'Server error. Please try again later.' }, { status: 500 });
        }
    }

    // Handle /api/contact
    if (fullPath === 'contact') {
        try {
            const body = await req.json();
            const { name, email, phone, subject, message } = body;
            if (!name || !email || !phone || !message) return NextResponse.json({ error: 'Fields required.' }, { status: 400 });

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com', port: 465, secure: true,
                auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
            });
            const logoPath = path.join(process.cwd(), 'public', 'infnity2.0.jpeg');
            await transporter.sendMail({
                from: `"Infinity Overseas Contact" <${process.env.EMAIL_USER}>`,
                to: 'dangerchamp2@gmail.com',
                subject: `📧 Contact: ${subject || 'No Subject'} — From ${name}`,
                attachments: [{ filename: 'logo.jpg', path: logoPath, cid: 'logo' }],
                html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Message: ${message}</p>`,
            });
            return NextResponse.json({ success: true, message: 'Sent!' });
        } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
    }

    // Handle /api/consultation
    if (fullPath === 'consultation') {
        try {
            const body = await req.json();
            const { 
                firstName, lastName, email, phone, 
                lastQualification, preferredCountry, fieldOfInterest, 
                languageTest, modeOfCounselling, modeOfFunding 
            } = body;
            
            if (!firstName || !email || !phone) return NextResponse.json({ error: 'Fields required.' }, { status: 400 });

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com', port: 465, secure: true,
                auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
            });
            const logoPath = path.join(process.cwd(), 'public', 'Infinity-Logo-new.jpg');

            const htmlTemplate = `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #eef2f7; border-radius: 16px; overflow: hidden; background-color: #f8fafc; padding: 20px;">
                    <div style="background: #ffffff; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
                        <img src="cid:logo" alt="Infinity Overseas" style="height: 80px; width: auto; margin-bottom: 20px;">
                        <div style="width: 60px; height: 4px; background: #FF7700; margin: 0 auto 30px;"></div>
                        <h2 style="color: #07294d; font-size: 28px; margin: 0; font-weight: 700;">New Consultation Request</h2>
                        <p style="color: #64748b; font-size: 14px; margin-top: 10px;">Deep-dive Assessment for ${firstName} ${lastName}</p>
                    </div>
                    <div style="padding: 40px; background: #ffffff; border-radius: 0 0 12px 12px; border-top: 1px solid #f1f5f9;">
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div>
                                <p style="margin: 0; color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase;">FULL NAME</p>
                                <p style="margin: 5px 0 0; color: #07294d; font-size: 16px; font-weight: 600;">${firstName} ${lastName}</p>
                            </div>
                            <div>
                                <p style="margin: 0; color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase;">PHONE / WHATSAPP</p>
                                <p style="margin: 5px 0 0; color: #334155; font-size: 16px;">${phone}</p>
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div>
                                <p style="margin: 0; color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase;">EMAIL ADDRESS</p>
                                <p style="margin: 5px 0 0; color: #334155; font-size: 15px;">${email}</p>
                            </div>
                            <div>
                                <p style="margin: 0; color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase;">LAST QUALIFICATION</p>
                                <p style="margin: 5px 0 0; color: #334155; font-size: 15px;">${lastQualification || 'N/A'}</p>
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div>
                                <p style="margin: 0; color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase;">PREFERRED COUNTRY</p>
                                <p style="margin: 5px 0 0; color: #07294d; font-size: 15px; font-weight: 600;">${preferredCountry || 'N/A'}</p>
                            </div>
                            <div>
                                <p style="margin: 0; color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase;">FIELD OF INTEREST</p>
                                <p style="margin: 5px 0 0; color: #334155; font-size: 15px;">${fieldOfInterest || 'N/A'}</p>
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div>
                                <p style="margin: 0; color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase;">LANGUAGE TEST</p>
                                <p style="margin: 5px 0 0; color: #334155; font-size: 15px;">${languageTest || 'N/A'}</p>
                            </div>
                            <div>
                                <p style="margin: 0; color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase;">COUNSELLING MODE</p>
                                <p style="margin: 5px 0 0; color: #334155; font-size: 15px;">${modeOfCounselling || 'N/A'}</p>
                            </div>
                        </div>

                        <div style="margin-bottom: 25px;">
                            <p style="margin: 0; color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase;">FUNDING SOURCE</p>
                            <p style="margin: 5px 0 0; color: #334155; font-size: 15px; background: #fef3c7; color: #92400e; padding: 10px 15px; border-radius: 8px; font-weight: 600; display: inline-block;">${modeOfFunding || 'N/A'}</p>
                        </div>
                    </div>
                    <div style="text-align: center; padding: 20px; color: #94a3b8; font-size: 12px;">
                        © 2025 Infinity Overseas Consultants. Faisalabad, Pakistan.
                    </div>
                </div>
            `;

            await transporter.sendMail({
                from: `"Infinity Overseas Website" <${process.env.EMAIL_USER}>`,
                to: 'dangerchamp2@gmail.com',
                subject: `🎯 Consultation Request — ${firstName} ${lastName}`,
                attachments: [{ filename: 'logo.jpg', path: logoPath, cid: 'logo' }],
                html: htmlTemplate,
            });
            return NextResponse.json({ success: true, message: 'Sent!' });
        } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
    }

    // Handle /api/admin/auth
    if (fullPath === 'admin/auth') {
        const { searchParams } = new URL(req.url);
        const action = searchParams.get('action');
        const body = await req.json();
        try {
            if (action === 'login') {
                const { email, password } = body;
                const admin = await prisma.adminUser.findUnique({ where: { email } });
                if (admin && admin.password === password) {
                    const response = NextResponse.json({ success: true });
                    // Set httpOnly to false so client-side code can verify the cookie in the layout/middleware
                    response.cookies.set('admin_auth', 'true', {
                        httpOnly: false,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                        path: '/',
                        maxAge: 86400
                    });
                    return response;
                }
                return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
            }
            if (action === 'forgot-password') {
                const { email } = body;
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                await prisma.adminUser.update({ where: { email }, data: { otp, otpExpiry: new Date(Date.now() + 600000) } });
                const transporter = nodemailer.createTransport({
                    service: 'gmail', auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
                });
                await transporter.sendMail({
                    from: process.env.EMAIL_USER, to: email, subject: 'OTP', text: `OTP: ${otp}`,
                });
                return NextResponse.json({ success: true });
            }
            if (action === 'verify-otp') {
                const { email, otp } = body;
                const admin = await prisma.adminUser.findUnique({ where: { email } });
                if (admin && admin.otp === otp && admin.otpExpiry && admin.otpExpiry > new Date()) return NextResponse.json({ success: true });
                return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
            }
            if (action === 'reset-password') {
                const { email, otp, newPassword } = body;
                const admin = await prisma.adminUser.findUnique({ where: { email } });
                if (admin && admin.otp === otp && admin.otpExpiry && admin.otpExpiry > new Date()) {
                    await prisma.adminUser.update({ where: { email }, data: { password: newPassword, otp: null, otpExpiry: null } });
                    return NextResponse.json({ success: true });
                }
                return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
            }
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        } catch (e: any) {
            console.error('Admin Auth Error:', e);
            return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 });
        }
    }

    // Handle /api/admin/tools
    if (fullPath === 'admin/tools') {
        if (!await verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        const { searchParams } = new URL(req.url);
        const action = searchParams.get('action');
        try {
            if (action === 'upload-image') {
                const formData = await req.formData();
                const file = formData.get('file') as File;
                if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });
                const buffer = Buffer.from(await file.arrayBuffer());
                return new Promise<NextResponse>((resolve) => {
                    cloudinary.uploader.upload_stream({ folder: 'education-point' }, (err, res) => {
                        if (err) resolve(NextResponse.json({ error: 'Upload failed' }, { status: 500 }));
                        else resolve(NextResponse.json({ url: res?.secure_url }));
                    }).end(buffer);
                });
            }
            if (action === 'upload-video') {
                const formData = await req.formData();
                const file = formData.get('file') as File;
                if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

                // Maximum size 50MB (optional check, Cloudinary has its own limits too)
                if (file.size > 50 * 1024 * 1024) {
                    return NextResponse.json({ error: 'Video file size must be less than 50MB' }, { status: 400 });
                }

                const buffer = Buffer.from(await file.arrayBuffer());
                return new Promise<NextResponse>((resolve) => {
                    // Important: For video, we MUST set resource_type: "video"
                    cloudinary.uploader.upload_stream({ folder: 'education-point', resource_type: 'video' }, (err, res) => {
                        if (err) resolve(NextResponse.json({ error: 'Upload failed: ' + err.message }, { status: 500 }));
                        else resolve(NextResponse.json({ url: res?.secure_url }));
                    }).end(buffer);
                });
            }
            if (action === 'send-email') {
                const { selectedEmails, subject, message } = await req.json();
                try {
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
                    });

                    const logoPath = path.join(process.cwd(), 'public', 'Infinity-Logo-new.jpg');
                    const htmlTemplate = `
                        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eef2f7; border-radius: 16px; overflow: hidden; background-color: #f8fafc; padding: 20px;">
                            <div style="background: #ffffff; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
                                <img src="cid:logo" alt="Infinity Overseas" style="height: 80px; width: auto; margin-bottom: 20px;">
                                <div style="width: 60px; height: 4px; background: #2ECA7F; margin: 0 auto 30px;"></div>
                                <h2 style="color: #07294d; font-size: 26px; margin: 0; font-weight: 700;">${subject}</h2>
                            </div>
                            <div style="padding: 40px; background: #ffffff; border-radius: 0 0 12px 12px; border-top: 1px solid #f1f5f9; line-height: 1.6; color: #334155;">
                                <div style="font-size: 16px;">
                                    ${message.replace(/\n/g, '<br>')}
                                </div>
                            </div>
                            <div style="padding: 25px; text-align: center; font-size: 13px; color: #94a3b8;">
                                <p style="margin: 0;"><strong>Infinity Overseas Consultants</strong></p>
                                <p style="margin: 5px 0;">Mazzanine floor, Media com plaza, Kohinoor Rd, Faisalabad</p>
                                <p style="margin: 5px 0;">Phone: +92 326 4571906</p>
                                <div style="margin-top: 15px;">
                                    <a href="#" style="color: #2ECA7F; text-decoration: none; margin: 0 10px;">Website</a> • 
                                    <a href="#" style="color: #2ECA7F; text-decoration: none; margin: 0 10px;">Instagram</a> • 
                                    <a href="#" style="color: #2ECA7F; text-decoration: none; margin: 0 10px;">LinkedIn</a>
                                </div>
                                <p style="margin-top: 20px; font-size: 11px; opacity: 0.7;">You received this because you subscribed to our newsletter.</p>
                            </div>
                        </div>
                    `;

                    await transporter.sendMail({
                        from: `"Infinity Overseas" <${process.env.EMAIL_USER}>`,
                        to: selectedEmails.join(', '),
                        subject: subject,
                        html: htmlTemplate,
                        attachments: [{
                            filename: 'logo.jpg',
                            path: logoPath,
                            cid: 'logo'
                        }]
                    });
                    return NextResponse.json({ success: true });
                } catch (emailErr: any) {
                    console.error('SMTP Error:', emailErr);
                    return NextResponse.json({ error: `SMTP Error: ${emailErr.message}` }, { status: 500 });
                }
            }
            if (action === 'settings') {
                const body = await req.json();
                const existing = await prisma.siteSetting.findFirst();
                const data = existing
                    ? await prisma.siteSetting.update({ where: { id: existing.id }, data: body })
                    : await prisma.siteSetting.create({ data: body });
                return NextResponse.json(data);
            }
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        } catch (e: any) {
            console.error('Admin Tools POST Error:', e);
            return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 });
        }
    }

    // Handle /api/admin/cms/[...slug]
    if (fullPath.startsWith('admin/cms/')) {
        if (!await verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        const cmsSlug = slug.slice(2);
        const [entity] = cmsSlug;
        try {
            const body = await req.json();
            const data = await (prisma as any)[entity].create({ data: body });
            return NextResponse.json(data);
        } catch (e: any) {
            console.error('Admin CMS POST Error:', e);
            return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 });
        }
    }

    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
    if (!await verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { slug } = await params;
    const fullPath = slug.join('/');

    if (fullPath.startsWith('admin/cms/')) {
        const cmsSlug = slug.slice(2);
        const [entity, id] = cmsSlug;
        try {
            const body = await req.json();
            if (['blog', 'teamMember', 'service', 'successStory', 'event'].includes(entity)) {
                const old = await (prisma as any)[entity].findUnique({ where: { id } });
                if (old?.image && body.image && old.image !== body.image && old.image.includes('cloudinary.com')) {
                    await deleteFromCloudinary(old.image);
                }
            }
            const data = await (prisma as any)[entity].update({ where: { id }, data: body });
            return NextResponse.json(data);
        } catch (e: any) {
            console.error('Admin CMS PUT Error:', e);
            return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 });
        }
    }
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
    if (!await verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { slug } = await params;
    const fullPath = slug.join('/');

    if (fullPath.startsWith('admin/cms/')) {
        const cmsSlug = slug.slice(2);
        const [entity, id] = cmsSlug;
        try {
            const old = await (prisma as any)[entity].findUnique({ where: { id } });
            if (old?.image && old.image.includes('cloudinary.com')) await deleteFromCloudinary(old.image);
            await (prisma as any)[entity].delete({ where: { id } });
            return NextResponse.json({ success: true });
        } catch (e: any) {
            console.error('Admin CMS DELETE Error:', e);
            return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 });
        }
    }
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
}

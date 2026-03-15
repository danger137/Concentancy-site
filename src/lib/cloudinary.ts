import crypto from 'crypto';

/**
 * Extracts the public ID from a Cloudinary URL.
 * Example: https://res.cloudinary.com/cloudname/image/upload/v12345/folder/id.jpg -> folder/id
 */
export function getPublicIdFromUrl(url: string): string | null {
    if (!url || !url.includes('cloudinary.com')) return null;

    try {
        const parts = url.split('/');
        const uploadIndex = parts.indexOf('upload');
        if (uploadIndex === -1) return null;

        // Remove version if present (v12345...)
        let relevantPart = parts.slice(uploadIndex + 1);
        if (relevantPart[0].startsWith('v') && !isNaN(Number(relevantPart[0].substring(1)))) {
            relevantPart = relevantPart.slice(1);
        }

        // Join remaining parts and remove extension
        const publicIdWithExt = relevantPart.join('/');
        const lastDot = publicIdWithExt.lastIndexOf('.');
        if (lastDot === -1) return publicIdWithExt;

        return publicIdWithExt.substring(0, lastDot);
    } catch (e) {
        console.error('Error parsing Cloudinary URL:', e);
        return null;
    }
}

/**
 * Deletes an image from Cloudinary using the REST API.
 */
export async function deleteFromCloudinary(url: string) {
    const publicId = getPublicIdFromUrl(url);
    if (!publicId) return { success: false, message: 'Invalid public ID' };

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
        console.error('Cloudinary credentials missing');
        return { success: false, message: 'Credentials missing' };
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = crypto
        .createHash('sha1')
        .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
        .digest('hex');

    const formData = new URLSearchParams();
    formData.append('public_id', publicId);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);

    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();
        return data.result === 'ok' ? { success: true } : { success: false, data };
    } catch (e) {
        console.error('Cloudinary deletion error:', e);
        return { success: false, error: e };
    }
}

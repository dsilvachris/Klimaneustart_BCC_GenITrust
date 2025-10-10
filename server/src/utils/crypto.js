import crypto from 'crypto';

const algorithm = 'aes-256-gcm';
const key = crypto.createHash('sha256').update(String(process.env.PII_ENCRYPTION_KEY || 'dev-secret-key')).digest();

export const encrypt = (plaintext) => {
    if (!plaintext) return '';
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(String(plaintext), 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([iv, tag, encrypted]).toString('base64');
};

export const decrypt = (b64) => {
    if (!b64) return '';
    const buf = Buffer.from(b64, 'base64');
    const iv = buf.subarray(0, 12);
    const tag = buf.subarray(12, 28);
    const data = buf.subarray(28);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
    return decrypted.toString('utf8');
};

export const hash = (input) => {
    return crypto.createHash('sha256').update(String(input)).digest('hex');
};



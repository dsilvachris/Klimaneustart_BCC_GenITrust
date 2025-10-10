import strings from './strings.js';

export const getString = (keyPath, vars = {}) => {
    const keys = keyPath.split('.');
    let value = keys.reduce((acc, key) => acc?.[key], strings);

    // Interpolation if needed
    if (typeof value === 'string') {
        Object.entries(vars).forEach(([k, v]) => {
            // Use a regex with a global flag to replace all occurrences.
            const regex = new RegExp(`{{${k}}}`, 'g');
            value = value.replace(regex, v);
        });
    }

    return value || keyPath; // fallback if key missing
};
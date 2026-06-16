// 1. Swap requires with clean ES Module imports
import { createLogger, format, transports } from 'winston';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url'; // Required to recreate __dirname in ESM

// 2. Recreate __dirname because it is not native to ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 3. Programmatically target and build your report path
const reportDirectory = path.join(__dirname, '../reports');

if (!fs.existsSync(reportDirectory)) {
    fs.mkdirSync(reportDirectory, { recursive: true });
}

// 3. Initialize your Winston instance safely
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => `[${timestamp}] [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        new transports.Console(),
        // Always pass an absolute path using path.join
        new transports.File({ 
            filename: path.join(reportDirectory, 'combined.log') 
        }),
        new transports.File({ 
            filename: path.join(reportDirectory, 'error.log'), 
            level: 'error' 
        })
    ]
});

export default logger;

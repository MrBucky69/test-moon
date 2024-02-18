const http = require('http');
const fs = require('fs');
const crypto = require('crypto');

const hashedEmail = 'bf53377dfc9cf46ac6c78a5301d2260740ffabc6823b277222751c6dc88caac2';
const hashedPassword = 'd598f25945cbfa3e8e446bf03c4bc1b709c98653a9eb70446eb8146983240d2d';

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('login.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Error: 404 - Page not found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.method === 'POST' && req.url === '/') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = new URLSearchParams(body);
            const providedEmail = formData.get('email');
            const providedPassword = formData.get('password');

            const providedEmailHash = crypto.createHash('sha256').update(providedEmail).digest('hex');
            const providedPasswordHash = crypto.createHash('sha256').update(providedPassword).digest('hex');

            if (providedEmailHash === hashedEmail && providedPasswordHash === hashedPassword) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Correct');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Incorrect');
            }
        });
    } else {
        res.writeHead(404);
        res.end('Error: 404 - Page not found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

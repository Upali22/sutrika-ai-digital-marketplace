const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8080;
const ROOT = __dirname;

const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2"
};

const server = http.createServer((req, res) => {
    let requestPath = decodeURIComponent(req.url.split("?")[0]);

    // Open the actual SUTRIKA homepage
    if (requestPath === "/" || requestPath === "") {
        requestPath = "/HTML/index.html";
    }

    const filePath = path.join(ROOT, requestPath);

    // Security check
    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });
            res.end("Not Found");
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[ext] || "application/octet-stream";

        res.writeHead(200, {
            "Content-Type": contentType
        });

        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 SUTRIKA Frontend running on port ${PORT}`);
});
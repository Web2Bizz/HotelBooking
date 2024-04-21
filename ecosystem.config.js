module.exports = { 
    apps: [{
        name: "frontend",
        cwd: "./hotel-booking-client-employee",
        script: './node_modules/vite/bin/vite.js',
        args: '--host 0.0.0.0 --port 4173',
        error_file: "./logs/errors.log",
        out_file: "./logs/out.log",
        port: 4173,
        env: {
            NODE_ENV: "development",
            PORT: 4173
        }
    }, {
        name: "backend",
        cwd: "./hotel-booking-server",
        script: 'app.js',
        error_file: "./logs/errors.log",
        out_file: "./logs/out.log",
        port: 5001,
        env: {
            NODE_ENV: "development",
            PORT: 5001
        }
    }]
}
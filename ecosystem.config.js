module.exports = { 
    apps: [{
        name: "frontend",
        cwd: "./hotel-booking-client-employee",
        script: './node_modules/vite/bin/vite.js',
        args: 'preview --host 0.0.0.0',
        error_file: "./logs/errors.log",
        out_file: "./logs/out.log",
        watch: true,
        env: {
            NODE_ENV: "development",
        }
    }, {
        name: "backend",
        cwd: "./hotel-booking-server",
        script: 'app.js',
        error_file: "./logs/errors.log",
        out_file: "./logs/out.log",
        watch: true,
        env: {
            NODE_ENV: "development",
        }
    }]
}
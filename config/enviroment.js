// Configuring object for development environment

const devlopment={
    name: "devlopment",
    
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: 'shaikhasad9991@gmail.com',
            pass: 'octxaxwxbzmswtbg'
        }
    },

    google_client_id: "686491602603-v8it6o5mjqal7jljnvj5ci2h28mci70c.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback"
}

// TODO Configuration object for production environment (empty for now)

const production = {
    name: "production"
}

// Export the development configuration
module.exports = devlopment

# Password Manager with 2FA

## Introduction

### Overview:

This Password Manager with 2FA is a robust and secure web application built using the MERN stack (MongoDB, Express.js, React, and Node.js). It provides enhanced protection with Two-Factor Authentication (2FA). It offers users a highly secure and convenient platform to store and manage their passwords online.

### Features

* **Two-Factor Authentication**: Enhancing security, the application incorporates 2FA, requiring users to provide two different authentication factors to verify themselves. This significantly reduces the chances of unauthorized access.
* **Secure Password Storage**: Users can add password entries to the manager. Each password is securely encrypted with a user-provided passkey, ensuring data protection and privacy.
* **User-Friendly Interface**: Built with React, the application provides a responsive and intuitive user interface, making it easy for users to interact with their stored data.
* **Backend Integration**: Utilizing Node.js and Express.js, the backend is optimized for performance, handling requests and data management swiftly. MongoDB is used for storing user data and password entries, offering scalability and flexibility in data handling.

### Security

* **Encryption**: The application uses advanced encryption techniques to safeguard user passwords. The encryption key is user-defined, adding an extra layer of security.
* **Data Protection**: We prioritize user data protection, ensuring that all stored information is handled securely and confidentially.

## Instructions on Build

### Requirement:

- Node.js 21(preferred)
- mongodb

### Steps:

1. Clone this project
2. Run `npm install`, this installs dependencies for both frontend and backend.
3. If developing, run `npm run dev`, visit `localhost:5173` to develop
4. To start project, run `npm run build` inside frontend, then run `npm start` in the server folder, visit the app on `localhost:3001`

## MISC

### 1. Proxy setting inside vite

`vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
```

###  2. Environment Variable Example

For server side

```
DB_URI="mongodb://localhost:27017"
RESET_URL=""
JWT_SECRET="secret"
JWT_EXPIRES="300000"
CRYPTO_SECRET_KEY="bf01b27ee9a88d9fec8aeeb34c6928327d4c27ad904e6dc931ef48809f43b828"
CRYPTO_IV_HEX="600d015a1934939cbd925f35ebc75e59"
```

> To generate CRYPTO_SECRET_KEY and CRYPTO_IV_HEX by your self, use following script:
>
> ```js
> const crypto = require('crypto');
> 
> // Generating a 256-bit secret key
> const secretKey = crypto.randomBytes(32); // 32 bytes * 8 bits/byte = 256 bits
> console.log('Secret key:', secretKey.toString('hex'));
> 
> // Generating a 128-bit IV
> const iv = crypto.randomBytes(16); // 16 bytes * 8 bits/byte = 128 bits
> console.log('IV:', iv.toString('hex'));
> ```

For client side

TBD

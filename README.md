Password Manager with 2FA



Developed under Node 21

React + Express + MongoDB

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

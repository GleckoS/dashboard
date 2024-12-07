# **Task Management and Crypto Dashboard**

## **Technologies Used**

- **Framework**: [Next.js](https://nextjs.org/) with TypeScript
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI
- **Charting**: Chart.js with `react-chartjs-2`
- **Styling**: SCSS with Gulp.js for compilation
- **APIs**:
  - [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for tasks.
  - [CoinMarketCap Sandbox API](https://coinmarketcap.com/api/) for cryptocurrency data.
- **HTTP Client**: Axios

---

## **Project Setup**

### **Prerequisites**

1. Node.js (>= 14.x)
2. pnpm
3. A CoinMarketCap API key (sandbox version)

### **Installation**

1. Clone the repository:

```bash
git clone https://github.com/your-username/task-crypto-dashboard.git
cd task-crypto-dashboard
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a .env file in the project root with the following environment variables:

```env
CRYPTO_KEY=b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c
```

4. Install Gulp globally (if not already installed):

```bash
npm install -g gulp-cli
```

5. Compile SCSS to CSS:

```bash
gulp
```

---

## **Usage**

### **Development Server**

Start the development server:

```bash
pnpm dev
```

Open http://localhost:3000 to view the application.

### **Production Build**

Build the project for production:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

---

## **Known issues**

- The CoinMarketCap Sandbox API provides mock data, which may differ from live production data.

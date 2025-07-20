# Task Management System (Laravel + Next.js)

This repository contains a **Laravel API (server)** and a **Next.js client app** for a task management system.

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash

git clone <repository-url>
cd <repository-name>

2. Laravel (Server) Setup

Navigate to the server directory:

cd server

Install Dependencies
composer install

Environment Setup
Copy .env.example to .env:

Update the database credentials in .env.

Set the correct APP_URL (e.g., http://localhost:8005).

Run Laravel Server
php artisan serve --port=8005

If you use a different port, make sure to update the base URL in client-app/src/lib/axios.js (baseURL).

Run Migrations and Seeder
php artisan migrate
php artisan db:seed

3. Next.js (Client App) Setup
Navigate to the client-app directory:
cd ../client-app
npm install

Configure API Base URL
Open src/lib/axios.js.

Update baseURL to point to your Laravel server URL (e.g., http://localhost:8005).

Run Next.js App
npm run dev
By default, the app runs on http://localhost:3000.

4. Sanctum Configuration

If your Next.js port is different from 3000, you must update stateful domains in Laravel Sanctum:

Navigate to server/config/sanctum.php.

Update:
'stateful' => [
    'localhost:3000', // Add your Next.js port if different
],


5. Commands Overview

Laravel Commands:
php artisan serve --port=8005
php artisan migrate
php artisan db:seed

Next.js Commands:
npm run dev


---


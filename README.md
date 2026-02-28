# SaaS Donation Platform

A full-stack donation management platform enabling fundraisers to create campaigns and donors to contribute seamlessly. Built with modern technologies for scalability, security, and exceptional user experience.

## 🚀 Overview

This platform provides a comprehensive solution for managing donations and fundraising campaigns with multi-provider payment integration, real-time notifications, background job processing, and full monitoring capabilities.

## 🏗 Architecture

```
donation_app/
├── backend/          # Express.js API with PostgreSQL
├── frontend/         # Next.js application
└── README.md         # This file
```

## 🛠 Tech Stack

### Backend

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Cache/Queue**: Redis with BullMQ
- **Payments**: Stripe & SSLCommerz
- **Real-time**: Socket.io
- **Monitoring**: Prometheus & Grafana
- **Containerization**: Docker

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **HTTP Client**: Axios
- **Validation**: Zod

## ✨ Key Features

- **Multi-Role Support**: Separate dashboards for donors, fundraisers, and administrators
- **Payment Integration**: Multiple payment providers (Stripe, SSLCommerz)
- **Real-time Updates**: Live notifications and campaign progress tracking
- **Background Jobs**: Asynchronous email processing (welcome, verification, receipts)
- **API Documentation**: Interactive Swagger UI
- **Secure Authentication**: JWT-based auth with protected routes
- **Responsive Design**: Mobile-first approach

## 📥 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [Docker](https://www.docker.com/) and Docker Compose
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd donation_app
   ```

2. **Setup Backend**:

   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your credentials
   docker compose up --build -d
   npx prisma migrate dev
   npx prisma db seed
   ```

3. **Setup Frontend**:

   ```bash
   cd ../frontend
   npm install
   # Create .env with NEXT_PUBLIC_API_URL=http://localhost:3000
   npm run dev
   ```

4. **Access the Application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3000
   - API Docs: http://localhost:3000/api-docs
   - Grafana: http://localhost:3001 (admin/admin)
   - Prometheus: http://localhost:9090

## 📚 Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)

## 🔮 Future Enhancements

- Multi-currency support with dynamic conversion
- AI-powered fraud detection
- Mobile app integration (iOS/Android)
- Advanced social media sharing
- Automated tax receipt generation
- AWS S3/Cloudinary integration for file storage

## 📝 License

ISC

## 👥 Contributing

Contributions are welcome! Please read the documentation in each subdirectory for specific guidelines.

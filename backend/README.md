# SaaS Donation Platform - Backend

A robust, scalable, and feature-rich backend for a SaaS Donation Platform, enabling fundraisers to create campaigns and donors to contribute seamlessly.

## 🚀 Project Description

This platform provides a comprehensive solution for managing donations and fundraising campaigns. It features multi-provider payment integration, real-time notifications, background job processing for emails, and a full monitoring suite to ensure system health and performance.

## 🛠 Tech Stack

- **Languge**: [TypeScript](https://www.typescriptlang.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Background Jobs**: [BullMQ](https://docs.bullmq.io/) with [Redis](https://redis.io/)
- **Payments**: [Stripe](https://stripe.com/) & [SSLCommerz](https://www.sslcommerz.com/)
- **Real-time**: [Socket.io](https://socket.io/)
- **Monitoring**: [Prometheus](https://prometheus.io/) & [Grafana](https://grafana.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Documentation**: [Swagger UI](https://swagger.io/)
- **Containerization**: [Docker](https://www.docker.com/)

## 🏗 Architecture

The application follows a modular architecture designed for scalability and maintainability:

- **RESTful API**: Clean separation of concerns with Controllers, Services, and Routes.
- **Asynchronous Processing**: Background jobs (via BullMQ) handle time-consuming tasks like sending emails (Welcome, Verification, Receipts) without blocking the main event loop.
- **Monitoring**: Integrated Prometheus metrics scraping and Grafana dashboards for real-time observability.
- **Logging**: Integrated Winston logger for real-time logging.
- **Real-time Layer**: Socket.io for live notifications and campaign updates.
- **Infrastructure**: Fully Dockerized environment for consistent development and deployment.

## 📥 Installation Process

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- A `.env` file (copied from `.env.example`)

### Steps

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd donation_app/backend
   cp .env.example .env
   ```

2. **Setup environment variables**:
   Create a `.env` file in the `backend` directory and fill in the required credentials (DB, Stripe, SMTP, etc.).

3. **Run with Docker (Recommended)**:

   ```bash
   docker compose up --build -d
   ```

   _Note: This will start the Backend, PostgreSQL, Redis, Prometheus, and Grafana._

4. **Initialize Database**:

   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Access the App**:
   - Backend API: `http://localhost:3000`
   - Swagger Documentation: `http://localhost:3000/api-docs`
   - Grafana Dashboard: `http://localhost:3001` (Login: `admin`/`admin`)
   - Prometheus: `http://localhost:9090`

## 🔮 Future Work

- **Multi-currency Support**: Enhance payment providers to handle dynamic currency conversion.
- **AI Fraud Detection**: Implement automated screening for suspicious donation patterns.
- **Mobile App Integration**: Build dedicated client libraries for iOS and Android.
- **Advanced Social Sharing**: Deep integration with social media APIs for campaign virality.
- **Automated Tax Receipts**: Dynamic PDF generation for donor tax compliance.

## ⚠️ Limitations

- **State Persistence**: Currently, certain real-time state (like transient Socket.io rooms) isn't synchronized across multiple backend replicas if scaled horizontally without a Redis adapter for Socket.io.
- **File Storage**: Relies on local file system or placeholders; integration with AWS S3/Cloudinary is planned.
- **Development-favored Config**: Current Docker setup uses local volumes for development; production-ready orchestration (like Kubernetes) would require more complex secret management.
- **Single DB Instance**: The current architecture uses a single PostgreSQL instance which may become a bottleneck for extremely high-volume global traffic.

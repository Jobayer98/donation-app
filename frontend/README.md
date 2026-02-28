# SaaS Donation Platform - Frontend

A modern, responsive frontend for the SaaS Donation Platform built with Next.js, enabling seamless user experiences for donors, fundraisers, and administrators.

## 🚀 Project Description

This frontend application provides intuitive interfaces for managing donation campaigns, processing contributions, and administering the platform. It features role-based dashboards, real-time updates, and a clean UI built with shadcn/ui components.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## 📁 Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── (admin-dashboard)/       # Admin dashboard routes
│   ├── (auth)/                  # Authentication routes
│   ├── (donor-dashboard)/       # Donor dashboard routes
│   └── (fundraiser-dashboard)/  # Fundraiser dashboard routes
├── components/                   # React components
│   ├── admin-dashboard/         # Admin-specific components
│   ├── donor-dashboard/         # Donor-specific components
│   ├── fundraiser-dashboard/    # Fundraiser-specific components
│   ├── ui/                      # Reusable UI components
│   └── ProtectedRoute.tsx       # Route protection
└── lib/                         # Utilities and configurations
    ├── api/                     # API client functions
    ├── validators/              # Zod schemas
    ├── auth.tsx                 # Authentication logic
    └── axios.ts                 # Axios configuration
```

## 📥 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- Backend API running (see backend README)

### Steps

1. **Navigate to frontend directory**:
   ```bash
   cd donation_app/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup environment variables**:
   Create a `.env` file with:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Features

- **Role-Based Dashboards**: Separate interfaces for donors, fundraisers, and admins
- **Authentication**: Secure login and registration with protected routes
- **Campaign Management**: Create, edit, and monitor fundraising campaigns
- **Donation Processing**: Seamless donation flow with multiple payment options
- **Real-time Updates**: Live notifications and campaign progress tracking
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Theme switching support

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

Build the application for production:

```bash
npm run build
npm start
```

For deployment on Vercel, connect your repository and deploy with zero configuration.

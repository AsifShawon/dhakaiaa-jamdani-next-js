# Dhakaiaa Jamdani - Complete E-commerce Platform

This is a modern, full-stack e-commerce platform built with [Next.js](https://nextjs.org/) for traditional Bangladeshi Jamdani clothing.

## 🌟 Features

### Customer Features
- **Modern UI/UX**: Responsive design with dark/light theme support
- **Product Catalog**: Browse traditional Jamdani sarees and panjabis
- **Advanced Search**: Search with autocomplete functionality
- **Shopping Cart**: Redux-powered cart management
- **User Dashboard**: Order history, favorites, and profile management
- **Secure Checkout**: Multi-step checkout process with email confirmations

### Admin Features
- **Modern Admin Dashboard**: Comprehensive analytics and management
- **Real-time Notifications**: Live admin notification system
- **Order Management**: Complete order lifecycle management
- **Product Management**: Add, edit, and manage products
- **Analytics**: Sales analytics with interactive charts
- **Email System**: Automated customer and admin notifications

### Technical Features
- **Next.js 15**: Latest features with App Router
- **TypeScript**: Full type safety
- **Supabase**: Backend with real-time capabilities
- **TailwindCSS + DaisyUI**: Modern, responsive styling
- **Framer Motion**: Smooth animations
- **Redux Toolkit**: State management
- **Email Integration**: Nodemailer with Gmail

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/AsifShawon/dhakaiaa-jamdani-next-js.git
```

2. **Navigate to project directory**
```bash
cd dhakaia-jamdani
```

3. **Install dependencies**
```bash
npm install
```

4. **Environment Setup**
Create a `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GMAIL_USER=your_gmail_address
GMAIL_APP_PASSWORD=your_gmail_app_password
```

5. **Database Setup**
- Set up Supabase project
- Run the database migrations (SQL files in `/database` folder)
- Configure Row Level Security policies

6. **Run the development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Application Structure

### Frontend Routes
- `/` - Homepage with featured products
- `/Shop` - Product catalog with filtering
- `/product/[id]` - Individual product pages
- `/checkout` - Multi-step checkout process
- `/dashboard` - User dashboard

### Admin Routes
- `/Admin/Dashboard` - Admin overview with analytics
- `/Admin/Notifications` - Notification management center
- `/Admin/AllProducts` - Product management
- `/Admin/AddProduct` - Add new products
- `/Admin/Orders` - Order management
- `/Admin/Analytics` - Sales analytics

## 🔧 Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: TailwindCSS, DaisyUI, Framer Motion
- **State Management**: Redux Toolkit
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Email**: Nodemailer with Gmail
- **Deployment**: Vercel-ready

## 📊 Recent Updates

### v2.0 - Admin Notification System
- ✅ Real-time admin notifications
- ✅ Complete notification management interface
- ✅ Email integration for order events
- ✅ Dashboard notification quick actions
- ✅ Fixed hydration errors in navigation

### Key Improvements
- **Enhanced User Experience**: Smooth animations and responsive design
- **Real-time Features**: Live notifications and updates
- **Professional Admin Tools**: Comprehensive management interfaces
- **Email Automation**: Customer and admin email notifications
- **Type Safety**: Full TypeScript implementation

## 🛠️ Development

### Project Structure
```
src/
├── app/
│   ├── Admin/          # Admin panel pages
│   ├── components/     # Reusable components
│   ├── api/           # API functions
│   └── utils/         # Utility functions
├── public/            # Static assets
└── database/          # SQL migrations
```

### Key Components
- **ModernSidebar**: Admin navigation with real-time updates
- **NotificationCenter**: Complete notification management
- **EnhancedDashboard**: User dashboard with order tracking
- **ProductCard**: Reusable product display component

## 🚀 Deployment

The application is optimized for Vercel deployment:

```bash
npm run build
npm start
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support, email [asifbhuiyanshawon@gmail.com] or create an issue in the repository.

---

Built with ❤️ for preserving traditional Bangladeshi craftsmanship through modern technology.



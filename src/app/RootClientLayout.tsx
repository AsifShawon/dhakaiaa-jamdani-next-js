"use client";

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar";
import "./globals.css";
import Footer from "./components/footer";
import { useTheme } from "./context/ThemeContext";
import { Provider } from "react-redux";
import store from "./store/store";
import FloatingCart from "./components/cart";
import { getActiveOffers } from "./Admin/Offers/action";
import OfferDisplay from "./components/OfferDisplay";

const inter = Inter({ subsets: ["latin"] });

export default function RootClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [offers, setOffers] = useState<any[] | null>(null);
  const { theme, toggleTheme } = useTheme();
  console.log("Current Theme:", theme);
  useEffect(() => {
    const fetchOffers = async () => {
      const activeOffers = await getActiveOffers();
      console.log("Active Offers:", activeOffers);
      setOffers(activeOffers);
    };
    fetchOffers();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Provider store={store}>
      <div className={inter.className}>
        <OfferDisplay offers={offers || []} />
        <Navbar/>
        {children}
        <FloatingCart />
        <Footer />
      </div>
    </Provider>
  );
}
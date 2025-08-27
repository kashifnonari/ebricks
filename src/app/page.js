"use client";
import React from "react";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import Footer from "@/app/components/Footer";
export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center gap-7">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
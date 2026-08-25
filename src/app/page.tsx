import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Find your same vibe partner for everyday life",
  description:
    "Vybein helps you find real people nearby for gym, tea, dinner, travel, study, and more — no fake profiles, no digital drama. Safe, private, real meetups.",
};

export default function Home() {
  return <HomePage />;
}

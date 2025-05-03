"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ComingSoon() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <main className="min-h-[30vh] flex items-top justify-center px-4">
      <Card className="max-w-lg w-full bg-inherit border-0 p-6 text-center text-red">
        <CardContent className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg md:text-xl font-bold"
          >
            Netmifi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white text-3xl md:text-4xl font-bold"
          >Coming Soon</motion.p>

          {/* <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black placeholder:text-gray-400"
              required
            />
            <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              Notify Me
            </Button>
          </form> */}

          <p className="text-xs text-gray-500">
            We're cooking something fast, smart, and truly portable. Launching
            soon – stay connected.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

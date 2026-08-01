"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <form
      className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setSent(true);
      }}
    >
      {sent ? (
        <div className="flex items-center gap-3 px-6 py-4 rounded-full bg-white text-primary font-bold">
          <Icon name="check_circle" filled />
          You&apos;re on the list! Welcome to the inner circle.
        </div>
      ) : (
        <>
          <input
            className="flex-1 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:ring-2 focus:ring-tertiary-fixed-dim focus:border-transparent outline-none transition-all"
            placeholder="Your Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email Address"
          />
          <button className="px-10 py-4 rounded-full bg-white text-primary font-label-lg hover:bg-tertiary-fixed-dim hover:text-on-tertiary transition-all">
            Subscribe
          </button>
        </>
      )}
    </form>
  );
}

"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="space-y-2">
        <label className="font-label-lg text-label-lg text-on-surface block">
          Your Name
        </label>
        <input
          required
          className="w-full bg-surface-container-low border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-tertiary-fixed-dim transition-all"
          placeholder="Full name"
          type="text"
        />
      </div>
      <div className="space-y-2">
        <label className="font-label-lg text-label-lg text-on-surface block">
          Email Address
        </label>
        <input
          required
          className="w-full bg-surface-container-low border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-tertiary-fixed-dim transition-all"
          placeholder="you@example.com"
          type="email"
        />
      </div>
      <div className="space-y-2">
        <label className="font-label-lg text-label-lg text-on-surface block">
          Message
        </label>
        <textarea
          required
          className="w-full bg-surface-container-low border-none rounded-2xl p-4 focus:ring-2 focus:ring-tertiary-fixed-dim transition-all text-body-md"
          placeholder="How can we help you?"
          rows={5}
        />
      </div>
      {sent ? (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary-container/20 text-primary font-bold">
          <Icon name="check_circle" filled />
          Thank you! Your message has been sent.
        </div>
      ) : (
        <button
          type="submit"
          className="w-full py-4 bg-primary text-on-primary rounded-full font-label-lg text-label-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2"
        >
          Send Message
          <Icon name="send" className="text-sm" />
        </button>
      )}
    </form>
  );
}

import type { Metadata } from "next";
import AccountDashboard from "@/components/AccountDashboard";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Account & Checkout | Peshawari Ice Cream",
  description:
    "Your dashboard — favorites, order history, and secure checkout for Peshawari Ice Cream.",
};

export default function AccountPage() {
  return (
    <main className="pt-24 md:pt-32 pb-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      {/* Dashboard Header */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-tertiary font-label-lg text-label-lg tracking-widest uppercase mb-2 block">
              Welcome back,
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight">
              Mirza Ahmed
            </h1>
          </div>
          <div className="flex items-center gap-4 bg-surface-container-high p-6 rounded-3xl border border-primary/5">
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed-dim flex items-center justify-center">
              <Icon name="stars" filled className="text-on-tertiary-fixed" />
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant">
                Reward Points
              </p>
              <p className="font-headline-sm text-headline-sm text-primary">
                2,450 pts
              </p>
            </div>
          </div>
        </div>
      </section>

      <AccountDashboard />
    </main>
  );
}

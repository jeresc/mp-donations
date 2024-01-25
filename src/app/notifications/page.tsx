"use client";

import type {Donation} from "../types";

import {createClient} from "@supabase/supabase-js";
import {useEffect, useState} from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!,
);

const testDonation: Donation = {
  id: "777",
  amount: 777,
  message: "🎰💸💳",
  created_at: 0,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Donation[]>([testDonation]);

  useEffect(() => {
    supabase
      .channel("donations")
      .on("postgres_changes", {event: "INSERT", schema: "public"}, (change) => {
        setNotifications((notifications) => [...notifications, change.new as Donation]);
      })
      .subscribe();
  }, []);

  useEffect(() => {
    if (notifications.length) {
      const timeout = setTimeout(() => {
        setNotifications((notifications) => notifications.slice(1));
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [notifications]);

  if (!notifications.length) {
    return null;
  }

  return (
    <section className="absolute bottom-4 right-4 grid items-center justify-center gap-2 rounded-md border bg-black p-4">
      <p className="text-2xl font-bold">
        {notifications[0].amount.toLocaleString("es-AR", {style: "currency", currency: "ARS"})}
      </p>
      <p>{notifications[0].message}</p>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatDate, formatPrice } from "@/lib/format";

const STATUS_OPTIONS = ["در انتظار تماس", "در حال پردازش", "ارسال شده", "تکمیل شده"];

export default function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => api.getOrders().then(setOrders).finally(() => setLoading(false));
  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id, status) => {
    await api.updateOrderStatus(id, status);
    load();
  };

  if (loading) return <p className="text-center text-sm text-gray-400">در حال بارگذاری…</p>;
  if (orders.length === 0) {
    return (
      <p className="rounded-xl bg-white p-8 text-center text-sm text-gray-500 ring-1 ring-black/5">
        هنوز سفارشی ثبت نشده است.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div key={order.id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-sm font-bold text-brand-700">{order.customer.fullName}</span>
              <span dir="ltr" className="mr-2 text-xs text-gray-500">
                {order.customer.phone}
              </span>
            </div>
            <span className="text-xs text-gray-400">{formatDate(order.createdAt)}</span>
          </div>

          <p className="mt-2 text-xs text-gray-500">
            {order.customer.city} — {order.customer.address}
          </p>
          {order.customer.preferredCallTime && (
            <p className="mt-1 text-xs text-brand-500">
              ساعت ترجیحی تماس: <span className="font-bold">{order.customer.preferredCallTime}</span>
            </p>
          )}

          <ul className="mt-3 space-y-1 border-t border-dashed border-gray-200 pt-3 text-sm">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between text-gray-600">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)} تومان</span>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex items-center justify-between border-t border-dashed border-gray-200 pt-3">
            <span className="font-bold text-brand-700">{formatPrice(order.total)} تومان</span>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order.id, e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs focus:outline-none"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

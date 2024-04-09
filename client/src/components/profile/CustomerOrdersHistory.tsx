import React from "react";

import { IOrder } from "src/redux/orders/order";

import { OrderCard } from "../orders/OrderCard";

type Props = {
  orders: IOrder[];
};

export const CustomerOrdersHistory: React.FC<Props> = ({ orders }) => {
  return (
    <div className="mt-16 h-full w-full ">
      <div className="grid h-full w-full grid-cols-1 gap-5 768:grid-cols-2">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} border />
        ))}
      </div>
    </div>
  );
};

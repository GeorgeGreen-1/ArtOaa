import { useSelector } from "react-redux";

import { useDialog } from "src/hooks/useDialog";

import { selectCurrentUser } from "src/redux/auth/authSlice";
import { IOrder } from "src/redux/orders/order";
import { useGetAllOrdersQuery } from "src/redux/orders/ordersApiSlice";

import { Button, Loading } from "src/components/ui";
import { OrderCard } from "./OrderCard";
import { OrderForm } from "./OrderForm";

export const OrdersWrapper = () => {
  const { data: orders, isFetching } = useGetAllOrdersQuery(undefined);

  const reversedOrders = orders ? [...orders].reverse() : [];

  const loggedUser = useSelector(selectCurrentUser);

  const { dialogState, openDialog, closeDialog } = useDialog();

  console.log(orders, "orders")
  console.log(reversedOrders, "reversed orders");

  if (isFetching) return <Loading />;

  return (
    <div className="flex min-h-screen w-full flex-col gap-5 bg-[#121212] px-10 py-20">
      <div className="flex w-full items-center justify-between gap-2">
        <h1 className="text-2xl text-[#FCA311] 1280:text-4xl 1440:text-5xl">
          Jobs you might like
        </h1>

        {loggedUser && loggedUser.role === "customer" && (
          <Button
            className="w-[8rem] 768:w-[10rem]"
            variant="primary"
            onClick={openDialog}
          >
            Make Order
          </Button>
        )}
      </div>

      <div className="flex flex-row items-center text-lg text-white 1280:text-xl 1440:text-3xl">
        <h2 className="border-b-2 border-[#F83A05] px-3 py-3">Most Recent</h2>
        <h2 className="border-b-2 border-gray-600 px-3 py-3">Saved Orders</h2>
      </div>

      <p className="text-white">
        Browse jobs that match your experience to a client’s hiring preferences.{" "}
      </p>

      <div className="grid grid-cols-1 gap-5 768:grid-cols-2 1536:grid-cols-3">
        {reversedOrders.map((order: IOrder) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>

      <OrderForm dialogState={dialogState} closeDialog={closeDialog} />
    </div>
  );
};

import { useParams } from "react-router-dom";
import { OrderDetailsCard } from "./OrderDetailsCard";
import { OrderActiveProposals } from "./OrderActiveProposals";
import { useGetOrderByIDQuery } from "src/redux/orders/ordersApiSlice";
import { Loading } from "src/components/ui";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "src/redux/auth/authSlice";

export const OrderWrapper = () => {
  const { orderID } = useParams<{ orderID: string }>();
  const { data: order, isLoading } = useGetOrderByIDQuery(orderID || "");

  const loggedUser = useSelector(selectCurrentUser);

  if (isLoading) return <Loading />;

  if (order) {
    return (
      <div className="h-full w-full px-10 py-14 1024:px-20">
        <h1 className="mb-5 w-fit border-b-4 border-[#F83A05] px-3 py-3 text-4xl text-black ">
          Job Details
        </h1>
        <OrderDetailsCard key={order._id} order={order} />
        {loggedUser?._id === order?.user._id && (
          <div>
            <OrderActiveProposals key={order._id} bids={order.bids} />
          </div>
        )}
      </div>
    );
  }
};

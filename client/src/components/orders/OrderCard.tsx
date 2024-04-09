import { Button } from "src/components/ui";
import { useNavigate } from "react-router-dom";
import { GenreCard, GenreParagpraph, GenreWrapper } from "../ui/ArtistCard";
import { IOrder } from "src/redux/orders/order";
import useTimeAgo from "src/hooks/useTimeAgo";
import { IconLocation } from "src/components/icons";

type IOrderProps = {
  order: IOrder;
  border?: boolean;
};
export const OrderCard: React.FC<IOrderProps> = ({ order, border }) => {
  const navigate = useNavigate();
  const timeAgo = useTimeAgo(order.createdAt);

  return (
    <div
      className={`flex flex-col justify-between ${border ? "border-2" : ""} gap-5 rounded-[1.25rem] bg-white px-5 py-5 text-black 1440:px-10 1440:py-10`}
    >
      <div className="flex flex-col gap-5">
        <p className="text-base">Posted {timeAgo}</p>
        <p className="mb-6 line-clamp-2 text-2xl">
          {order.description}
        </p>
        <GenreWrapper className="mb-6 768:mb-10">
          {order.artStyle &&
            order.artStyle.map((genre, index) => {
              return (
                <GenreCard key={index + 1}>
                  <GenreParagpraph>{genre.name}</GenreParagpraph>
                </GenreCard>
              );
            })}
        </GenreWrapper>
        <div className="flex gap-5 truncate">
          <p className="text-base font-semibold">{order.artDimension}</p>
          <p className=" flex gap-1 text-base font-semibold">
            <IconLocation />
            {order.artLocation}
          </p>
        </div>
      </div>
      <Button
        onClick={() => navigate(`/orders/${order._id}`)}
        className="h-[3rem] w-[8rem] self-end 768:w-[10rem]"
        variant="primary"
      >
        See Details
      </Button>
    </div>
  );
};

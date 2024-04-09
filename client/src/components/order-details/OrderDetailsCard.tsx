import { Button, Sidebar } from "src/components/ui";
import { IconCross, IconLocation } from "src/components/icons";
import { GenreCard, GenreParagpraph, GenreWrapper } from "../ui/ArtistCard";
import { IOrder } from "src/redux/orders/order";
import useTimeAgo from "src/hooks/useTimeAgo";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BidFormSchema, BidFormSchemaType } from "./BidFormSchema";
import { useCreateBidMutation } from "src/redux/bids/bidsApiSlice";
import { useSidebar } from "src/hooks/useSidebar";

type IOrderProps = {
  order: IOrder;
};

export const OrderDetailsCard: React.FC<IOrderProps> = ({ order }) => {
  const { sidebarState, openSidebar, closeSidebar } = useSidebar();

  const timeAgo = useTimeAgo(order.createdAt);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BidFormSchemaType>({
    resolver: zodResolver(BidFormSchema),
    defaultValues: {
      offer: "",
      coverLetter: "",
    },
  });

  const [createBid] = useCreateBidMutation();

  const onSubmit: SubmitHandler<BidFormSchemaType> = async (data) => {
    console.log(data);
    try {
      const result = await createBid({
        orderId: order._id,
        offer: Number(data.offer),
        coverLetter: data.coverLetter,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-5 overflow-x-hidden  rounded-xl border border-black px-5 py-5 1024:gap-10 1280:px-10 1280:pt-10">
      <div className="flex w-full flex-col gap-5 1024:flex-row 1024:gap-10">
        <div className="flex w-full flex-col  gap-2 1024:w-1/2 1280:gap-3">
          <p className="text-base">Posted {timeAgo}</p>
          <h1 className="text-4xl font-light text-[#F83A05]">{order.title}</h1>
          <p className="line-clamp-[30] text-xl 768:text-2xl">
            {order.description}
          </p>
        </div>

        <div className="h-[15rem] rounded-[1.25rem] 768:h-[20rem] 1024:h-[22rem] 1024:w-1/2 1440:h-[25rem]">
          {order.wallImage ? (
            <img
              src={order.wallImage.path}
              alt={order.artLocation}
              className="h-full w-full rounded-b-none rounded-tl-xl"
            />
          ) : (
            <img
              src="https://placeholder.com/300"
              alt={order.artLocation}
              className="h-full w-full rounded-b-none rounded-tl-xl"
            />
          )}
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 border-t-2 border-gray-500 py-5 1024:pt-10">
        <div className="flex items-center gap-2 1024:gap-5">
          <GenreWrapper>
            {order.artStyle.map((genre, index) => {
              return (
                <GenreCard key={index}>
                  <GenreParagpraph>{genre.name}</GenreParagpraph>
                </GenreCard>
              );
            })}
          </GenreWrapper>
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-y-5">
          <div className="flex w-full flex-col items-start gap-3">
            <GenreCard>
              <GenreParagpraph>{order.artPosition}</GenreParagpraph>
            </GenreCard>

            <div className="mt-3 line-clamp-6 flex w-full items-start justify-start gap-1 text-base font-semibold">
              <IconLocation />
              <p className="w-[90%]">{order.artLocation}</p>
            </div>

            <p className="text-base font-semibold">
              Size{" "}
              <span className="text-[#F83A05]">
                {order.artDimension
                  .split("")
                  .map((char) => char.replace("/", "x"))}
              </span>
            </p>
          </div>

          <Button
            className="h-[3rem] w-[8rem] self-end"
            variant="tertiary"
            onClick={openSidebar}
          >
            Apply now
          </Button>
        </div>

        <Sidebar
          closeMenu={closeSidebar}
          showOverlay={true}
          variant="right"
          size="responsive"
          state={sidebarState === "open" ? "open" : "close"}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-scrollbar flex h-screen w-full flex-col items-center overflow-x-hidden overflow-y-scroll bg-white px-10 py-16 1024:px-20">
              <div className="flex w-full items-center justify-between">
                <h1 className="border-b-4 border-[#F83A05] pb-2 pr-5 text-3xl text-black">
                  Submit a Proposal
                </h1>
                <div className="cursor-pointer self-end" onClick={closeSidebar}>
                  <IconCross />
                </div>
              </div>
              <div className="mt-8 w-screen border-t-2 border-gray-500"></div>
              <div className="mt-10 flex w-full flex-col gap-10 rounded-xl border border-gray-600 py-5">
                <h1 className="px-5 text-2xl">How do you want to be paid?</h1>
                <div className="flex flex-col gap-3 px-5">
                  <p className="text-lg">Price</p>
                  <div className="flex max-w-[25rem] flex-col items-center gap-1">
                    <div className="flex w-full flex-col">
                      <label className="text-[#5E5E5E]" htmlFor="">
                        max
                      </label>
                      <input
                        {...register("offer")}
                        className={`h-11 rounded-lg border ${errors.offer ? "border-[#F83A50]" : "border-gray-600"} px-3 outline-none`}
                      />
                    </div>
                    <span className="h-7 self-start text-sm font-semibold text-[#F83A05]">
                      {errors.offer ? "Required number and minimum 2" : ""}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex w-full flex-col rounded-xl border border-gray-600 px-5 py-5">
                <h1 className="mb-10 text-2xl">Cover Letter</h1>
                <textarea
                  {...register("coverLetter")}
                  className={`h-[7.75rem] resize-none rounded-lg border ${errors.coverLetter ? "border-[#F83A50]" : "border-gray-600"} px-3 py-3 outline-none`}
                ></textarea>
                <span className="mt-[2px] h-7 self-start text-sm font-semibold text-[#F83A05]">
                  {errors.coverLetter
                    ? "Required and at least 5 character"
                    : ""}
                </span>
              </div>
              <div className="mt-10 flex w-full flex-row gap-5 px-[1.725rem]">
                <Button className="w-[90%]" variant="primary">
                  Submit a Proposal
                </Button>
                <button
                  onClick={closeSidebar}
                  className="w-[10%] text-lg  font-semibold text-[#FCA311] hover:text-black"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </Sidebar>
      </div>
    </div>
  );
};

import { Fragment, useState } from "react";

import { useSidebar } from "src/hooks/useSidebar";

import { IBid } from "src/redux/orders/order";
import { artStyle } from "src/redux/auth/auth";

import { Button, Sidebar } from "src/components/ui";
import {
  ArtistDecription,
  ArtistInfoWrapper,
  ArtistName,
  ArtistTextWrapper,
  Card,
  GenreCard,
  GenreParagpraph,
  GenreWrapper,
  HelperDiv,
} from "src/components/ui/ArtistCard";
import { IconCross } from "src/components/icons";
import { useNavigate } from "react-router-dom";

type Props = {
  bids: IBid[];
};

type IFullDetails = {
  coverLetter: string;
  offer: number;
  id: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  aboutMe?: string;
  artStyle?: artStyle[];
};

export const OrderActiveProposals: React.FC<Props> = ({ bids }) => {
  const { sidebarState, openSidebar, closeSidebar } = useSidebar();

  const navigate = useNavigate();

  const [fullDetails, setFullDetails] = useState<IFullDetails>();

  const handleArtistDetails = (bid: IBid) => {
    setFullDetails({
      ...bid.author,
      id: bid.user,
      offer: bid.offer,
      coverLetter: bid.coverLetter,
    });
    openSidebar();
  };

  return (
    <div className="flex h-full w-full flex-col gap-14 pt-14">
      <h1 className="text-2xl" onClick={() => console.log(fullDetails)}>
        Active Proposals
      </h1>
      <div className="grid grid-cols-1 gap-4 1440:grid-cols-2">
        {bids.map((bid) => {
          return (
            <Fragment key={bid._id}>
              <Card className="h-full flex-col 768:flex-row" key={bid._id}>
                <div className="flex h-[17rem] w-full  items-center justify-center rounded-b-none rounded-t-[1.875rem] bg-gray-400 768:h-full 768:w-[40%] 768:rounded-bl-[1.875rem] 768:rounded-br-none 768:rounded-tr-none">
                  {bid.author.profileImage ? (
                    <img
                      src={bid.author.profileImage}
                      alt={bid.author.firstName}
                      className="h-full w-full rounded-b-none rounded-t-[1.875rem] 768:rounded-bl-[1.875rem] 768:rounded-br-none 768:rounded-tr-none"
                    />
                  ) : (
                    <img
                      src="https://placeholder.com/300"
                      alt={bid.author.firstName}
                      className="h-full w-full rounded-t-[1.875rem] 768:rounded-bl-[1.875rem] 768:rounded-br-none 768:rounded-tr-none"
                    />
                  )}
                </div>
                <ArtistInfoWrapper className="w-full justify-between 768:w-[60%] ">
                  <HelperDiv>
                    <ArtistTextWrapper className="flex-col gap-3">
                      <ArtistName>{bid.author.firstName}</ArtistName>
                      <ArtistDecription>{bid.author.aboutMe}</ArtistDecription>
                    </ArtistTextWrapper>
                    <GenreWrapper className="mt-3 items-start">
                      {bid.author.artStyle?.map((genre) => {
                        return (
                          <GenreCard key={genre._id}>
                            <GenreParagpraph>{genre.name}</GenreParagpraph>
                          </GenreCard>
                        );
                      })}
                    </GenreWrapper>
                  </HelperDiv>
                  <Button
                    onClick={() => handleArtistDetails(bid)}
                    variant="primary"
                    className="h-[3rem] w-[8rem] self-start"
                  >
                    See Details
                  </Button>
                </ArtistInfoWrapper>
              </Card>
            </Fragment>
          );
        })}
        {fullDetails && (
          <Sidebar
            closeMenu={closeSidebar}
            showOverlay={true}
            variant="right"
            size="responsive"
            state={sidebarState === "open" ? "open" : "close"}
          >
            <div className="modal-scrollbar flex h-screen w-full flex-col items-center overflow-x-hidden overflow-y-scroll bg-white py-16 ">
              <div className=" flex w-full items-center justify-between px-10 1024:px-20">
                <h1 className="border-b-4 border-[#F83A05] pb-2 pr-5 text-3xl text-black">
                  Artist Detail
                </h1>
                <div className="cursor-pointer self-end" onClick={closeSidebar}>
                  <IconCross />
                </div>
              </div>
              <div className="mt-8 w-screen border-t-2 border-gray-500"></div>
              <div className="w-full px-5">
                <div className="mt-10 flex w-full flex-col gap-10 rounded-xl border border-gray-600">
                  <HelperDiv key={fullDetails.id} className="w-full">
                    <HelperDiv className="flex h-[20rem] w-full flex-row gap-5">
                      <HelperDiv className="w-1/2">
                        {fullDetails.profileImage ? (
                          <img
                            src={fullDetails.profileImage}
                            alt={fullDetails.firstName}
                            className="h-full w-full rounded-b-none rounded-tl-xl"
                          />
                        ) : (
                          <img
                            src="https://placeholder.com/300"
                            alt={fullDetails.firstName}
                            className="h-full w-full rounded-b-none rounded-tl-xl"
                          />
                        )}
                      </HelperDiv>
                      <HelperDiv className="flex w-1/2 flex-col gap-3 px-5 py-5">
                        <HelperDiv className="flex w-full flex-row items-center justify-between">
                          <ArtistName>{fullDetails.firstName}</ArtistName>
                          <p>{fullDetails.offer}</p>
                        </HelperDiv>
                        <ArtistDecription className="text-[0.875rem]">
                          {fullDetails.aboutMe}
                        </ArtistDecription>
                        <hr className="mb-5 border border-black" />
                        <ArtistDecription>
                          {fullDetails.coverLetter}
                        </ArtistDecription>
                      </HelperDiv>
                    </HelperDiv>
                    <HelperDiv className="flex w-full flex-col py-5 pl-2 pr-5">
                      <HelperDiv className="w-1/2 space-y-5">
                        <HelperDiv className="flex flex-row gap-3">
                          <div>....</div>
                          <div>....</div>
                        </HelperDiv>
                        <GenreWrapper>
                          {fullDetails.artStyle?.map((genre) => {
                            return (
                              <GenreCard key={genre._id}>
                                <GenreParagpraph>{genre.name}</GenreParagpraph>
                              </GenreCard>
                            );
                          })}
                        </GenreWrapper>
                      </HelperDiv>
                      <Button
                        onClick={() => navigate(`/profile/${fullDetails.id}`)}
                        className="mt-10 h-14 self-end rounded-lg px-4 hover:bg-[#FAA32F] hover:text-white"
                        variant="quaternary"
                      >
                        See Portfolio
                      </Button>
                    </HelperDiv>
                  </HelperDiv>
                </div>
              </div>
              <div className="mt-10 flex w-full flex-row gap-5 px-[12rem]">
                <Button className="w-[90%]" variant="primary">
                  Order Now
                </Button>
                <button
                  onClick={closeSidebar}
                  className="w-[10%] text-lg  font-semibold text-[#FCA311] hover:text-black"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Sidebar>
        )}
      </div>
    </div>
  );
};

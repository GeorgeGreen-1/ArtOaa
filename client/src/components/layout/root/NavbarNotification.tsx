import React from "react";
import { useNavigate } from "react-router-dom";
import {
  IconDate,
  IconLocation,
  IconNotification,
  // IconPhone,
} from "src/components/icons";
import { INotification } from "src/redux/auth/auth";

type Props = {
  notification: INotification;
  onClose: () => void;
};

export const NavbarNotification: React.FC<Props> = ({
  notification,
  onClose,
}) => {
  const navigate = useNavigate();

  const onNavigateToOrder = () => {
    navigate(`/orders/${notification?._id}`);
    onClose();
  };

  return (
    <div
      onClick={onNavigateToOrder}
      className="flex cursor-pointer flex-col gap-2 rounded-2xl bg-[#C0CBCF] px-5 py-4 transition-all duration-200 hover:bg-[#b9baba] 640:flex-row 640:gap-5"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1A2226]">
        <IconNotification />
      </div>

      <div className="space-y-1">
        <h3 className="font-light text-black/70">
          <strong className="font-semibold text-black">
            {notification?.firstName} {notification?.lastName}
          </strong>{" "}
          wants to order
        </h3>

        <div className="flex items-center gap-2">
          <div className="w-5">
            <IconLocation />
          </div>
          <p className="text-sm">{notification?.artLocation}</p>
        </div>

        {/* <div className="flex items-center gap-2">
          <div className="w-5">
            <IconPhone color="#111" />
          </div>
          <p className="text-sm">+995591000000</p>
        </div> */}

        <div className="flex items-center gap-2">
          <div className="w-5">
            <IconDate />
          </div>
          <p className="text-sm">{notification?.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

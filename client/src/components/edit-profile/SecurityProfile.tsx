import useWindowSize from "src/hooks/useWindowSize";
import { useDialog } from "src/hooks/useDialog";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "src/redux/auth/authSlice";

import { Button, Modal } from "src/components/ui";
import { IconCross } from "src/components/icons";

export const SecurityProfile = () => {
  const { closeDialog, dialogState, openDialog } = useDialog();
  const { width } = useWindowSize();

  const loggedUser = useSelector(selectCurrentUser);

  return (
    <div className="flex h-full w-full flex-col items-center gap-20 rounded-3xl border-b-4 border-l-4 border-[#F83A05] bg-white px-5 py-10 768:px-12 768:py-12 1440:px-20 1440:py-20">
      <div className="flex h-full w-full flex-col gap-10 768:w-[38rem] 834:w-[40rem] 1024:w-[45rem] 1280:w-[50rem] 1440:w-[60rem] 1536:w-[62rem] 1592:w-[65rem]">
        <div className="flex w-full self-start">
          <h1 className="text-xl text-[#F83A05] 768:text-2xl">
            Access & Security
          </h1>
        </div>
        <div className="flex flex-col justify-between gap-2 text-base 540:flex-row 768:text-xl">
          <h1>Email</h1>
          <h1>{loggedUser?.email}</h1>
        </div>
        <div className="flex justify-between text-base 768:text-xl">
          <h1>Password</h1>
          <h1 className="cursor-pointer text-[#FCA311]" onClick={openDialog}>
            Change Password
          </h1>
        </div>
      </div>
      <Modal closeDialog={closeDialog} isModalOpen={dialogState === "open"}>
        <div className="modal-scrollbar min-h-[30rem] w-screen self-center border-4 border-r-0 border-t-0 border-b-[#F83A05] border-l-[#F83A05] bg-white px-5 py-16  768:w-[35rem] 768:rounded-3xl 1024:px-10">
          <div className="flex w-full items-center justify-between">
            <h1 className="border-b-4 border-[#F83A05] pb-2 pr-5 text-3xl text-black">
              {width > 450 ? "Change Password" : "Password"}
            </h1>
            <div className="cursor-pointer self-end pb-2" onClick={closeDialog}>
              <IconCross />
            </div>
          </div>
          <form>
            <div className="mt-10 flex w-full flex-col gap-5">
              <div className="flex w-full flex-col ">
                <label className="self-start">Old Password</label>
                <input
                  className="rounded-xl border border-[#66666659] px-5 py-3 outline-none"
                  type="text"
                  // {...register("firstName")}
                />
              </div>

              <div className="flex w-full flex-col ">
                <label className="self-start">New Password</label>
                <input
                  className="rounded-xl border border-[#66666659] px-5 py-3 outline-none"
                  type="text"
                  // {...register("lastName")}
                />
              </div>
              <div className="flex w-full flex-col ">
                <label className="self-start">Confirm new Password</label>
                <input
                  className="rounded-xl border border-[#66666659] px-5 py-3 outline-none"
                  type="text"
                  // {...register("lastName")}
                />
              </div>
              <Button variant="primary" className="mt-14 self-center">
                Change Password
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

"import client";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "./DeleteConfirmation";
import { useState } from "react";

function DeleteAccount() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const showModal = () => {
    setShowConfirmation(!showConfirmation);
  };

  return (
    <>
      <div className="bg-[#cf9a9ac7] p-4 m-4 rounded-lg border-1 border-gray-400 flex flex-row space-x-4">
        <div className="p-2 m-2 flex items-center justify-center cursor-pointer">
          <div className="w-[2.5rem] h-[2.5rem] rounded-full bg-red-400 text-xl text-fuchsia-300 flex items-center justify-center">
            <RiDeleteBin6Line
              onClick={showModal}
              className="w-[1.8rem] h-[1.8rem] rounded-full text-base"
            />
          </div>
        </div>
        <div className="m-2 p-4">
          <p className="text-gray-700 text-base text-pretty font-mono">
            If you have any problems, feel free to contact us. It is an
            irreversible process. Once you delete your account, all your data
            will be deleted. If you are a member, your membership will also be
            deleted.
          </p>
        </div>
      </div>
      {showConfirmation && <DeleteModal showModal={showModal} />}
    </>
  );
}

export default DeleteAccount;

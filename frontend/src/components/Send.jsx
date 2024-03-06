import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URI } from "../App";
import { useState } from "react";

const Send = () => {
  const { to } = useParams();

  const [amount, setAmount] = useState(0);

  const userQuery = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      axios.get(`${BASE_URI}/user/${to}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }),
  });

  if (userQuery.error) {
    console.log(to);
    console.log(userQuery.error);
  }

  const transferAmount = () => {
    console.log(amount);

    axios.post(
      `${BASE_URI}/account/transfer`,
      {
        to: userQuery.data.data._id,
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
  };

  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="bg-white p-8 flex flex-col rounded-lg min-w-[500px]">
        <div className="text-3xl flex justify-center py-4 font-bold">
          Send Money
        </div>
        <div className="flex space-x-5 py-3 items-center">
          <div className="flex bg-green-600 p-3 items-center justify-center rounded-full">
            UB
          </div>
          <div className="text-xl font-bold">
            {userQuery.isPending ? "" : userQuery.data.data.firstName}
          </div>
        </div>
        <div className="text-lg font-bold pt-4 pb-2">Amount</div>
        <div className="w-full">
          <input
            type="number"
            className="w-full px-2 py-2 border border-gray-200 rounded-lg"
            placeholder="Enter Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          onClick={transferAmount}
          className="flex items-center mt-4 rounded-lg text-white justify-center py-3 bg-green-500"
          disabled={amount == "" || amount == 0}
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};

export default Send;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URI } from "../App";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();

  const usersQuery = useQuery({
    queryKey: ["userData", searchParam],
    queryFn: () =>
      axios.get(`${BASE_URI}/user/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        params:
          searchParam == ""
            ? {}
            : {
                filter: searchParam,
              },
      }),
  });

  const balanceQuery = useQuery({
    queryKey: ["balance"],
    queryFn: () =>
      axios.get(`${BASE_URI}/account/balance`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }),
  });

  return (
    <div className="h-full w-full bg-white flex flex-col px-6">
      <div className="flex justify-between py-6 items-center">
        <div className="text-2xl font-bold">Payments App</div>
        <div className="flex space-x-4 items-center">
          <div className="text-lg">Hello, User</div>
          <div className="flex bg-green-600 p-3 items-center justify-center rounded-full">
            UB
          </div>
        </div>
      </div>
      <div className="w-full h-0.5 bg-gray-200"></div>
      <div className="flex space-x-2 py-3 items-end">
        <div className="text-xl font-bold">Your Balance</div>
        <div className="text-lg font-bold">{`Rs ${
          balanceQuery.isPending ? "..." : balanceQuery.data?.data.balance
        }`}</div>
      </div>
      <div className="py-3 text-xl font-bold">Users</div>
      <div className="">
        <input
          type="text"
          placeholder="Search Users..."
          className="px-2 py-2 border border-gray-200 rounded-lg w-full"
          onChange={(e) => setSearchParam(e.target.value)}
        />
      </div>
      <div className="py-5">
        {usersQuery.isPending ? (
          <div className="text-xl">Loading...</div>
        ) : (
          usersQuery.data?.data?.map((user) => (
            <div
              key={user.username}
              className="flex justify-between items-center space-y-4"
            >
              <div className="flex space-x-4 items-center">
                <div className="flex bg-green-600 p-3 items-center justify-center rounded-full">
                  UB
                </div>
                <div className="text-xl font-bold">
                  {user.firstName} {user.lastName}
                </div>
              </div>
              <button
                onClick={() => {
                  navigate(`/send/${user._id}`);
                }}
                className="bg-black py-2 px-4 text-white text-lg flex justify-center items-center rounded-lg"
              >
                Send Money
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;

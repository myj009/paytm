/* eslint-disable react/prop-types */

const Send = ({ firstName, lastName }) => {
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
            {firstName} {lastName}
          </div>
        </div>
        <div className="text-lg font-bold pt-4 pb-2">Amount</div>
        <div className="w-full">
          <input
            type="number"
            className="w-full px-2 py-2 border border-gray-200 rounded-lg"
            placeholder="Enter Amount"
          />
        </div>
        <button className="flex items-center mt-4 rounded-lg text-white justify-center py-3 bg-green-500">
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};

export default Send;

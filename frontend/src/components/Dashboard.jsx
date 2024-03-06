const Dashboard = () => {
  const users = [
    {
      username: "abcf@gmail.com",
      firstName: "poi",
      lastName: "def",
      _id: "65e57ca99825ee3207681ed4",
    },
    {
      username: "abcff@gmail.com",
      firstName: "poi",
      lastName: "def",
      _id: "65e57ca99825ee3207681ed4",
    },
    {
      username: "asbcf@gmail.com",
      firstName: "poi",
      lastName: "def",
      _id: "65e57ca99825ee3207681ed4",
    },
  ];
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
      <div className="flex space-x-2 py-3">
        <div className="text-xl font-bold">Your Balance</div>
        <div className="text-lg font-bold">$5000</div>
      </div>
      <div className="py-3 text-xl font-bold">Users</div>
      <div className="">
        <input
          type="text"
          placeholder="Search Users..."
          className="px-2 py-2 border border-gray-200 rounded-lg w-full"
        />
      </div>
      <div className="py-5">
        {users.map((user) => (
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
            <div className="bg-black py-2 px-4 text-white text-lg flex justify-center items-center rounded-lg">
              Send Money
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

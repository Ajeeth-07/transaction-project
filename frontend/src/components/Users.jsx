import { useState } from "react";
import { Button } from "./Button";

export const Users = () => {
  const [users, setUsers] = useState([
    {
      firstName: "Ajeeth",
      lastName: "Shinde",
      _id: 1,
    },
  ]);

  return (
    <div>
      <div className="mt-6 font-semibold text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-400"
        />
      </div>
      <div>
        {users.map((user) => (
          <User user={user} key={user._id} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  return (
    <div className="flex justify-between px-3 pt-1">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-4">
          <div className="flex flex-col justify-center items-center h-full">
            <span className="text-xl font-bold">{user.firstName[0]}</span>
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full mr-2">
        <div>
          {" "}
          <Button label={"Send Money"} />
        </div>
      </div>
    </div>
  );
}

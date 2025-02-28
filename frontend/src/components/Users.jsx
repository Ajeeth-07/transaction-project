import { useState } from "react";
import { Button } from "./Button";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Users = () => {
  const [users, setUsers] = useState([]);
    const[filter, setFilter] = useState("");
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
            headers : {
                Authorization : "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            setUsers(response.data.user)
        })
    },[filter])

  return (
    <div>
      <div className="mt-6 font-semibold text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          onChange={(e) => {
            setFilter(e.target.value);
          }}
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
    const navigate = useNavigate();
  return (
    <div className="flex justify-between px-3 pt-1">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-4">
          <div className="flex flex-col justify-center items-center h-full">
            <span className="text-xl font-bold">{user.firstName[0].toUpperCase()}</span>
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
          <Button label={"Send Money"} onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName)
          }}/>
        </div>
      </div>
    </div>
  );
}

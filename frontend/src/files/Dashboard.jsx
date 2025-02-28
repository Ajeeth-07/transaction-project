import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect, useState } from "react";
import axios from "axios";

export const Dashboard = () => {
  const [balance, setBalance] = useState("");
  useEffect(() => {
    async function getBalance() {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        setBalance(res.data.balance);
        console.log(balance);
      } catch(err) {
        console.error("Error: " + err);
      }
    }

    getBalance();
  }, [balance]);

  return (
    <div>
      <Appbar />
      <Balance amount={Number(balance).toFixed(2)} />
      <Users />
    </div>
  );
};

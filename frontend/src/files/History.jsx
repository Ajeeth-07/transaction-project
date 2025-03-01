import { useEffect, useState } from "react";
import axios from "axios";
export const History = () => {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
         async function transactions(){
            const res = await axios.get("http://localhost:3000/api/v1/account/history", {
                headers : {
                    Authorization : "Bearer " + localStorage.getItem("token")
                }
            });
            setTransactions(res.data.history);
         }

         transactions();
    }, [])

    return (
        <div>
            <div>
              <h2>Transaction History</h2>
              {transactions.length === 0 ? (<p>No transactions found for the user</p>) : (
                transactions.map((trans) => (
                    <Trans transaction={trans} key={trans._id}/>
                ))
              )}
            </div>
        </div>
    );
}

function Trans({transaction}){

    //decoding token
    const token = localStorage.getItem("token");
    const currentUserId = token ? JSON.parse(window.atob(token.split(".")[1])).id : null;

    const isSender = transaction.senderId === currentUserId;
    const transactionType = isSender ? "Sent" : "Recieved";
    const otherParty = isSender ? transaction.receiverId : transaction.senderId;
    const date = new Date(transaction.timestamp).toLocaleString();

    return (
      <div className="p-4 border rounded shadow mb-4">
        <div className="flex justify-between">
          <div className="text-lg font-semibold">{transactionType}</div>
          <div className="text-sm text-gray-500">{date}</div>
        </div>
        <div className="mt-2">
          <span className="font-medium">Amount:</span> ₹{transaction.amount}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Other Party:</span> {otherParty}
        </div>
      </div>
    );
}
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
    return(
        <div>
            <Appbar/>
            <Balance amount={"10000"}/>
            <Users/>
        </div>
    );
}
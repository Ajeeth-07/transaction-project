import { Link } from "react-router-dom";

export const BottomComp = ({label, buttonText, to}) => {
    return (
        <div>
            <div>{label}</div>
            <Link className="pointer underline pl-1 cursor-pointer" to={to}>{buttonText}</Link>
        </div>
    );
}
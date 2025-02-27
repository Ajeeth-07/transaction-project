export const Balance = ({amount}) => {
    return (
      <div className="flex pt-4 px-4">
        <div className="font-bold text-lg">Your balance</div>
        <div className="ml-4 font-semibold text-lg">₹ {amount}</div>
      </div>
    );
}
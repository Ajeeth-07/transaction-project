import { BottomComp } from "../components/bottomText";
import { Button } from "../components/Button";
import  Heading  from "../components/heading";
import { InputBox } from "../components/inputBox";
import { SubHeading } from "../components/subHeading";


const Signup = () => {
    return (
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Signup"} />
            <SubHeading
              subLabel={"Enter your information to create an account"}
            />
            <InputBox label={"First Name"} placeholder="Ajeeth" />
            <InputBox label={"Last Name"} placeholder="Shinde" />
            <InputBox label={"Email"} placeholder="Shindeajeeth143@gmail.com" />
            <InputBox label={"Password"} placeholder="123456" />
            <div className="pt-4">
              <Button label={"Signup"} />
            </div>
            <BottomComp
              label={"Already have an account?"} buttonText={"Sign in"}
              to={"/signin"}
            />
          </div>
        </div>
      </div>
    );
}

export default Signup;
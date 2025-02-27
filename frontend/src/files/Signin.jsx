import { BottomComp } from "../components/bottomText";
import { Button } from "../components/Button";
import Heading from "../components/heading";
import { InputBox } from "../components/inputBox";
import { SubHeading } from "../components/subHeading";

export const Signin = () => {
    return (
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="bg-white w-80 rounded-lg h-max p-2 hx-4 text-center">
            <Heading label={"Sign In"} />
            <SubHeading
              subLabel={"Enter your credentials to access your account"}
            />
            <InputBox label={"Email"} placeholder={"shindeajeeth@gmail.com"} />
            <InputBox label={"Password"} placeholder={"123456"} />
            <div className="pt-4">
              <Button label={"Sign In"} />
            </div>
            <BottomComp
              label={"Dont have an account"}
              buttonText={"Sign Up"}
              to={"/signup"}
            />
          </div>
        </div>
      </div>
    );
}
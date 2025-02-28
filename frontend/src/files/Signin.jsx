import { BottomComp } from "../components/bottomText";
import { Button } from "../components/Button";
import Heading from "../components/heading";
import { InputBox } from "../components/inputBox";
import { SubHeading } from "../components/subHeading";
import { useState } from "react";
import axios from "axios";

export const Signin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="bg-white w-80 rounded-lg h-max p-2 hx-4 text-center">
            <Heading label={"Sign In"} />
            <SubHeading
              subLabel={"Enter your credentials to access your account"}
            />
            <InputBox onChange={e => {
                setUsername(e.target.value)
            }} label={"Email"} placeholder={"shindeajeeth@gmail.com"} />
            <InputBox onChange={e => {
                setPassword(e.target.value);
            }} label={"Password"} placeholder={"123456"} />
            <div className="pt-4">
              <Button onClick={() => {
                axios.post("htpp://localhost:3000/api/v1/user/signin", {
                    username,
                    password
                })
              }} label={"Sign In"} />
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
import { useState } from "react";
import { BottomComp } from "../components/bottomText";
import { Button } from "../components/Button";
import  Heading  from "../components/heading";
import { InputBox } from "../components/inputBox";
import { SubHeading } from "../components/subHeading";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    return (
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Signup"} />
            <SubHeading
              subLabel={"Enter your information to create an account"}
            />
            <InputBox onChange={e => {
                setFirstName(e.target.value)
            }} label={"First Name"} placeholder="Ajeeth" />
            <InputBox onChange={e => {
                setLastName(e.target.value);
            }}label={"Last Name"} placeholder="Shinde" />
            <InputBox onChange={e => {
                setUsername(e.target.value);
            }} label={"Email"} placeholder="Shindeajeeth143@gmail.com" />
            <InputBox onChange={e => {
                setPassword(e.target.value);
            }} label={"Password"} placeholder="123456" />
            <div className="pt-4">
              <Button onClick={async() => {
                 await axios.post("http://localhost:3000/api/v1/user/signup", {
                    firstName,
                    lastName,
                    password,
                    username
                });
                navigate("/signin")
              }} label={"Signup"} />
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
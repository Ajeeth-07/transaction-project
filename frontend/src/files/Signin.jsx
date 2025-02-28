import { BottomComp } from "../components/bottomText";
import { Button } from "../components/Button";
import Heading from "../components/heading";
import { InputBox } from "../components/inputBox";
import { SubHeading } from "../components/subHeading";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const navigate = useNavigate();
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
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Email"}
            placeholder={"shindeajeeth@gmail.com"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"123456"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                try {
                  const res = await axios.post(
                    "http://localhost:3000/api/v1/user/signin",
                    {
                      username,
                      password,
                    }
                  );
                  if (res.status === 200) {
                    localStorage.setItem("token", res.data.token);
                    navigate("/dashboard");
                  }
                } catch (err) {
                  console.error("Error: " + err);
                }
              }}
              label={"Sign In"}
            />
          </div>
          <BottomComp
            label={"Dont have an account"}
            buttonText={"Sign Up"}
            to={"/"}
          />
        </div>
      </div>
    </div>
  );
};

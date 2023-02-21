import React from "react";
import logo from "../assets/logowhite.png";
import { GoogleLogin } from "@react-oauth/google";
// 用来解析 Google登录 返回的token值
import jwt_decode from "jwt-decode";

const LOGIN_BG_VIDEO_URL =
  "https://www.apple.com/105/media/us/iphone-se/2020/90024c0f-285a-4bf5-af04-2c38de97b06e/anim/arcade-loop/large.mp4";

const Login = () => {
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={LOGIN_BG_VIDEO_URL}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0  bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" className="opacity-80" />
          </div>

          <div className="shadow-2xl opacity-80 translate-y-6">
            <GoogleLogin
              onSuccess={(res) => {
                // JWT_内容解码
                const result = jwt_decode(res?.credential);
                console.log(JSON.stringify(result));
                localStorage.setItem("user", JSON.stringify(result));
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

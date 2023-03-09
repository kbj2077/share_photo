import React from "react";
import LOGO from "../assets/logowhite.png";
import { GoogleLogin } from "@react-oauth/google";
// 用来解析 Google登录 返回的token值
import jwt_decode from "jwt-decode";
import { LOGIN_BG_VIDEO } from "../utils/data";

import { client } from "../client";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={LOGIN_BG_VIDEO}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        {/* Google OAuth login */}
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0  bg-blackOverlay">
          <div className="p-5">
            <img src={LOGO} width="130px" alt="logo" className="opacity-80" />
          </div>

          <div className="shadow-2xl opacity-80 translate-y-6">
            <GoogleLogin
              onSuccess={(res) => {
                // JWT_内容解码
                const { sub, picture, name } = jwt_decode(res?.credential);
                const doc = {
                  _id: sub,
                  _type: "user",
                  image: picture,
                  userName: name,
                };
                // 将用户信息存放到sanity数据库里面
                client.createIfNotExists(doc).then(() => {
                  localStorage.setItem("user", JSON.stringify(doc));
                  navigate("/", { replace: true });
                });
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

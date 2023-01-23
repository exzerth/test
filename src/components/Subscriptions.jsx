import Axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { RxCaretRight } from "react-icons/rx";
import { TbRefresh, TbChecks } from "react-icons/tb";
import { RiPaypalFill } from "react-icons/ri"
import avatarImg from "../images/avatar.svg"

export default function Subscriptions() {
  let { username } = useParams();


  const [error, setError] = useState(false);
  const [Loading, setLoading] = useState(false);
  console.log("🚀 ~ file: subscriptions.jsx:14 ~ Subscriptions ~ error", error)
  console.log("🚀 ~ file: subscriptions.jsx:14 ~ Subscriptions ~ error", username)

  const navigate = useNavigate();

  const getStartingDay = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    return today
  };



  const handelOnClick = async () => {
    setLoading(true)
    const options = {
      method: "GET",
      url: "https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile",
      params: { ig: username, response_type: "short", corsEnabled: "true" },
      headers: {
        "X-RapidAPI-Key": "47e2a82623msh562f6553fe3aae6p10b5f4jsn431fcca8b82e",
        "X-RapidAPI-Host": "instagram-bulk-profile-scrapper.p.rapidapi.com",
      },
    };

    const userResults = await Axios.request(options);
    console.log("🚀 ~ file: subscriptions.jsx:44 ~ handelOnClick ~ userResults", userResults)

    if (userResults.data[0].name === "INVALID_USERNAME") return setError(true);
    const { data: { user } } = await supabase.auth.getUser()
    console.log("🚀 ~ file: subscriptions.jsx:46 ~ handelOnClick ~ user", user)
    
    const data = await supabase
      .from("users")
      .update({ username,
         followers: userResults?.data[0].follower_count ,
         following : userResults?.data[0].following_count,
         profile_pic_url : userResults?.data[0]?.profile_pic_url,
         is_verified : userResults?.data[0]?.is_verified,
         biography : userResults?.data[0]?.biography,
         start_time : getStartingDay(),
         posts : userResults?.data[0].media_count
        }).eq('user_id', user.id);
    console.log("🚀 ~ file: subscriptions.jsx:52 ~ handelOnClick ~ data", data)

    setLoading(false)
    navigate(`/dashboard/${user.id}`);

  };
  return (
    <>
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center mt-20">
        <div className="flex gap-5 text-semibold mb-20">
          <p className="opacity-40 text-sm font-bold">Select Your Account</p>
          <div className="rounded-[4px] bg-[#D9D9D9] relative w-5 h-5 cursor-pointer">
            <RxCaretRight className="absolute text-[#8C8C8C] font-semibold text-lg"/>
          </div>
          <p className="text-primaryblue opacity-40 text-sm font-bold">Complete Setup</p>
          <div className="rounded-[4px] bg-[#D9D9D9] relative w-5 h-5 cursor-pointer">
            <RxCaretRight className="absolute text-[#8C8C8C] font-semibold text-lg"/>
          </div>
          <p className="text-gray20 opacity-40 text-sm font-bold">Enter Dashboard</p>
        </div>

          <div className="grid grid-cols-2 justify-center gap-8 mb-12">
            <div>
              {/* instagram name */}
              <div className="shadow-subs flex justify-between items-center mb-10 py-6 px-7 rounded-[10px]">
                <div className="flex gap-[14px]">
                  <img width={90} height={90} src={avatarImg} alt="" />
                  <div className="text-gray20 pt-4">
                    <p className="font-bold text-lg">@{username}</p>
                    <p className="font-medium text-sm">Full name</p>
                  </div>
                </div>
                <div className="rounded-[4px] bg-[#D9D9D9] p-3 relative w-10 h-10 cursor-pointer">
                  <TbRefresh className="absolute text-[#8C8C8C] font-semibold"/>
                </div>
              </div>

              {/* Payment method */}
              <div className="shadow-subs px-7 py-6 rounded-[10px]">
                <h3 className="font-bold text-[20px] text-gray20 pb-2">Payment method</h3>
                <p className="font-bold text-sm opacity-40 pb-5">
                  You may cancel during your free trial and won't be billed,
                  no risk.
                </p>
                <button className="bg-[#2255FF] w-full py-4 rounded-[10px] text-base text-white font-bold mb-4" onClick={() => handelOnClick()}>
                  <span> {Loading ?  "Loading " : "Card / Debit Card"}  </span>
                </button>

                <button className="bg-[#FFC439] w-full py-4 rounded-[10px] text-base text-white font-bold relative" onClick={() => handelOnClick()}>
                  <RiPaypalFill className="text-[#003087] text-2xl absolute top-[25%] left-[38%]" />
                  {Loading ? "Loading" : "Paypal"} 
                </button>
              </div>
            </div>

            <div className="shadow-subs px-7 py-6 rounded-[10px]">
              <p className="bg-bgicongreen rounded-[70px] text-btngreen font-bold text-sm py-[6px] px-4 w-36">7-Day Free Trial</p>
              <h3 className="font-bold text-[20px] mt-4 mb-3">Start Your 7-Day Trial</h3>
              <p className="font-bold text-sm opacity-40 mb-4">
                It's time to get the real exposure you've been waiting for. After
                signing up, you will be introduced to your personal account manager
                and start growing in under 2 minutes.
              </p>
              <h2 className="font-bold text-[40px] ">Free</h2>
              <p className="text-sm opacity-40 font-normal">Then $24.99 per week, billed monthly.</p>
              <ul className="pt-8">
                <li className="flex gap-3 items-center mb-3">
                  <div className="rounded-[50%] bg-bgicongreen p-3 relative w-10 h-10 cursor-pointer">
                    <TbChecks className="absolute text-btngreen font-semibold"/>
                  </div>
                  <p className="font-bold text-sm opacity-40">Grow ~1-10k Real Monthly Followers</p>
                </li>
                <li className="flex gap-3 items-center mb-3">
                  <div className="rounded-[50%] bg-bgicongreen p-3 relative w-10 h-10 cursor-pointer">
                    <TbChecks className="absolute text-btngreen font-semibold"/>
                  </div>
                  <p className="font-bold text-sm opacity-40">Target Followers Relevant To You</p>
                </li>
                <li className="flex gap-3 items-center mb-3">
                  <div className="rounded-[50%] bg-bgicongreen p-3 relative w-10 h-10 cursor-pointer">
                    <TbChecks className="absolute text-btngreen font-semibold"/>
                  </div>
                  <p className="font-bold text-sm opacity-40">Detailed Analytics & Results Tracking</p>
                </li>
                <li className="flex gap-3 items-center mb-3">
                  <div className="rounded-[50%] bg-bgicongreen p-3 relative w-10 h-10 cursor-pointer">
                    <TbChecks className="absolute text-btngreen font-semibold"/>
                  </div>
                  <p className="font-bold text-sm opacity-40">Automated 24/7 Growth, Set & Forget</p>
                </li>
                <li className="flex gap-3 items-center mb-3">
                  <div className="rounded-[50%] bg-bgicongreen p-3 relative w-10 h-10 cursor-pointer">
                    <TbChecks className="absolute text-btngreen font-semibold"/>
                  </div>
                  <p className="font-bold text-sm opacity-40">No Fakes Or Bots, 100% Real People</p>
                </li>
                <li className="flex gap-3 items-center mb-3">
                  <div className="rounded-[50%] bg-bgicongreen p-3 relative w-10 h-10 cursor-pointer">
                    <TbChecks className="absolute text-btngreen font-semibold"/>
                  </div>
                  <p className="font-bold text-sm opacity-40">Personal Account Manager</p>
                </li>
                <li className="flex gap-3 items-center mb-3">
                  <div className="rounded-[50%] bg-bgicongreen p-3 relative w-10 h-10 cursor-pointer">
                    <TbChecks className="absolute text-btngreen font-semibold"/>
                  </div>
                  <p className="font-bold text-sm opacity-40">Boost Likes, Comments & DMs</p>
                </li>
                <li className="flex gap-3 items-center mb-3">
                  <div className="rounded-[50%] bg-bgicongreen p-3 relative w-10 h-10 cursor-pointer">
                    <TbChecks className="absolute text-btngreen font-semibold"/>
                  </div>
                  <p className="font-bold text-sm opacity-40">Safest Instagram Growth Service</p>
                </li>
                <li className="flex gap-3 items-center mb-3">
                  <div className="rounded-[50%] bg-bgicongreen p-3 relative w-10 h-10 cursor-pointer">
                    <TbChecks className="absolute text-btngreen font-semibold"/>
                  </div>
                  <p className="font-bold text-sm opacity-40">Access Dashboard On All Devices</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

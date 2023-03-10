import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function Settings() {
  
  const [supaData, setData] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  console.log("🚀 ~ file: Settings.jsx:12 ~ Settings ~ error", error)

  useEffect(() => {
    const getData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return Navigate("/login");
      setEmail(user.email);
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("user_id", user.id);
      setData(data[0]);
      setError(error);
    };

    getData();
  }, []);

  const onUpdate = async () => {
    setloading(true)
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const data = await supabase
      .from("users")
      .update({
        full_name: fullname.length  ? fullname : supaData.full_name,
      }).eq("user_id", user.id);
    console.log("🚀 ~ file: Settings.jsx:41 ~ onUpdate ~ data", data)

    if (newEmail.length > 4) {
      if (newEmail !== email) {
        console.log("noo")
        const { data, error } = await supabase.auth.updateUser({
          email: newEmail,
        });
        alert("check your email and click on the confirmation link")
        console.log("🚀 ~ file: Settings.jsx:46 ~ onUpdate ~ data", data);
        console.log("🚀 ~ file: Settings.jsx:46 ~ onUpdate ~ error", error);
      }
    }
    setloading(false)

  };

  return (
    <div className="container m-auto mt-9 px-6">
      <div class="grid justify-center items-center bg-white mb-5">
        <div class="flex justify-center items-center py-3">
          <img src={supaData.profile_pic_url} className="w-32 h-w-32 object-cover rounded-[50%] mb-10" alt="" />
        </div>
        <h4 class="pb-4 text-gray20 font-bold text-[20px]">Account settings</h4>
        <div class="py-2">
          <div class="form-outline mb-4">
            <input
              type="text"
              class="bg-inputbkgrd rounded-[10px] py-4 px-4 w-full"
              value={fullname}
              onChange={({target}) => setFullname(target.value)}
              placeholder={supaData.full_name}
            />
          </div>
          <div class="form-outline mb-4">
            <input
              type="text"
              value={newEmail}
              onChange={({target})=> setNewEmail(target.value) }
              class="bg-inputbkgrd rounded-[10px] py-4 px-4  w-full"
              placeholder={email}
            />
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="bg-inputbkgrd rounded-[10px] py-4 px-4  w-full"
              placeholder="Password"
            />
          </div>
          <div class="py-3 pb-4 d-flex ">
            <button class="bg-secondaryblue font-bold text-base text-white rounded-[10px] py-3 w-full" onClick={()=> onUpdate() } > {loading ? "Loading..." : "Save Changes" }</button>
          </div>

          <div className="shadow-subs w-full mb-8 mt-10 rounded-[10px]">
            <div className="px-4 py-5">
              <h3 className="font-bold text-xl text-gray20 pb-2">Subscription Settings</h3>
              <p className="font-bold text-sm opacity-40 pb-9">Here you can renew or cancel your subscription with ease. <br /> You can resubscribe at any time.</p>
              <button className="text-btngreen w-full rounded-[10px] border-solid border-[0.4px] border-black py-3 mb-3">Renew</button>
              <button className="text-btnred w-full rounded-[10px] border-solid border-[0.4px] border-black py-3">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

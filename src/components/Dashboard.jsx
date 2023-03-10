import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Blacklist from "./Blacklist";
import ChartSection from "./ChartSection";
import StatsCard from "./StatsCard";
import StatsSection from "./StatsSection";
import Targeting from "./Targeting";
import Whitelist from "./Whitelist";

const Error = ({ value }) => {
  return (
    <aside style={{ color: "red" }} className="px-3 py-4 px-sm-5">
      The account @{value} was not found on Instagram.
    </aside>
  );
};

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [FilterModal, setFilterModal] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return navigate("/login")
      // console.log(user);
      // console.log("🚀 ~ file: Dashboard.jsx:31 ~ getData ~ user", user)
      const { data, error } = await supabase
        .from('users')
        .select()
        .eq('user_id', user.id).order('created_at', { ascending: false })
      // console.log("🚀 ~ file: Dashboard.jsx:34 ~ getData ~ data", data)
      setData(data)
      setError(error)
    };

    getData();
  }, [id, navigate]);

  // console.log({data});

  const setFilterModalCallback = useCallback(() => {
      setFilterModal(false);
  }, [setFilterModal]);

  if (error) return <Error value={id} />;

  return (
    <div className="container mx-auto px-6">
      <StatsSection
        user_id={data?.[0]?.id}
        username={data?.[0]?.username}
        avatar={data?.[0]?.profile_pic_url}
        isVerified={data?.[0]?.is_verified}
        name={data?.[0]?.full_name}
        bio={data?.[0]?.biography}
        url={`https://www.instagram.com/${data?.[0]?.username}`}
        currMediaCount={data?.[0]?.posts}
        currFollowers={data?.[0]?.followers}
        currFollowing={data?.[0]?.following}
        setFilterModal2={setFilterModalCallback}
        filterModal2={FilterModal}
      />
      <StatsCard />
      <ChartSection
        data={data}
        isPrivate={false}

      />
      <Targeting userId={id}
        avatar={data?.[0]?.profile_pic_url}
        username={data?.[0]?.username}
      />
      <Blacklist userId={id} />
      <Whitelist userId={id} />

    </div>
  );
}

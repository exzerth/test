import { useState } from "react"
import { FaCheckCircle } from "react-icons/fa"
import { Link } from "react-router-dom"
import { numFormatter } from "../helpers"
import profileImg from "../images/profile.svg"
import settingsImg from "../images/settings.svg"
import ModalNew from "./ModalNew"

 
const StatsSection = ({ avatar, username, isVerified, name, bio, url, user_id, currMediaCount, currFollowers, currFollowing}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

    return (
      <div className="shadow-stats mt-[84px] md:py-7 md:px-16">
        <div className="lg:flex md:grid md:grid-cols-1 md:gap-8 justify-between px-3 py-4 px-sm-5">
          {/* Image Col */}
          <div className="grid grid-cols-1 justify-center lg:flex lg:flex-1 lg:items-center ">
            <img className="m-auto rounded-[50%]" src={avatar} alt={username?.charAt(0)?.toUpperCase()} crossOrigin = "Anonymous" />
            <div className="m-auto lg:ml-8">
              <h4 className="font-semibold text-[22px] text-gray20 text-center lg:text-start">{name}</h4>
              <div className="flex gap-[2px] m-auto text-center">
                <p className="font-normal text-sm text-gray20">{username}</p>
                <FaCheckCircle className="fas fa-check-circle fa-lg ml-2 text-primary" style={{ visibility: isVerified ? 'visible' : 'hidden' }} />
              </div>
              <div className="mt-3 w-[300px] font-normal opacity-50 text-sm mb-4">{bio}</div>
              <a href={url} target="_blank" rel="noopener noreferrer" className="font-normal text-[13px] underline mt-1">{url}</a>
            </div>
          </div>
          {/* Stats Col */}
          <div className="Dashboard__stats__description">
    
            <div className="flex items-center gap-14 mb-8">
              <div className="">
                <h2 className="font-semibold text-[28px] text-gray20">{numFormatter(currFollowers ? currFollowers : 0)}</h2>
                <p className="font-normal text-sm opacity-50">Followers</p>
              </div>
    
              <div>
                <h2 className="font-semibold text-[28px] text-gray20">{numFormatter(currFollowing ? currFollowing : 0)}</h2>
                <p className="font-normal text-sm opacity-50">Following</p>
              </div>

              <div className="">
                <h2 className="font-semibold text-[28px] text-gray20">{numFormatter(currMediaCount ? currMediaCount : 0)}</h2>
                <p className="font-normal text-sm opacity-50">Posts</p>
              </div>
            </div>
            <div className="flex gap-6 lg:justify-end md:justify-start">
              <Link className="font-normal text-sm" to={"/dashboard/" + user_id}>
              <img className="bg-[#D9D9D9] p-3 rounded-[4px]" src={profileImg} alt="" />
              </Link>
              <img className="bg-[#D9D9D9] p-3 rounded-[4px]" src={settingsImg} alt="" onClick={() => { setIsOpen(!modalIsOpen)}}/>
              <ModalNew 
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
      </div>
    )
  }
  

  export default StatsSection
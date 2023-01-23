import { FaCheckCircle } from "react-icons/fa"
import { numFormatter } from "../helpers"
import avatarImg from "../images/avatar.svg"
import profileImg from "../images/profile.svg"
import settingsImg from "../images/settings.svg"

 
const StatsSection = ({avatar, username, isVerified, name, bio, url ,  currMediaCount, currFollowers, currFollowing}) => {
console.log("🚀 ~ file: StatsSection.jsx:6 ~ StatsSection ~ ", avatar)

    return (
      <div className="shadow-stats mt-[84px] py-7 px-16">
        <div className="flex justify-between px-3 py-4 px-sm-5">
          {/* Image Col */}
          <div className="flex flex-1 items-center">
            <img className="Dashboard__avatar rounded-circle" src={avatarImg} alt={username} crossOrigin = "Anonymous" />
            <div className="ml-8">
              <h4 className="font-semibold text-[22px] text-gray20">{name}</h4>
              <div className="flex gap-[2px]">
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
            <div className="flex gap-6 justify-end">
              <img className="bg-[#D9D9D9] p-3 rounded-[4px]" src={profileImg} alt="" />
              <img className="bg-[#D9D9D9] p-3 rounded-[4px]" src={settingsImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    )
  }
  

  export default StatsSection
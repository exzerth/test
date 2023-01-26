import { useState } from 'react';
import Modal from 'react-modal';
import { IoClose, IoPowerOutline } from 'react-icons/io5';
import { BsPersonPlus, BsPersonDash } from "react-icons/bs"
import avatarImg from "../images/avatar.svg";
import flashImg from "../images/flash.svg"
import "../../src/modalsettings.css"

Modal.setAppElement('#root');

const ModalNew = ({ modalIsOpen, setIsOpen, avatar }) => {
  const [value, setValue] = useState("");
  const [instagramPassword, setInstagramPassword] = useState("");

  const toggleValue = (newValue) => {
    setValue(value === newValue ? '' : newValue);
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      className="modal_content"
      overlayClassName="modal_overlay"
      contentLabel="Dashboard Modal"
    >
      <div className="modal_form_wrapper relative">
        <div className="modal_nav absolute top-0 right-0">
          <IoClose
            className="modal_close_icon text-[30px]"
            onClick={() => {
              setIsOpen(!modalIsOpen);
            }}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <img className='w-[100px] h-[100px] md:w-[140px] md:h-[140px] mb-1 rounded-full' src={avatar || avatarImg} alt="" />
          <h2 className='font-bold text-gray20 text-base mb-1'>@instagram</h2>
          <input className='bg-[#f8f8f8] text-center rounded-[10px] w-full md:w-[403px] placeholder:text-center py-5 md:py-6' type="text" placeholder='Instagram Password'
            value={instagramPassword}
            onChange={(e) => {
              setInstagramPassword(e.target.value)
            }}
          />
          <div className={`mt-7 rounded-[10px] border-[0.4px] border-solid flex ${value === "Auto Mode" ? "flex-col md:flex-row gap-7 md:gap-11" : "gap-12 md:gap-[71px] lg:gap-[81px]"} w-full px-8 py-4 md:px-10 lg:px-16 my-4 ${value === "Auto Mode" ? "shadow-automode rounded-[10px] border-[2px] border-gray20 border-solid" : ""}`} onClick={() => toggleValue("Auto Mode")}>
            <img className={value !== "Auto Mode" ? "w-[30px] h-[30px]" : "w-[85px] h-[85px] m-auto md:mt-[3%] md:m-0"} src={flashImg} alt="" />
            <div className="text-gray20">
              <h1 className='font-semibold text-[22px] pb-1 text-center md:text-start'>Auto Mode</h1>
              {value === "Auto Mode" && (
                <p className='font-normal text-sm w-full text-center md:text-start'>This setting will follow and unfollow relevant users using the targets you have selected. We will automatically unfollow users after 3 days to keep your following number low and healthy. We will never unfollow anyone that you manually followed yourself.</p>
              )}
            </div>
          </div>
          <div className={`rounded-[10px] border-[0.4px] border-solid flex ${value === "Follow Mode" ? "flex-col md:flex-row gap-5 md:gap-11" : "gap-12 md:gap-[71px] lg:gap-[81px]"} w-full px-8 py-4 md:px-10 lg:px-16 my-4 ${value === "Follow Mode" ? "shadow-automode rounded-[10px] border-[2px] border-gray20 border-solid" : ""}`} onClick={() => toggleValue("Follow Mode")}>
            <BsPersonPlus className={value !== "Follow Mode" ? "align-middle text-3xl" : "text-[85px] m-auto md:mt-[4%] md:m-0"} />
            <div className="text-gray20">
              <h1 className='font-semibold text-[22px] pb-1 text-center md:text-start'>Follow Mode</h1>
              {value === "Follow Mode" && (
                <p className='font-normal text-sm w-full md:w-[384px] text-center md:text-start'>In ‘Follow Mode,’ your account will continue following
                  users until it reaches Instagram's maximum ‘Following’
                  limit (which is 7500). From there, interactions on our end
                  will stop and you will have to manually change your
                  interaction settings to continue experiencing results (to
                  either ‘Recommended’ or ‘Unfollow Mode’)
                </p>
              )}
            </div>
          </div>
          <div className={`rounded-[10px] border-[0.4px] border-solid flex ${value === "Unfollow Mode" ? "flex-col md:flex-row gap-5 md:gap-11" : "gap-12 md:gap-[71px] lg:gap-[81px]"} w-full px-8 py-4 md:px-10 lg:px-16 my-4 ${value === "Unfollow Mode" ? "shadow-automode rounded-[10px] border-[2px] border-gray20 border-solid" : ""}`} onClick={() => toggleValue("Unfollow Mode")}>
            <BsPersonDash className={value !== "Unfollow Mode" ? "align-middle text-3xl" : "text-[85px] m-auto md:mt-[2%] md:m-0"} />
            <div className="text-gray20">
              <h1 className='font-semibold text-[22px] pb-1 text-center md:text-start'>Unfollow Mode</h1>
              {value === "Unfollow Mode" && (
                <p className='font-normal text-sm w-full md:w-[484px] text-center md:text-start'>
                  In ‘Unfollow Mode,’ your account will unfollow all of the
                  users we automatically followed for you. This will not
                  unfollow users that you personally followed, before or
                  after joining us. If you want to unfollow every account,
                  please contact your account manager.
                </p>
              )}
            </div>
          </div>
          <div className={`rounded-[10px] border-[0.4px] border-solid flex ${value === "Turn Off" ? "flex-col md:flex-row gap-5 md:gap-11" : "gap-12 md:gap-[71px] lg:gap-[81px]"} w-full px-8 py-4 md:px-10 lg:px-16 my-4 ${value === "Turn Off" ? "shadow-automode rounded-[10px] border-[2px] border-gray20 border-solid" : ""}`} onClick={() => toggleValue("Turn Off")}>
            <IoPowerOutline className={value !== "Turn Off" ? "align-middle text-3xl" : "text-[85px] m-auto md:mt-[3%] md:m-0"} />
            <div className="text-gray20">
              <h1 className='font-semibold text-[22px] pb-1 text-center md:text-start'>Turn Off</h1>
              {value === "Turn Off" && (
                <p className='font-normal text-sm w-full md:w-[484px] text-center md:text-start'>
                  Turning on this setting will pause all interactions on
                  your account and you will not experience growth. Your
                  subscription will remain active, even if you turn
                  interactions off for a period of time. Use our
                  ‘Recommended’ settings for optimal results.
                </p>
              )}
            </div>
          </div>
          <button className='rounded-[10px] bg-secondaryblue font-bold text-base py-4 w-full md:w-[400px] text-white' onClick={(e) => {
            e.preventDefault()
            setIsOpen(!modalIsOpen);
          }}>Save Changes</button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalNew

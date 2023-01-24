import { useState } from 'react';
import Modal from 'react-modal';
import { IoClose, IoPowerOutline } from 'react-icons/io5';
import { BsPersonPlus, BsPersonDash } from "react-icons/bs"
import avatarImg from "../images/avatar.svg";
import flashImg from "../images/flash.svg"
import "../../src/modalsettings.css"

Modal.setAppElement('#root');

const ModalNew = ({modalIsOpen, setIsOpen}) => {
  const [value, setValue] = useState("");
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
                className="modal_close_icon"
                onClick={() => {
                  setIsOpen(!modalIsOpen);
                }}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
                <img src={avatarImg} alt="" />
                <h2 className='font-bold text-gray20 text-base'>@instagram</h2>
                <input className='bg-[#f8f8f8] rounded-[10px] w-[403px] placeholder:text-center py-6' type="text" placeholder='Instagram Password' />
                <div className={`p-9 mt-7 rounded-[10px] border-[0.4px] border-solid flex ${value === "Auto Mode" ? "gap-11" : "gap-[81px]"} w-full py-4 px-16 my-4 ${value === "Auto Mode" ? "shadow-automode rounded-[10px] border-[2px] border-gray20 border-solid" : ""}`} onClick={() => toggleValue("Auto Mode")}>
                    <img className={value !== "Auto Mode" ? "w-[30px] h-[30px]" : ""} src={flashImg} alt="" />
                    <div className="text-gray20">
                        <h1 className='font-semibold text-[22px] pb-1'>Auto Mode</h1>
                        {value === "Auto Mode" && (
                          <p className='font-normal text-sm w-[484px]'>This setting will follow and unfollow relevant users using the targets you have selected. We will automatically unfollow users after 3 days to keep your following number low and healthy. We will never unfollow anyone that you manually followed yourself.</p>
                        )}
                    </div>
                </div>
                <div className={`rounded-[10px] border-[0.4px] border-solid flex ${value === "Follow Mode" ? "gap-11" : "gap-[81px]"} w-full py-4 px-16 my-4 ${value === "Follow Mode" ? "shadow-automode rounded-[10px] border-[2px] border-gray20 border-solid" : ""}`} onClick={() => toggleValue("Follow Mode")}>
                    <BsPersonPlus className={value !== "Follow Mode" ? "align-middle text-3xl" : "text-[85px]"}/>
                    <div className="text-gray20">
                      <h1 className='font-semibold text-[22px] pb-1'>Follow Mode</h1>
                      {value === "Follow Mode" && (
                        <p className='font-normal text-sm w-[484px]'>In ‘Follow Mode,’ your account will continue following
                        users until it reaches Instagram's maximum ‘Following’
                        limit (which is 7500). From there, interactions on our end
                        will stop and you will have to manually change your
                        interaction settings to continue experiencing results (to
                        either ‘Recommended’ or ‘Unfollow Mode’)
                        </p>
                      )}
                    </div>
                </div>
                <div className={`rounded-[10px] border-[0.4px] border-solid flex ${value === "Unfollow Mode" ? "gap-11" : "gap-[81px]"} w-full py-4 px-16 my-4 ${value === "Unfollow Mode" ? "shadow-automode rounded-[10px] border-[2px] border-gray20 border-solid" : ""}`} onClick={() => toggleValue("Unfollow Mode")}>
                    <BsPersonDash className={value !== "Unfollow Mode" ? "align-middle text-3xl" : "text-[85px]"}/>
                    <div className="text-gray20">
                      <h1 className='font-semibold text-[22px] pb-1'>Unfollow Mode</h1>
                      {value === "Unfollow Mode" && (
                        <p className='font-normal text-sm w-[484px]'>
                        In ‘Unfollow Mode,’ your account will unfollow all of the
                        users we automatically followed for you. This will not
                        unfollow users that you personally followed, before or
                        after joining us. If you want to unfollow every account,
                        please contact your account manager.
                        </p>
                      )}
                    </div>
                </div>
                <div className={`rounded-[10px] border-[0.4px] border-solid flex ${value === "Turn Off" ? "gap-11" : "gap-[81px]"} w-full py-4 px-16 my-4 ${value === "Turn Off" ? "shadow-automode rounded-[10px] border-[2px] border-gray20 border-solid" : ""}`} onClick={() => toggleValue("Turn Off")}>
                    <IoPowerOutline className={value !== "Turn Off" ? "align-middle text-3xl" : "text-[85px]"}/>
                    <div className="text-gray20">
                      <h1 className='font-semibold text-[22px] pb-1'>Turn Off</h1>
                      {value === "Turn Off" && (
                        <p className='font-normal text-sm w-[484px]'>
                        Turning on this setting will pause all interactions on
                        your account and you will not experience growth. Your
                        subscription will remain active, even if you turn
                        interactions off for a period of time. Use our
                        ‘Recommended’ settings for optimal results.
                        </p>
                      )}
                    </div>
                </div>
                <button className='rounded-[10px] bg-secondaryblue font-bold text-base py-4 w-[400px] text-white' onClick={(e) => {
                  e.preventDefault()
                  setIsOpen(!modalIsOpen);
                }}>Save Changes</button>
            </div>
          </div>
        </Modal>
      );
}

export default ModalNew

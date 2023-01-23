import Modal from 'react-modal';
import { IoClose, IoPowerOutline } from 'react-icons/io5';
import { BsPersonPlus, BsPersonDash } from "react-icons/bs"
import avatarImg from "../images/avatar.svg";
import flashImg from "../images/flash.svg"
import "../../src/modalsettings.css"

Modal.setAppElement('#root');

const ModalNew = ({modalIsOpen, setIsOpen}) => {
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
                <div className="shadow-automode rounded-[10px] border-[2px] border-solid border-gray20 p-9 mt-7">
                    <div className="flex gap-11">
                        <img src={flashImg} alt="" />
                        <div className="text-gray20">
                            <h1 className='font-semibold text-[22px]'>Auto Mode</h1>
                            <p className='font-normal text-sm w-[484px]'>This setting will follow and unfollow relevant users using the targets you have selected. We will automatically unfollow users after 3 days to keep your following number low and healthy. We will never unfollow anyone that you manually followed yourself.</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-[10px] border-[0.4px] border-solid flex gap-[81px] w-full py-4 px-16 my-4">
                    <BsPersonPlus className='align-middle text-3xl'/>
                    <h1 className='font-semibold text-[22px]'>Follow Mode</h1>
                </div>
                <div className="rounded-[10px] border-[0.4px] border-solid flex gap-[81px] w-full py-4 px-16 mb-4">
                    <BsPersonDash className='align-middle text-3xl'/>
                    <h1 className='font-semibold text-[22px]'>Unfollow Mode</h1>
                </div>
                <div className="rounded-[10px] border-[0.4px] border-solid flex gap-[81px] w-full py-4 px-16 mb-4">
                    <IoPowerOutline className='align-middle text-3xl'/>
                    <h1 className='font-semibold text-[22px]'>Turn Off</h1>
                </div>
                <button className='rounded-[10px] bg-secondaryblue font-bold text-base py-4 w-[400px] text-white'>Save Changes</button>
            </div>
          </div>
        </Modal>
      );
}

export default ModalNew

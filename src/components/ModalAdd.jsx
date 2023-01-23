import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import "../../src/modalsettings.css"

Modal.setAppElement('#root');

const ModalAdd = ({modalIsOpen, setIsOpen, title, subtitle, extraSubtitle}) => {
    return (
        <Modal
          isOpen={modalIsOpen}
          className="modal_add_content"
          overlayClassName="modal_add_overlay"
          contentLabel="Modal"
        >
          <div className="modal_form_wrapper relative">
            <div className="flex justify-end">
              <IoClose
                className="text-[30px] text-[#8c8c8c]"
                onClick={() => {
                  setIsOpen(!modalIsOpen);
                }}
              />
            </div>
            <div className="grid justify-center items-center">
                <h1 className='font-bold text-black text-[40px] text-center pb-3'>{title}</h1>
                <p className='font-bold text-sm opacity-40 text-center px-[100px]'>{subtitle}</p>
                <div className="flex justify-center items-center relative pt-8">
                    <input className='w-[600px] bg-inputbkgrd rounded py-[25px] pl-7 font-semibold' placeholder='@username' type="text" />
                    <button className='absolute top-[38%] right-[13%] bg-black w-40 py-4 font-semibold rounded text-white'>Add</button>
                </div>
                <p className='font-bold text-sm opacity-40 text-center px-[120px] pt-14'>{extraSubtitle}</p>
            </div>
          </div>
        </Modal>
      );
}

export default ModalAdd

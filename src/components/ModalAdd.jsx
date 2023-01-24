/* eslint-disable */
import { useState, useEffect } from 'react';
import { supabase } from "../supabaseClient";
import Modal from 'react-modal';
import { Typeahead } from "react-bootstrap-typeahead"
import { IoClose } from 'react-icons/io5';
import "../../src/modalsettings.css"
import { InputGroup, Spinner } from 'react-bootstrap';
import { getAccount, searchAccount } from '../helpers';
import { Button } from 'bootstrap';

Modal.setAppElement('#root');

const ModalAdd = ({ modalIsOpen, setIsOpen, title, subtitle, extraSubtitle, userId }) => {

  const [whitelistAccounts, setWhitelistAccounts] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [selectAccountName, setSelectedAccountName] = useState("");
  const [searchAccounts, setSearchAccounts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);

    const insertWhitelist = async () => {
    setLoading(true);
    if (selectAccountName.length > 0) {
      const theAccount = await getAccount(selectAccountName);
      const { error } = await supabase.from("whitelist").insert({
        account: selectAccountName,
        followers: theAccount.data[0].follower_count,
        avatar: theAccount.data[0].profile_pic_url,
        user_id: userId,
      });
      console.log(
        "🚀 ~ file: Whitelist.jsx:33 ~ const{error}=awaitsupabase.from ~ error",
        error
      );

      setAccountName("");
      setSelectedAccountName("");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accountName.length > 0) {
      setLoadingSpinner(true)
      const getData = async () => {
        const data = await searchAccount(accountName);
        setSearchAccounts(data.data[0].users);
        setLoadingSpinner(false)

      };
      getData();
    }
  }, [accountName]);

  useEffect(() => {
    const getTargetingAccounts = async () => {
      const { data, error } = await supabase
        .from("whitelist")
        .select()
        .eq("user_id", userId);
      console.log(
        "🚀 ~ file: Whitelist.jsx:55 ~ getTargetingAccounts ~ error",
        error
      );
      setWhitelistAccounts(data);
    };

    getTargetingAccounts();
  }, [selectAccountName]);

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
            <div className="flex gap-3">
              <div>@</div>
              <Typeahead className='w-[600px] bg-inputbkgrd rounded py-[25px] pl-7 font-semibold'
                onInputChange={(text) => setAccountName(text)}
                id="pk"
                onChange={(selected) => {
                  setSelectedAccountName(selected[0]?.username);
                }}
                labelKey="username"
                options={searchAccounts} />
            </div>
            <button className='absolute top-[38%] right-[13%] bg-black w-40 py-4 font-semibold rounded text-white'
              onClick={() => insertWhitelist()}
            >{loading ? "Loading..." : "Add"}</button>
            {/* <InputGroup className="mb-3 mt-3">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Typeahead
                  onInputChange={(text) => setAccountName(text)}
                  id="pk"
                  onChange={(selected) => {
                    setSelectedAccountName(selected[0]?.username);
                  }}
                  labelKey="username"
                  options={searchAccounts}
                />{" "}
                <div className="ps-2" >
                  {loadingSpinner && (<Spinner animation="border" />)}
                </div>
              </InputGroup>
              <Button
                variant="dark"
                className="mt-5"
                onClick={() => insertWhitelist()}
              >
                {loading ? "Loading..." : "Whitelist Account"}
              </Button> */}
          </div>
          <p className='font-bold text-sm opacity-40 text-center px-[120px] pt-14'>{extraSubtitle}</p>
        </div>
      </div>

      {/* <InputGroup className="mb-3 mt-3">
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  <Typeahead
                    onInputChange={(text) => setAccountName(text)}
                    id="pk"
                    onChange={(selected) => {
                      setSelectedAccountName(selected[0]?.username);
                    }}
                    labelKey="username"
                    options={searchAccounts}
                    />{" "}
                <div className="ps-2" >
                    {loadingSpinner && (<Spinner animation="border" /> )}
                </div>
                </InputGroup>
                <Button
                  variant="dark"
                  className="mt-5"
                  
                >
                  
                </Button> */}
    </Modal>
  );
}

export default ModalAdd


















// /* eslint-disable */
// import { useState, useEffect } from 'react';
// import { supabase } from "../supabaseClient";
// import Modal from 'react-modal';
// import { Typeahead } from "react-bootstrap-typeahead"
// import { IoClose } from 'react-icons/io5';
// import "../../src/modalsettings.css"
// import { InputGroup, Spinner } from 'react-bootstrap';
// import { getAccount, searchAccount } from '../helpers';
// import { Button } from 'bootstrap';

// Modal.setAppElement('#root');

// const ModalAdd = ({modalIsOpen, setIsOpen, title, subtitle, extraSubtitle, userId}) => {

//   const [whitelistAccounts, setWhitelistAccounts] = useState([]);
//   const [accountName, setAccountName] = useState("");
//   const [selectAccountName, setSelectedAccountName] = useState("");
//   const [searchAccounts, setSearchAccounts] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [loadingSpinner, setLoadingSpinner] = useState(false);

//   const insertWhitelist = async () => {
//     setLoading(true);
//     if (selectAccountName.length > 0) {
//       const theAccount = await getAccount(selectAccountName);
//       const { error } = await supabase.from("whitelist").insert({
//         account: selectAccountName,
//         followers: theAccount.data[0].follower_count,
//         avatar: theAccount.data[0].profile_pic_url,
//         user_id: userId,
//       });
//       console.log(
//         "🚀 ~ file: Whitelist.jsx:33 ~ const{error}=awaitsupabase.from ~ error",
//         error
//       );

//       setAccountName("");
//       setSelectedAccountName("");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (accountName.length > 0) {
//       setLoadingSpinner(true)
//       const getData = async () => {
//         const data = await searchAccount(accountName);
//         setSearchAccounts(data.data[0].users);
//       setLoadingSpinner(false)

//       };
//       getData();
//     }
//   }, [accountName]);

//   useEffect(() => {
//     const getTargetingAccounts = async () => {
//       const { data, error } = await supabase
//         .from("whitelist")
//         .select()
//         .eq("user_id", userId);
//       console.log(
//         "🚀 ~ file: Whitelist.jsx:55 ~ getTargetingAccounts ~ error",
//         error
//       );
//       setWhitelistAccounts(data);
//     };

//     getTargetingAccounts();
//   }, [selectAccountName]);

//     return (
//         <Modal
//           isOpen={modalIsOpen}
//           className="modal_add_content"
//           overlayClassName="modal_add_overlay"
//           contentLabel="Modal"
//         >
//           <div className="modal_form_wrapper relative">
//             <div className="flex justify-end">
//               <IoClose
//                 className="text-[30px] text-[#8c8c8c]"
//                 onClick={() => {
//                   setIsOpen(!modalIsOpen);
//                 }}
//               />
//             </div>
//             <div className="grid justify-center items-center">
//                 <h1 className='font-bold text-black text-[40px] text-center pb-3'>{title}</h1>
//                 <p className='font-bold text-sm opacity-40 text-center px-[100px]'>{subtitle}</p>
//                 <div className="flex justify-center items-center relative pt-8">
//                     {/* <Typeahead className='w-[600px] bg-inputbkgrd rounded py-[25px] pl-7 font-semibold' placeholder='@username' type="text" />
//                     <button className='absolute top-[38%] right-[13%] bg-black w-40 py-4 font-semibold rounded text-white'>Add</button> */}
//               <InputGroup className="mb-3 mt-3">
//                 <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
//                 <Typeahead
//                   onInputChange={(text) => setAccountName(text)}
//                   id="pk"
//                   onChange={(selected) => {
//                     setSelectedAccountName(selected[0]?.username);
//                   }}
//                   labelKey="username"
//                   options={searchAccounts}
//                 />{" "}
//                 <div className="ps-2" >
//                   {loadingSpinner && (<Spinner animation="border" />)}
//                 </div>
//               </InputGroup>
//               <Button
//                 variant="dark"
//                 className="mt-5"
//                 onClick={() => insertWhitelist()}
//               >
//                 {loading ? "Loading..." : "Whitelist Account"}
//               </Button>
//                 </div>
//                 <p className='font-bold text-sm opacity-40 text-center px-[120px] pt-14'>{extraSubtitle}</p>
//             </div>
//           </div>

//           {/* <InputGroup className="mb-3 mt-3">
//                   <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
//                   <Typeahead
//                     onInputChange={(text) => setAccountName(text)}
//                     id="pk"
//                     onChange={(selected) => {
//                       setSelectedAccountName(selected[0]?.username);
//                     }}
//                     labelKey="username"
//                     options={searchAccounts}
//                     />{" "}
//                 <div className="ps-2" >
//                     {loadingSpinner && (<Spinner animation="border" /> )}
//                 </div>
//                 </InputGroup>
//                 <Button
//                   variant="dark"
//                   className="mt-5"
                  
//                 >
                  
//                 </Button> */}
//         </Modal>
//       );
// }

// export default ModalAdd

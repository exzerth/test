/* eslint-disable */
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import {
  Button,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { countDays, deleteAccount, getAccount, numFormatter, searchAccount } from "../helpers";
import { supabase } from "../supabaseClient";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import TargetingFilterModal from "./TargetingFilterModal";
//import CustomSettingsModal from "./CustomSettingsModal";
import ModalNew from "./ModalNew";
import avatarImg from "../images/avatar.svg"
import { ImBin2 } from "react-icons/im"
import { BsFillPlusSquareFill } from "react-icons/bs";

Modal.setAppElement('#root');

export default function Targeting({ userId, avatar, username }) {
  const [targetingAccounts, setTargetingAccounts] = useState([]);
  const [radioValue, setRadioValue] = useState("Account");
  const [accountName, setAccountName] = useState("");
  const [selectAccountName, setSelectedAccountName] = useState("");
  const [searchAccounts, setSearchAccounts] = useState([]);
  const [FilterModal, setFilterModal] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const radios = [
    { name: "Account", value: "Account" },
    { name: "Hashtag", value: "Hashtag" },
  ];

  const insertTarget = async () => {
    setLoading(true);
    if (selectAccountName.length > 0) {
      const theAccount = await getAccount(selectAccountName);

      const { error } = await supabase.from("targeting").insert({
        account: selectAccountName,
        followers: theAccount.data[0].follower_count,
        avatar: theAccount.data[0].profile_pic_url,
        performance: "waiting",
        user_id: userId,
      });
      console.log(
        "🚀 ~ file: Targeting.jsx:40 ~ const{error}=awaitsupabase.from ~ error",
        error
      );

      setAccountName("");
      setSelectedAccountName("");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accountName.length > 0) {
      setLoadingSpinner(true);
      const getData = async () => {
        const data = await searchAccount(accountName);
        setSearchAccounts(data.data[0].users ?? [{ username: "" }]);
        setLoadingSpinner(false);
      };
      getData();
    }
  }, [accountName]);

  useEffect(() => {
    const getTargetingAccounts = async () => {
      const { data, error } = await supabase
        .from("targeting")
        .select()
        .eq("user_id", userId);
      console.log(
        "🚀 ~ file: Targeting.jsx:63 ~ getTargetingAccounts ~ error",
        error
      );
      setTargetingAccounts(data);
    };

    getTargetingAccounts();
  }, [userId, selectAccountName]);

  return (
    <>
      <TargetingFilterModal
        show={FilterModal}
        onHide={() => setFilterModal(false)}
        setFilterModal={setFilterModal}
      />

      {/* <CustomSettingsModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        avatar={avatar}
        username={username}
      /> */}

      <ModalNew
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
      />


      <div className="shadow-targeting mt-12">
        {/* nav */}
        <div className="flex justify-between px-8 pt-8">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-[32px]">Targeting</h3>
            <div className="bg-gray20 rounded w-8 h-8 flex justify-center items-center">
              <h2 className="text-white">{targetingAccounts?.length} </h2>
            </div>
          </div>
          <div className="flex gap-3 text-black">
            <Button className="text-blue" onClick={() => setIsOpen(!modalIsOpen)} >Custom Settings</Button>
            <Button onClick={() => setFilterModal(true)}>
              Targeting Filter
            </Button>
            <div className="rounded-[4px] bg-[#D9D9D9] p-3 relative w-10 h-10 cursor-pointer" onClick={() => { setAddModal(!addModal) }}>
              <BsFillPlusSquareFill className="absolute text-[#8C8C8C] font-semibold" />
            </div>
          </div>
        </div>
        {/* body */}
        <div className="grid p-8 gap-4">
          {targetingAccounts.map((item) => {
            return (
              <>
                <div className="rounded-[4px] border-[#E0E0E0] border border-solid flex justify-between p-3">
                  <div className="flex gap-3">
                    <img src={item.avatar || avatarImg} className="h-11 w-11 rounded-full" alt={item.account} crossOrigin="Anonymous" />
                    <div className="flex flex-col">
                      <h1 className="font-bold">@{item.account}</h1>
                      <p>{numFormatter(item.followers)} Followers</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <p>{countDays(item.created_at)}</p>
                    <div className="rounded-[4px] bg-[#D9D9D9] p-3 relative w-10 h-10 mr-5 cursor-pointer">
                      <ImBin2 className="absolute text-[#8C8C8C] font-semibold"
                        onClick={() => deleteAccount(item.id, item.user_id, item.account)}
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>



        {/* <div className="mt-5 container">
          <Row>
            <Col xs={12} md={8}>
              <Table striped="columns">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>followers</th>
                    <th>performance</th>
                    <th>Added</th>
                  </tr>
                </thead>
                <tbody>
                  {targetingAccounts.map((item) => {
                    return (
                      <tr>
                        <td>
                          <img
                            className="rounded-circle"
                            src={item.avatar}
                            alt={item.account}
                            width={45}
                            height={40}
                            crossOrigin="Anonymous"
                          />{" "}
                          @{item.account}
                        </td>
                        <td>{numFormatter(item.followers)}</td>
                        <td>{numFormatter(item.performance)}</td>
                        <td>{countDays(item.created_at)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
            <Col>
              <div className="d-flex flex-column">
                <h3>Add Source</h3>
                <p>
                  Set up tour targeting by adding relevant username and hashtag
                </p>
                <ButtonGroup>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={
                        radioValue === radio.value ? "dark bg-dark" : "white"
                      }
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
                <InputGroup className="mb-3 mt-3">
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  <Typeahead
                    onInputChange={(text) => setAccountName(text)}
                    id="pk"
                    onChange={(selected) => {
                      setSelectedAccountName(selected[0]?.username);
                    }}
                    labelKey="username"
                    options={[...searchAccounts]}
                  />
                  <div className="ps-2">
                    {loadingSpinner && <Spinner animation="border" />}
                  </div>
                </InputGroup>
                <Button
                  variant="dark"
                  className="mt-5"
                  onClick={() => insertTarget()}
                >
                  {loading ? "Loading..." : "Add Target"}
                </Button>
              </div>
            </Col>
          </Row>
        </div> */}
      </div>
    </>
  );
}

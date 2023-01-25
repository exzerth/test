import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { IoClose } from 'react-icons/io5';
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import "../../src/modalsettings.css"

export default function TargetingFilterModal(props) {
  const [followerMinValue, setFollowerMinValue] = useState(200);
  const [followerMaxValue, setFollowerMaxValue] = useState(20000);
  const [followingMinValue, setFollowingMinValue] = useState(200);
  const [followingMaxValue, setFollowingMaxValue] = useState(7500);
  const [mediaMinValue, setMediaMinValue] = useState(10);
  const [mediaMaxValue, setMediaMaxValue] = useState(1000);
  const [margic, setMargic] = useState(true);
  // console.log("🚀 ~ file: CenterModal.jsx:11 ~ CenterModal ~ value", value);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header id="custom-header" closeButton={false}>
        <div className="flex flex-col">
          <Modal.Title className="font-bold text-[20px] mb-2">Targeting Filters</Modal.Title>
          <p className="font-bold text-sm opacity-40 w-full">Here you can add preferences for your ideal follower. Before any follow or like we do, target will be checked if it complies to your liking.</p>
        </div>
        <div className="flex justify-end">
          <IoClose
            className="text-[30px] text-[#8c8c8c]"
            onClick={() => props.setFilterModal(false)}
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-12 p-3">
            <div className="flex flex-col justify-content-between">
              <div className="flex flex-col gap-2 w-[80%]">
                <label className="font-semibold text-base">Followers</label>
                <MultiRangeSlider
                  margic={margic}
                  className="range mb-2"
                  title="followers"
                  min={200}
                  max={20000}
                  onChange={({ min, max }) => {
                    console.log(min, max);
                    setFollowerMinValue(min);
                    setFollowerMaxValue(max);
                    if(min>followerMinValue && max<20000) {
                      console.log(min);
                      setMargic(false);
                    }
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 w-[80%] mt-4">
                <label className="font-semibold text-base mt-4">Following</label>
                <MultiRangeSlider
                  margic={margic}
                  className="range mb-2"
                  title="followers"
                  min={followingMinValue}
                  max={followingMaxValue}
                  onChange={({ min, max }) => {
                    // setFollowingValue(`min = ${min}, max = ${max}`);
                    setFollowingMinValue(min);
                    setFollowingMaxValue(max);
                    if(min>200 && max<7500) setMargic(false);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 w-[80%] mt-4 mb-3">
                <label className="font-semibold text-base mt-4">Media</label>
                <MultiRangeSlider
                  margic={margic}
                  className="range mb-2"
                  title="followers"
                  min={mediaMinValue}
                  max={mediaMaxValue}
                  onChange={({ min, max }) => {
                    // setMediaValue(`min = ${min}, max = ${max}`);
                    setMediaMinValue(min);
                    setMediaMaxValue(max);
                    if(min>10 && max<1000) setMargic(false);
                  }}
                />
              </div>
              <button 
              className={`${margic ? "bg-[#23DF85]" : "bg-gray-600"} w-full mt-10 rounded-[10px] py-4 text-base text-white font-bold`}
              onClick={() => setMargic(!margic)}
              >Magic Filters: {margic ? 'ON' : 'OFF'}</button>
            </div>

            <Col>
              <div>
                <label className="font-medium text-[15px] mb-2">Privacy</label>
                <Form.Select className="shadow-filter mb-6 rounded-[10px] pl-5" aria-label="Privacy">
                  {/* <option>Open this select menu</option> */}
                  <option value="All">All</option>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </Form.Select>
              </div>

              <div>
                <label className="font-medium text-[15px] mb-2">Gender</label>
                <Form.Select className="shadow-filter mb-6 rounded-[10px] pl-5" aria-label="Gender">
                  {/* <option>Open this select menu</option> */}
                  <option value="1">All</option>
                  <option value="2">Male</option>
                  <option value="3">Female</option>
                </Form.Select>
              </div>

              <div>
                <label className="font-medium text-[15px] mb-2">Language</label>
                <Form.Select className="shadow-filter rounded-[10px] pl-5" aria-label="Privacy">
                  {/* <option>Open this select menu</option> */}
                  <option value="All">All</option>
                  <option value="English">English</option>
                  <option value="French">French</option>
                </Form.Select>
              </div>

              <div>
                <button className="bg-secondaryblue w-full mt-10 rounded-[10px] py-4 text-base text-white font-bold"
                  onClick={() => props.setFilterModal(false)}
                >
                  Save And Close
                </button>
              </div>
            </Col>
          </div>
        </>
      </Modal.Body>
    </Modal>
  );
}

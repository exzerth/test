import React, { useState, useCallback, useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { IoClose } from 'react-icons/io5';
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import "../../src/modalsettings.css"

export default function TargetingFilterModal(props, {min, max}) {
  const stored = {
    followerMin : parseInt(localStorage.getItem('followerMinValue'), 10) || 1,
    followerMax : parseInt(localStorage.getItem('followerMaxValue'), 10) || 20000,
    followingMin : parseInt(localStorage.getItem('followingMinValue'), 10) || 1,
    followingMax : parseInt(localStorage.getItem('followingMaxValue'), 10) || 10000,
    mediaMin : parseInt(localStorage.getItem('mediaMinValue'), 10) || 1,
    mediaMax : parseInt(localStorage.getItem('mediaMaxValue'), 10) || 1000,
  }


  const [followerMinValue, setFollowerMinValue] = useState(stored.followerMin);
  const [followerMaxValue, setFollowerMaxValue] = useState(stored.followerMax);
  const [followingMinValue, setFollowingMinValue] = useState(stored.followingMin);
  const [followingMaxValue, setFollowingMaxValue] = useState(stored.followingMax);
  const [mediaMinValue, setMediaMinValue] = useState(stored.mediaMin);
  const [mediaMaxValue, setMediaMaxValue] = useState(stored.mediaMax);
  const [margic, setMargic] = useState(true);
  // console.log("🚀 ~ file: CenterModal.jsx:11 ~ CenterModal ~ value", value);

 const { setFilterModal } = props;

const setFilterModalCallback = useCallback(() => {
    setFilterModal(false);
}, [setFilterModal]);

const handleSaveAndClose = () => {

  // Save the values to supabase
  // Code to save to supabase goes here

  console.log("followerMinValue: ", followerMinValue);
  console.log("followerMaxValue: ", followerMaxValue);
  console.log("followingMinValue: ", followingMinValue);
  console.log("followingMaxValue: ", followingMaxValue);
  console.log("mediaMinValue: ", mediaMinValue);
  console.log("mediaMaxValue: ", mediaMaxValue);

  localStorage.setItem('followerMinValue', followerMinValue.toString());
localStorage.setItem('followerMaxValue', followerMaxValue.toString());
localStorage.setItem('followingMinValue', followingMinValue.toString());
localStorage.setItem('followingMaxValue', followingMaxValue.toString());
localStorage.setItem('mediaMinValue', mediaMinValue.toString());
localStorage.setItem('mediaMaxValue', mediaMaxValue.toString());
setFilterModalCallback()

}

useEffect(() => {
  return () => {
    localStorage.removeItem('followerMinValue');
    localStorage.removeItem('followerMaxValue');
    localStorage.removeItem('followingMinValue');
    localStorage.removeItem('followingMaxValue');
    localStorage.removeItem('mediaMinValue');
    localStorage.removeItem('mediaMaxValue');
  };
}, []);


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
          <p className="font-bold text-sm opacity-40 w-full">
            Here you can add preferences for your ideal follower. Before any follow or like we do, target will be checked if it complies to your liking.
            </p>
        </div>
        <div className="flex justify-end">
          <IoClose
            className="text-[30px] text-[#8c8c8c]"
            onClick={setFilterModalCallback}
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
                  setMargic={setMargic}
                  className="range mb-2"
                  title="followers"
                  min={stored.followerMin}
                  max={stored.followerMax}
                  onChange={({ min, max }) => {
                    setFollowerMinValue(min);
                    setFollowerMaxValue(max);
                    if(min>followerMinValue && max<followerMaxValue) {
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
                  setMargic={setMargic}
                  className="range mb-2"
                  title="followers"
                  min={stored.followingMin}
                  max={stored.followingMax}
                  onChange={({ min, max }) => {
                    setFollowingMinValue(min);
                    setFollowingMaxValue(max);
                    if(min>followingMinValue && max<followingMaxValue) {
                      console.log(min);
                      setMargic(false);
                    }
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 w-[80%] mt-4 mb-3">
                <label className="font-semibold text-base mt-4">Media</label>
                <MultiRangeSlider
                  margic={margic}
                  setMargic={setMargic}
                  className="range mb-2"
                  title="followers"
                  min={stored.mediaMin}
                  max={stored.mediaMax}
                  onChange={({ min, max }) => {
                    setMediaMinValue(min);
                    setMediaMaxValue(max);
                    if(min>mediaMinValue && max<mediaMaxValue) {
                      console.log(min);
                      setMargic(false);
                    }
                  }}
                />
              </div>
              <button 
              className={`${margic ? "bg-[#23DF85]" : "bg-gray-600"} w-full mt-10 rounded-[10px] py-4 text-base text-white font-bold`}
              onClick={() => {setMargic(!margic)}}
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
                  onClick={handleSaveAndClose}
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

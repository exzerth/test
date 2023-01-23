import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoClose } from 'react-icons/io5';
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import "../../src/modalsettings.css"

export default function TargetingFilterModal(props) {
  const [value, setValue] = useState(0);
  console.log("🚀 ~ file: CenterModal.jsx:11 ~ CenterModal ~ value", value);

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
          <p className="font-bold text-sm opacity-40 w-[400px]">Here you can add preferences for your ideal follower. Before any follow or like we do, target will be checked if it complies to your liking.</p>
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
          <Row>
            <Col className="d-flex flex-column justify-content-between">
              <div className="d-flex flex-column gap-2">
                <label className="font-semibold text-base mb-1">Followers</label>
                <MultiRangeSlider
                  className="range mb-2"
                  title="followers"
                  min={200}
                  max={20000}
                  onChange={({ min, max }) =>
                    setValue(`min = ${min}, max = ${max}`)
                  }
                />
              </div>
              <div className="d-flex flex-column gap-2 mt-4">
                <label className="font-semibold text-base mb-1">Following</label>
                <MultiRangeSlider
                  className="range mb-2"
                  title="followers"
                  min={200}
                  max={20000}
                  onChange={({ min, max }) =>
                    console.log(`min = ${min}, max = ${max}`)
                  }
                />
              </div>
              <div className="d-flex flex-column gap-2 mt-4 mb-3">
                <label className="font-semibold text-base mb-1">Media</label>
                <MultiRangeSlider
                  className="range mb-2"
                  title="followers"
                  min={10}
                  max={1000}
                  onChange={({ min, max }) =>
                    console.log(`min = ${min}, max = ${max}`)
                  }
                />
              </div>
              <button className="bg-[#23DF85] w-full mt-10 rounded-[10px] py-4 text-base text-white font-bold">Magic Filters: ON</button>
            </Col>

            <Col>
              <div>
                <label className="font-medium text-[15px] mb-1">Privacy</label>
                <Form.Select className="shadow-filter mb-6 rounded-[10px] pl-5" aria-label="Privacy">
                  {/* <option>Open this select menu</option> */}
                  <option value="All">All</option>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </Form.Select>
              </div>

              <div>
                <label className="font-medium text-[15px] mb-1">Gender</label>
                <Form.Select className="shadow-filter mb-6 rounded-[10px] pl-5" aria-label="Gender">
                  {/* <option>Open this select menu</option> */}
                  <option value="1">All</option>
                  <option value="2">Male</option>
                  <option value="3">Female</option>
                </Form.Select>
              </div>

              <div>
                <label className="font-medium text-[15px] mb-1">Language</label>
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
          </Row>
        </>
      </Modal.Body>
    </Modal>
  );
}

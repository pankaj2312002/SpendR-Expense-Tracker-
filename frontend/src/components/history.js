import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import axios from "axios";
// import Layout from "../components/Layouts/Layout";
import axiosInstance from "../services/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import moment from "moment";
const { RangePicker } = DatePicker;

const History = () => {
  const navigate = useNavigate();
  // isme vo sara data store karnge jo table ke form me ui per dikhana hai
  const [allTransaction, setAllTransaction] = useState([]);
  // filters apply karne ke liye...
  const [frequency, setFrequency] = useState("7");
  //  for dates for custom range
  const [selectedDate, setSelectedDate] = useState([]);
  // type ke base per filter karna (transactions ko)
  const [type, setType] = useState("all");

  const user = useSelector((state) => state.auth.user);

  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
    },
  ];

  //getall transactions
  const getAllTransactions = async () => {
    try {
      const res = await axiosInstance.post("/transaction/getAllTransactions", {
        userid: user?._id,
        //   ye 3 cheeze humko upper jo 3 variables pade hai , vaha se aa rahi hai
        frequency,
        selectedDate,
        type,
      });
      // jitna bhi res se data aayega , usko "allTransaction" vari me store/set karne ka ....
      setAllTransaction(res.data);
    } catch (error) {
      console.log(error);
      message.error("Ftech Issue With Tranction");
    }
  };

  //useEffect Hook
  useEffect(() => {
    getAllTransactions();
  }, [frequency, selectedDate, type]);

  return (
    <div>
      {/* fiters and Add new wala button */}
      <div className="filters flex items-center justify-between space-x-6 mb-6">
      {/* Frequency Filter */}
      <div className="flex flex-col space-y-2">
        <h6 className="font-bold">Select Frequency</h6>
        <Select
          value={frequency}
          onChange={(values) => setFrequency(values)}
          className="w-48"
        >
          <Select.Option value="7">LAST 1 WEEK</Select.Option>
          <Select.Option value="30">LAST 1 MONTH</Select.Option>
          <Select.Option value="365">LAST 1 YEAR</Select.Option>
          <Select.Option value="custom">CUSTOM</Select.Option>
        </Select>

        {frequency === "custom" && (
          <RangePicker
            value={selectedDate}
            onChange={(values) => setSelectedDate(values)}
            className="mt-2"
          />
        )}
      </div>

      {/* Type Filter */}
      <div className="flex flex-col space-y-2">
        <h6 className="font-bold">Select Type</h6>
        <Select
          value={type}
          onChange={(values) => setType(values)}
          className="w-48"
        >
          <Select.Option value="all">ALL</Select.Option>
          <Select.Option value="income">INCOME</Select.Option>
          <Select.Option value="expense">EXPENSE</Select.Option>
        </Select>
      </div>

      {/* Dashboard Button */}
      <div>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
       {/* Print your Table */}
      <div className="content">
        {<Table columns={columns} dataSource={allTransaction} />}
      </div>
    </div>
  );
};

export default History;

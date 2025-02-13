import React from "react";
import { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import { Progress } from "antd";
import { useSelector } from "react-redux";
import axiosInstance from "../services/axiosInstance";

const Dashboard = () => {
  const [form] = Form.useForm(); // Step 1: Create a form instance
  const { RangePicker } = DatePicker;
  // "Add New" wale pop-up modal(form) ko kab show karna hai aur kab nahi...
  const [showModal, setShowModal] = useState(false);
  // isme vo sara data store karnge jo table ke form me ui per dikhana hai
  const [allTransaction, setAllTransaction] = useState([]);
  // filters apply karne ke liye...
  const [frequency, setFrequency] = useState("30");
  //  for dates for custom range
  const [selectedDate, setSelectedDate] = useState([]);
  // type ke base per filter karna (transactions ko)
  const [type, setType] = useState("all");
  // category
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
  ];

  const user = useSelector((state) => state.auth.user);

  //getall transactions
  const getAllTransactions = async () => {
    try {
      const res = await axiosInstance.post("/transaction/getAllTransactions", {
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
  }, [type,  frequency, selectedDate]);

  // form handling
  const handleSubmit = async (values) => {
    try {
      await axiosInstance.post("/transaction/add-transaction", {
        ...values,
      });
      message.success("Transaction Added Successfully");

      setShowModal(false); // Close modal
      form.resetFields(); // Step 3: Reset form fields after submissio
    } catch (error) {
      message.error("Failed to add transaction");
    }
  };

  // total transaction
  const totalTransaction = allTransaction.length;
  const totalIncomeTransactions = allTransaction.filter(
    (kuch) => kuch.type === "income"
  ).length;
  const totalExpenseTransactions = allTransaction.filter(
    (kuch) => kuch.type === "expense"
  ).length;

  // these %'s are of "total numbers"  not of "total-value"
  const totalIncomePercent = (totalIncomeTransactions / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions / totalTransaction) * 100;

  //total turnover
  const totalTurnover = allTransaction.reduce(
    (acc, hello) => acc + hello.amount,
    0
  );
  const totalIncomeTurnover = allTransaction
    .filter((kuch) => kuch.type === "income")
    .reduce((acc, hello) => acc + hello.amount, 0);

  const totalExpenseTurnover = allTransaction
    .filter((kuch) => kuch.type === "expense")
    .reduce((acc, hello) => acc + hello.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      {/* Freq menu , Type Menu , "Add New" Button */}
      <div className="flex w-full">
        <div className="w-1/2 flex justify-between items-start">
          <div className="flex flex-col">
            <h6>Select Frequency </h6>
            <Select
              value={frequency}
              onChange={(values) => setFrequency(values)}
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
              />
            )}
          </div>

          <div className="flex flex-col">
            <h6>Select Type</h6>
            <Select value={type} onChange={(values) => setType(values)}>
              <Select.Option value="all">ALL</Select.Option>
              <Select.Option value="income">INCOME</Select.Option>
              <Select.Option value="expense">EXPENSE</Select.Option>
            </Select>
          </div>
        </div>

        <div className="w-1/2 flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>

      {/* Modal/Form for taking input */}
      <Modal
        title="Add Transaction"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          {/* Amount */}
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              { required: true, message: "Please enter the amount" },
              { pattern: /^[0-9]+$/, message: "Amount must be a valid number" },
            ]}
          >
            <Input type="text" />
          </Form.Item>

          {/* Type */}
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please select a type" }]}
          >
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          {/* Category */}
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </Form.Item>

          {/* Date */}
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <Input type="date" />
          </Form.Item>

          {/* Reference */}
          <Form.Item
            label="Reference"
            name="reference"
            rules={[{ required: true, message: "Please provide a reference" }]}
          >
            <Input type="text" />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please add a description" }]}
          >
            <Input type="text" />
          </Form.Item>

          {/* Submit Button */}
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              SAVE
            </button>
          </div>
        </Form>
      </Modal>

      {/* graphs and charts for dashboard */}
      <div className="flex flex-wrap m-3">
        <div className="w-full md:w-1/3 p-4">
          <div className="card shadow-lg rounded-lg">
            <div className="card-header bg-gray-100 text-lg font-semibold p-4">
              Total Transactions: {totalTransaction}
            </div>

            <div className="card-body p-6">
              <h5 className="text-green-600 font-bold mb-2">
                Income: {totalIncomeTransactions}
              </h5>
              <h5 className="text-red-600 font-bold mb-4">
                Expense: {totalExpenseTransactions}
              </h5>

              <Progress
                type="circle"
                strokeColor={"green"}
                className="mx-2"
                percent={totalIncomePercent.toFixed(0)}
              />

              <Progress
                type="circle"
                strokeColor={"red"}
                className="mx-2"
                percent={totalExpensePercent.toFixed(0)}
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 p-4">
          <div className="card shadow-lg rounded-lg">
            <div className="card-header bg-gray-100 text-lg font-semibold p-4">
              Total TurnOver: {totalTurnover}
            </div>

            <div className="card-body p-6">
              <h5 className="text-green-600 font-bold mb-2">
                Income: {totalIncomeTurnover}
              </h5>
              <h5 className="text-red-600 font-bold mb-4">
                Expense: {totalExpenseTurnover}
              </h5>

              <Progress
                type="circle"
                strokeColor={"green"}
                className="mx-2"
                percent={totalIncomeTurnoverPercent.toFixed(0)}
              />

              <Progress
                type="circle"
                strokeColor={"red"}
                className="mx-2"
                percent={totalExpenseTurnoverPercent.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-6 space-y-6 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-1/3">
          <h4 className="text-xl font-semibold mb-4">Categorywise Income</h4>
          {categories.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.type === "income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card shadow-md rounded-lg mb-4">
                  <div className="card-body p-4">
                    <h5 className="text-lg font-medium mb-2">{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>

        <div className="w-full md:w-1/3">
          <h4 className="text-xl font-semibold mb-4">Categorywise Expense</h4>
          {categories.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.type === "expense" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card shadow-md rounded-lg mb-4">
                  <div className="card-body p-4">
                    <h5 className="text-lg font-medium mb-2">{category}</h5>
                    <Progress
                      percent={((amount / totalExpenseTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Dashboard;

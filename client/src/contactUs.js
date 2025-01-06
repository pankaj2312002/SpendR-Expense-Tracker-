import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-green-500 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-lg mt-2">We'd love to hear from you! Reach out anytime.</p>
      </header>

      {/* Contact Form Section */}
      <div className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 text-center">Get in Touch</h2>
        <form className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2" htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              placeholder="Enter your message"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-md shadow-md transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Additional Contact Info */}
      <div className="bg-gray-200 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Other Ways to Contact Us</h2>
        <p className="text-lg mb-6">Feel free to reach out via email or follow us on social media:</p>
        <ul className="space-y-4">
          <li className="text-lg">
            <strong>Email:</strong> <a href="mailto:support@spendr.com" className="text-blue-500 hover:underline">support@spendr.com</a>
          </li>
          <li className="text-lg">
            <strong>Phone:</strong> <a href="tel:+1234567890" className="text-blue-500 hover:underline">+1 (234) 567-890</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactUs;

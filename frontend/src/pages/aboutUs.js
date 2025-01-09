import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-lg mt-2">The story behind Spendr and our vision for the future.</p>
      </header>

      {/* About Us Section */}
      <div className="py-16 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Who We Are</h2>
        <p className="text-lg mb-8">
          Spendr is a collaborative expense-tracking app designed to make managing finances easier and more transparent. 
          Built on the MERN stack, Spendr allows users to handle personal and shared expenses effortlessly, offering a seamless 
          experience for individuals and groups alike.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p>
              Our mission is to provide an intuitive platform for tracking expenses and improving financial accountability.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p>
              To empower individuals and groups with tools to manage their finances collaboratively and responsibly.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Why Choose Us?</h3>
            <p>
              With a focus on simplicity and collaboration, Spendr stands out as a reliable solution for personal and shared financial management.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 px-4 bg-gray-200">
        <h2 className="text-3xl font-semibold text-center mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Pankaj Kumar</h3>
            <p className="text-gray-600">Founder & Developer</p>
          </div>
          {/* Add other team members here */}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p>
          Designed and developed by <strong>Pankaj Kumar</strong>. View the code on{" "}
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            GitHub
          </a>
          . Connect with me on{" "}
          <a
            href="https://www.linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;

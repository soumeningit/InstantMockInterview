import React from "react";

function ContactUs() {
  return (
    <>
      <div className="font-[sans-serif]">
        <div className="bg-gradient-to-r from-blue-700 to-blue-300 w-full h-60"></div>

        <div className="-mt-28 mb-6 px-4">
          <div className="mx-auto max-w-6xl shadow-lg p-8 relative bg-white rounded-md">
            <h2 className="text-xl text-gray-800 font-bold">
              Product or Service Inquiry
            </h2>

            <form className="mt-8 grid sm:grid-cols-2 gap-6">
              <div>
                <label
                  className="text-gray-800 text-sm block mb-2"
                  htmlFor="name"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Name"
                  className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
                />
              </div>
              <div>
                <label
                  className="text-gray-800 text-sm block mb-2"
                  htmlFor="email"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
                />
              </div>
              <div>
                <label
                  className="text-gray-800 text-sm block mb-2"
                  htmlFor="phone"
                >
                  Your Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Phone No."
                  className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
                />
              </div>
              <div>
                <label
                  className="text-gray-800 text-sm block mb-2"
                  htmlFor="website"
                >
                  Website
                </label>
                <input
                  type="text"
                  id="website"
                  placeholder="Website"
                  className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
                />
              </div>
              <div>
                <label
                  className="text-gray-800 text-sm block mb-2"
                  htmlFor="company"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  placeholder="Company"
                  className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
                />
              </div>
              <div>
                <label
                  className="text-gray-800 text-sm block mb-2"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Subject"
                  className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
                />
              </div>
              <div className="col-span-full">
                <label
                  className="text-gray-800 text-sm block mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Message"
                  rows="6"
                  className="w-full rounded-md px-4 border border-gray-300 text-sm pt-3 outline-[#007bff]"
                ></textarea>
              </div>
              <div className="flex items-center col-span-full">
                <input
                  id="checkbox1"
                  type="checkbox"
                  className="w-4 h-4 mr-3 shrink-0"
                />
                <label htmlFor="checkbox1" className="text-sm text-gray-500">
                  I agree to the{" "}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="underline"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="underline"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="button"
                className="text-white w-max bg-[#007bff] hover:bg-blue-600 tracking-wide rounded-md text-sm px-6 py-3 mt-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="16px"
                  fill="#fff"
                  className="mr-2 inline"
                  viewBox="0 0 548.244 548.244"
                >
                  <path
                    clipRule="evenodd"
                    d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                  />
                </svg>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;

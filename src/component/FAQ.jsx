"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const faqs = [
  {
    id: 1,
    question: "What is this AI-powered interview website?",
    answer:
      "Our AI-powered interview website helps users prepare for job interviews by providing personalized mock interviews and feedback based on their performance.",
  },
  {
    id: 2,
    question: "How does the AI interview process work?",
    answer:
      "The AI analyzes your responses during the mock interview, evaluates your performance, and provides detailed feedback on areas of improvement.",
  },
  {
    id: 3,
    question: "Do I need to create an account to use the website?",
    answer:
      "Yes, creating an account allows you to track your progress, save your interview sessions, and receive personalized feedback.",
  },
  {
    id: 4,
    question: "What types of interviews can I practice?",
    answer:
      "You can practice various types of interviews, including behavioral, technical, and case interviews tailored to your desired job role.",
  },
  {
    id: 5,
    question: "Is there a cost to use the website?",
    answer:
      "We offer both free and premium plans. The free plan includes basic features, while the premium plan provides access to advanced features and personalized coaching.",
  },
  {
    id: 6,
    question: "Can I get feedback after my interview?",
    answer:
      "Yes, after each mock interview, you will receive detailed feedback on your responses, body language, and overall performance.",
  },
  {
    id: 7,
    question: "How often should I practice interviews?",
    answer:
      "We recommend practicing regularly, especially as your interview date approaches. Frequent practice can help you feel more confident and prepared.",
  },
  {
    id: 8,
    question: "Is my data safe and secure?",
    answer:
      "Yes, we prioritize your privacy and security. All personal data is encrypted and stored securely in compliance with data protection regulations.",
  },
  {
    id: 9,
    question: "How can I pay for the premium plan?",
    answer:
      "You can pay for the premium plan using various payment methods, including credit/debit cards, UPI, and other secure payment gateways integrated into our website.",
  },
  {
    id: 10,
    question: "What should I do if I encounter technical issues?",
    answer:
      "If you experience any technical issues, please contact our support team via the contact page, and we will assist you .",
  },
];

function FAQ() {
  const [openfaqId, setOpenfaqId] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center mx-auto my-8 p-6 w-full sm:w-10/12 lg:w-9/12 bg-white shadow-md rounded-lg">
      <div className="flex flex-col space-y-4 text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-gray-700">
          Here are some frequently asked questions. If you have any further
          queries, feel free to{" "}
          <Link href="/contact" className="text-teal-500 underline">
            reach us
          </Link>
          .
        </p>
      </div>
      <div className="flex flex-col w-full sm:w-4/5 lg:w-3/5 mt-5 space-y-4">
        {faqs.map((data) => (
          <div
            key={data.id}
            className="flex flex-col space-y-2 p-4 rounded-md bg-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-md sm:text-lg font-semibold text-gray-900">
                {data.question}
              </h2>
              {openfaqId === data.id ? (
                <FaMinus
                  onClick={() => setOpenfaqId(null)}
                  className="cursor-pointer text-teal-500"
                />
              ) : (
                <FaPlus
                  onClick={() => setOpenfaqId(data.id)}
                  className="cursor-pointer text-teal-500"
                />
              )}
            </div>
            {openfaqId === data.id && (
              <div className="text-sm sm:text-base text-gray-700 bg-gray-50 border border-teal-500 rounded-lg p-4 mt-2">
                {data.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;

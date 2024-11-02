// "use client";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function Testimonials() {
//   const [feedback, setFeedback] = useState();
//   useEffect(() => {
//     const getFeedback = async () => {
//       try {
//         const response = await axios.get("/api/users/getFeedbacks");
//         setFeedback(response?.data?.data);
//         console.log("response : " + JSON.stringify(response));
//       } catch (error) {
//         console.log("Failed to get feedbacks");
//       }
//     };
//     getFeedback();
//   }, []);

//   console.log("feedback : " + JSON.stringify(feedback));
//   console.log("feedback : " + feedback);

// return (
// <>
//   <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
//     <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//       <div className="flex flex-col items-center text-center">
//         <p className="text-lg font-medium text-gray-600 font-pj">
//           2,157 people have said how good Rareblocks
//         </p>
//         <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
//           Our happy clients say about us
//         </h2>
//       </div>

//       <div className="relative mt-10 md:mt-24 md:order-2">
//         {/* Left Arrow */}
//         <button
//           className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
//           aria-label="Previous"
//         >
//           {/* Left Arrow Icon */}
//           <svg
//             className="w-5 h-5"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//           >
//             <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
//           </svg>
//         </button>

//         {/* Testimonial cards */}
//         <div className="grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
//           <div className="flex flex-col overflow-hidden shadow-xl">
//             <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
//               <div className="flex-1">
//                 {/* Stars and other content here */}
//               </div>
//             </div>
//           </div>
//           {/* Repeat testimonial cards as needed */}
//         </div>

//         {/* Right Arrow */}
//         <button
//           className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
//           aria-label="Next"
//         >
//           {/* Right Arrow Icon */}
//           <svg
//             className="w-5 h-5"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//           >
//             <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   </section>
// </>
// )
// export default Testimonials;

"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Software Engineer",
    image: "./testi_1.jpg",
    feedback:
      "The AI interview questions were incredibly realistic. I felt well-prepared for my real interview!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Data Scientist",
    image: "./testi_2.jpg",
    feedback:
      "Great platform! The feedback on my answers helped me improve immensely.",
    rating: 4,
  },
  {
    id: 3,
    name: "David Kim",
    role: "Machine Learning Engineer",
    image: "./testi_3.jpg",
    feedback:
      "The mock interview sessions prepared me well for unexpected questions. Highly recommend!",
    rating: 3,
  },
  {
    id: 4,
    name: "Sarah Lee",
    role: "Product Manager",
    image: "./testi_4.jpg",
    feedback: "Loved the real-time analysis of my responses. Very insightful!",
    rating: 5,
  },
  {
    id: 5,
    name: "Sophia Martinez",
    role: "Marketing Specialist",
    image: "./testi_5.jpg",
    feedback:
      "A very helpful tool to refine my interview responses and gain confidence.",
    rating: 4,
  },
];

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 transform -translate-x-4 -translate-y-1/2 text-2xl text-gray-500 hover:text-gray-700 z-10 ml-2"
  >
    ◀
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500 hover:text-gray-700"
  >
    ▶
  </button>
);

// Star rating component
const StarRating = ({ rating }) => {
  const fullStars = Array(rating).fill(1);
  const emptyStars = Array(5 - rating).fill(1);

  return (
    <div className="flex justify-center mb-4">
      {fullStars.map((_, index) => (
        <svg
          key={`full-${index}`}
          className="w-5 h-5 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.691h4.162c.969 0 1.371 1.24.588 1.81l-3.372 2.451a1 1 0 00-.364 1.118l1.287 3.956c.3.922-.755 1.688-1.54 1.118l-3.372-2.451a1 1 0 00-1.176 0l-3.372 2.451c-.784.57-1.838-.196-1.54-1.118l1.287-3.956a1 1 0 00-.364-1.118L2.86 9.383c-.784-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.691l1.286-3.955z" />
        </svg>
      ))}
      {emptyStars.map((_, index) => (
        <svg
          key={`empty-${index}`}
          className="w-5 h-5 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.691h4.162c.969 0 1.371 1.24.588 1.81l-3.372 2.451a1 1 0 00-.364 1.118l1.287 3.956c.3.922-.755 1.688-1.54 1.118l-3.372-2.451a1 1 0 00-1.176 0l-3.372 2.451c-.784.57-1.838-.196-1.54-1.118l1.287-3.956a1 1 0 00-.364-1.118L2.86 9.383c-.784-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.691l1.286-3.955z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="text-lg font-medium text-gray-600 font-pj">
            Thousands of users trust our AI-powered mock interview platform.
          </p>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
            What our clients say about us
          </h2>
        </div>

        <Slider {...settings} className="mt-10 md:mt-24">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-4">
              <div className="flex flex-col overflow-hidden shadow-lg rounded-lg bg-white p-6 h-[18rem] w-[22rem]">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <StarRating rating={testimonial.rating} />
                <p className="text-gray-600 mb-4 text-center">
                  {testimonial.feedback}
                </p>
                <div className="text-center">
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialSlider;

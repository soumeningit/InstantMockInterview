"use client";
import "regenerator-runtime/runtime";
import { useEffect, useState } from "react";
import { HiSpeakerWave } from "react-icons/hi2";
import { LiaMicrophoneSolid } from "react-icons/lia";
import Webcam from "react-webcam";
import SpeechToText from "@/component/SpeechToText";
import { IoBulbOutline } from "react-icons/io5";
import { AiTwotoneAlert } from "react-icons/ai";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Router } from "next/router";
import ShowAnswer from "@/component/InterviewAnswer";
import { setInterviewAnswer } from "@/app/redux/slices/quesandansSlice";

function InterviewFinal() {
  // console.log("quesandans in interview start : " + JSON.stringify(quesandans));

  const [question, setQuestion] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [queandans, setqueandans] = useState([]);
  const [questionVisit, setQuestionVisit] = useState([]);
  const [transcriptArraySize, setTranscriptArraySize] = useState();
  const [answers, setAnswers] = useState([]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [finalResponse, setFinalResponse] = useState();

  // console.log(questionVisit);
  // console.log("transcriptArraySize : " + transcriptArraySize);

  const params = useParams();
  // console.log("params : " + JSON.stringify(params));
  const { id } = params;
  // console.log("id in interview start : " + id);
  const interviewId = params.id;
  const userId = useSelector((state) => state.auth.user);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const questionsAndAnswers = async () => {
      try {
        const response = await axios.post("/api/users/getquesans", { id });
        // console.log("response : " + JSON.stringify(response));
        setqueandans(response?.data?.data[0]?.queandans);
        setQuestionVisit(
          new Array(response?.data?.data[0]?.queandans.length).fill(false)
        );
        setTranscriptArraySize(response?.data?.data[0]?.queandans.length);
        setAnswers(new Array(questionData.length).fill(""));
      } catch (error) {
        // toast.error(error.response.message);
        console.log("Error in get questions and answers : ", error);
      }
    };
    questionsAndAnswers();
  }, [id]);

  function showQuestion(index) {
    setSelectedQuestionIndex(index);
    setQuestion(queandans[index].question);
    const updatedVisit = [...questionVisit];
    updatedVisit[index] = true;
    setQuestionVisit(updatedVisit);
    setIsClicked(!isClicked);
  }

  function handleSpeak() {
    const speech = new SpeechSynthesisUtterance(question);
    speech.lang = "en-IN";
    speech.rate = 1.0;
    speech.pitch = 1.0;
    speech.volume = 1.0;
    speech.text = question;
    window.speechSynthesis.speak(speech);
  }

  const handleSaveAnswer = (answerText) => {
    const updatedAnswers = [...answers];
    updatedAnswers[selectedQuestionIndex] = answerText;
    // setAnswers([...answers, updatedAnswers]);
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    console.log(answers);
    const toastId = toast.loading("Loading");
    try {
      const response = await axios.post("/api/users/submitAnswer", {
        userId,
        interviewId,
        answers,
      });
      // console.log("response after submission response.data: " + response.data);
      // console.log("response after submission : " + JSON.stringify(response));
      const submitResponse = JSON.parse(JSON.stringify(response?.data?.data));
      // console.log("submitResponse :" + submitResponse);
      setFinalResponse(submitResponse);
      if (response?.data?.success) {
        setShowAnalysis(!showAnalysis);
        dispatch(setInterviewAnswer(submitResponse));
        router.push("/dashboard/interview/interviewAnswer");
        toast.success("Answer submitted successfully");
      }
      toast.dismiss(toastId);
    } catch (error) {
      toast.error("Submission Failed! Try after some time.");
    } finally {
      toast.dismiss(toastId); // Ensure the loading toast is dismissed in all cases
    }
  };

  // console.log("answers in start : " + answers);

  return (
    <div className="flex flex-col items-start mx-auto p-6 h-svh bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4 text-gray-600">Let’s start</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[90%] rounded-lg">
        {/* left part */}
        <div className="flex flex-row flex-wrap items-start w-[90%]">
          {queandans?.length > 0 &&
            queandans?.map((item, index) => (
              <button
                onClick={(event) => {
                  event.preventDefault();
                  showQuestion(index);
                }}
                key={item?._id}
                className={`rounded-lg shadow-sm text-base text-opacity-90 hover:shadow-md hover:scale-105 transition ease-out duration-300 px-2 py-1 gap-2 m-2 hover:text-gray-700 ${
                  questionVisit[index]
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" // Style for visited question
                    : isClicked && index === selectedQuestionIndex
                    ? "bg-blue-700 text-white"
                    : "bg-white text-gray-500"
                }`}
                disabled={questionVisit[index]}
              >
                Question {index + 1}
              </button>
            ))}
          <div className="flex flex-col items-start m-2 gap-2 w-[90%]">
            {/* Show question here */}
            <p className="text-base text-gray-600">{question}</p>
            <HiSpeakerWave
              onClick={handleSpeak}
              className="text-2xl font-bold my-2 text-slate-950 cursor-pointer"
            />
          </div>
          <div className="w-[90%] border-1 border-yellow-200 shadow-lg rounded-md bg-orange-100 mt-4 space-y-6 p-5 mb-5">
            <h1 className="flex flex-row space-x-4 text-indigo-400">
              <IoBulbOutline className="mr-2 mt-1" />
              Information
            </h1>
            <p className="text-base text-teal-500">
              To start click Start recording "Start Listening" to begin
              capturing your speech. After speaking, click "Stop Listening." Use
              "Next" to save each spoken segment. When finished, click "Submit"
              for final submission. Reverseable process is not possible.
            </p>
          </div>
          <div className="w-[90%] border-1 border-yellow-200 shadow-lg rounded-md bg-gray-100 mt-4 space-y-6 p-5 mb-5">
            <h1 className="flex flex-row space-x-4 text-red-400">
              <AiTwotoneAlert className="mr-2 mt-1" />
              Disclaimer
            </h1>
            <p className="text-base text-teal-500">
              After start your interview don't refresh the page. Always use a
              good quality earephone. (if possible use wired headphones). If
              facing problem to record answer try it with another browser.
              (Chrome is recommended).{" "}
              <Link href="/contact" className="text-bold underline">
                If still facing problem contact us.
              </Link>
              <span className="text-red-500">
                You can attempt each question once, but you can retake the same
                interview after once it get completed.
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-5 text-white border-1 border-gray-200 rounded-md">
          {showVideo ? (
            <div className="flex items-center justify-center h-80 w-72 bg-black">
              <Webcam mirrored={true} />
            </div>
          ) : (
            <div className="h-36 w-60 bg-gray-500 shadow-sm flex items-center justify-center border-1 border-gray-200 rounded-md cursor-pointer">
              <LiaMicrophoneSolid className="text-6xl text-zinc-900" />
            </div>
          )}

          {/* render spech to text */}

          {isRecording && (
            <SpeechToText
              transcriptArraySize={transcriptArraySize}
              selectedQuestionIndex={selectedQuestionIndex}
              onSaveAnswer={handleSaveAnswer}
              handleSubmit={handleSubmit}
            />
          )}
          {showAnalysis && <ShowAnswer answer={finalResponse} />}

          <button className="px-2 py-1 shadow-sm rounded-md bg-slate-100 border-1 border-teal-200 hover:bg-white transition ease-out duration-300 hover:scale-105 hover:shadow-md hover:border-2 hover:border-teal-400">
            {isRecording ? (
              <p
                onClick={() => setIsRecording(!isRecording)}
                className="text-sm text-indigo-600 hover:text-indigo-600"
              >
                Stop recording
              </p>
            ) : (
              <p
                onClick={() => setIsRecording(!isRecording)}
                className="text-sm text-gray-600 hover:text-gray-600"
              >
                Start Recording
              </p>
            )}
          </button>
          <button className="px-2 py-1 shadow-sm rounded-md bg-slate-100 border-1 border-teal-200 hover:bg-white transition ease-out duration-300 hover:scale-105 hover:shadow-md hover:border-2 hover:border-teal-400">
            {isVideo ? (
              <p
                onClick={() => {
                  setIsVideo(!isVideo);
                  setShowVideo(!showVideo);
                }}
                className="text-sm text-indigo-600 hover:text-indigo-600"
              >
                Hide Video
              </p>
            ) : (
              <p
                onClick={() => {
                  setIsVideo(!isVideo);
                  setShowVideo(!showVideo);
                }}
                className="text-sm text-gray-600 hover:text-gray-600"
              >
                Show Video
              </p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewFinal;

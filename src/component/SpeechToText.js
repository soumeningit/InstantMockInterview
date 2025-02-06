import React, { useState, useEffect } from 'react';

const SpeechToText = ({ transcriptArraySize, selectedQuestionIndex, onSaveAnswer, handleSubmit }) => {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [transcriptArray, setTranscriptArray] = useState([]); // Array to store each transcript

    console.log("transcriptArraySize inside speechtotext : " + transcriptArraySize);
    console.log("selectedQuestionIndex inside speechtotext : " + selectedQuestionIndex);

    // Speech Recognition Setup
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // Ensures compatibility across different browsers.
        if (SpeechRecognition) {
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true;

            recognitionInstance.onresult = (event) => {
                const resultIndex = event.resultIndex;
                const result = event.results[resultIndex];
                if (result.isFinal) {
                    const finalTranscript = result[0].transcript;
                    setTranscript(finalTranscript); // Set the latest transcript
                    // console.log(finalTranscript); // Print each result to console
                }
            };

            //  If the microphone accidentally stops, restart it automatically if isListening is true.
            recognitionInstance.onend = () => {
                if (isListening) {
                    recognitionInstance.start(); // Restart recognition if still listening
                }
            };

            setRecognition(recognitionInstance);
        } else {
            alert('Your browser does not support speech recognition.');
        }
    }, [isListening]);

    const startListening = () => {
        setIsListening(true);
        recognition.start(); // Start the Speech Recognition
    };

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    };

    const handleNext = () => {
        if (transcript.trim()) {
            onSaveAnswer(transcript);
            setTranscriptArray([...transcriptArray, transcript]); // Add the current transcript to the array
            setTranscript(''); // Clear the transcript for the next entry
        }
    };

    // const handleSubmit = () => {
    //     handleSubmit();
    //     console.log('All transcripts:', transcriptArray); // Print all transcripts to the console
    // };

    return (
        <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg">
            {/* <h2 className="text-2xl font-bold text-center mb-4">Speech to Text</h2> */}
            <div className="flex justify-center space-x-4 mb-4">
                <button
                    onClick={startListening}
                    disabled={isListening}
                    className={`px-4 py-2 text-white rounded ${isListening ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                    Start Listening
                </button>
                <button
                    onClick={stopListening}
                    disabled={!isListening}
                    className={`px-4 py-2 text-white rounded ${!isListening ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
                >
                    Stop Listening
                </button>
            </div>
            {/* <p className="border p-2 mb-4 rounded bg-gray-100">{transcript}</p> */}
            <div className="flex space-x-4">
                <button
                    onClick={handleNext}
                    className="w-full px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded"
                >
                    Next
                </button>
                <button
                    onClick={handleSubmit}
                    className="w-full px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default SpeechToText;

import {useState, useEffect} from 'react'
import logo from '../src/saplogo.png'
import micicon from '../src/micicon.png'
import img from '../src/icons8-sent-50.png'
import React from "react";
import Navbar from "./navbar";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'

const App = () => {
    const [value, setValue ] = useState('')
    const [message, setMessage] = useState(null)
    const [previousChats, setPreviousChats] = useState([])
    const [currentTitle, setCurrentTitle] = useState(null)
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportSpeechRecognition
    } = useSpeechRecognition()

    const createNewChat =() => {
        setMessage(null)
        setValue(" ")
        setCurrentTitle(null)
    }

    const handleClick = (uniqueTitle) => {
        setCurrentTitle(uniqueTitle)
        setMessage(null)
        setValue(" ")
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            getMessages();
        }
    }
    const getMessages = async () => {
        const options = {
            method: "POST",
            body: JSON.stringify({
                message: value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }
        try{
            const response = await fetch('http://localhost:8000/completions', options)
            const data = await response.json()
            //console.log(data)
            setMessage(data.choices[0].text)

        } catch(error){
            console.error(error)
        }
    }
    useEffect(() => {
        setValue(transcript);
    }, [transcript]);
    useEffect(() => {
        //console.log(currentTitle, value, message)
        if (!currentTitle && value && message){
            setCurrentTitle(value)
        }
        if(currentTitle && value && message){
            setPreviousChats(prevChats => (
                [...prevChats,
                    {
                        title: currentTitle,
                        role: "user",
                        content: value
                    },
                    {
                        title: currentTitle,
                        role: "assistant",
                        content: message
                    }]
            ))
        }
    },[message, currentTitle])
    console.log(message)
    //console.log(previousChats)
    //console.log(value)

    const currentChat = previousChats.filter(previousChat=> previousChat.title === currentTitle)
    const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
    //console.log(uniqueTitles)

    console.log(message)

    return (<>
            <div className="app">
                <Navbar/>

                <section className='side-bar' >
                    <button onClick={createNewChat}> + New Chat</button>
                    <ul className='history'>
                        {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
                    </ul>
                    <nav>
                        <p>Made by SAP</p>
                    </nav>
                </section>
                <section className='main' >
                    <ul className='feed'>
                        {currentChat?.map((chatMessage, index) => (
                            <li key={index} className={chatMessage.role === "user" ? "user-message" : "assistant-message"}>
                                <p>{chatMessage.content}</p>
                            </li>
                        ))}
                    </ul>
                    <p id="text">Microphone: {listening ? 'on' : 'off'}</p>
                    <div className="bottom-section">
                        <div className='input-container'>
                            <input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} />
                            <img
                                src={micicon}
                                alt='mic icon'
                                height={25}
                                width={25}
                                id='mic'
                                onClick={SpeechRecognition.startListening}
                                className={listening ? "mic-icon-active" : "mic-icon-inactive"}
                            />
                            <img src={img} alt='send icon' height={25} width={25} id='send'  onClick={getMessages}></img>
                        </div>

                        <p className='info'>
                            Prototype for SAP
                        </p>
                    </div>
                </section>
            </div>
        </>
    )

}

export default App;

import { useState,useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import {v1} from 'uuid';
import Chats from "./Chats/chat";
import classes from "./chat.module.css";

const Chat = props => {
    // const navigate = useNavigate();
    // const ivyToken = JSON.parse(localStorage.getItem('ivyToken'));
    const [userMessage, setUserMessage] = useState("");
    const [chats, setChats] = useState([]);
    // const [user, setUser] = useState({ email: 'ivy@gmail.com' });
    const [isTyping, setIsTyping] = useState(false);
    const [sessId,setSessId]=useState('');
    const uuidV1=v1();

    useEffect(() => {
        // const verifyToken = async () => {
        //     if (!ivyToken || !ivyToken.token) {
        //         // navigate("/signin");
        //         return;
        //     }
        //     const { data } = await axios.post(
        //         `${process.env.REACT_APP_HOSTNAME}/verify`,
        //         { token: ivyToken.token }
        //     );
        //     const { status,user } = data;
        //     console.log(user);
        //     return status
        //         ? (setUser(user))
        //         : (localStorage.removeItem("ivyToken"));
        // };
        // verifyToken();
        setSessId(uuidV1.split('-')[0]);
    // eslint-disable-next-line
    }, []);

    const chat = async (e) => {
        e.preventDefault();

        if (!userMessage.trim()) {
            return;
        }
        const msgg = userMessage.trim();
        setUserMessage("");
        setIsTyping(true);
        window.scrollTo(0, 1e10);

        let msgs = chats;
        msgs.push({ role: "user", content: msgg });
        setChats(() => {
            return [...msgs];
        });

        try {
            const response = await fetch(`${process.env.REACT_APP_HOSTNAME}/${props.expert === 'A' ? 'career_streaming_new' : 'ai_psychiatrist'}`, {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
                },
                body: JSON.stringify({
                    unique_id: 'ivy@gmail.com',
                    session_id: sessId,
                    situation: props.situation,
                    customer_message: msgg
                })
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let co = 0;
            msgs.push({ role: "AI", content: "" });
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }

                const chunk = decoder.decode(value);
                const lines = chunk.split("\n");

                let parsedLines = [];
                let c = 0;
                lines.forEach((line) => {
                    if (line.includes("data:")) {
                        c = 0;
                        let arr = line.split("data: ");
                        arr.forEach((item, idx) => {
                            if (idx !== 0) {
                                parsedLines.push(item);
                            }
                        });
                    }
                    else {
                        c++;
                        if (c > 2) {
                            c = 0;
                            parsedLines.push('#%#');
                        }
                    }
                });
                setIsTyping(false);
                for (const parsedLine of parsedLines) {
                    if (parsedLine === ":" && co === 0) {
                        co = 1;
                        continue;
                    }
                    if (parsedLine === '#%#') {
                        msgs[msgs.length - 1].content += '\n';
                        continue;
                    }
                    if (parsedLine !== "CC") {
                        msgs[msgs.length - 1].content += parsedLine;
                        setChats(() => {
                            return [...msgs];
                        });
                    }
                }
            }
        }
        catch (err) {
            setIsTyping(false);
            alert("Too many users are using it at this time. Please wait for some time and try again!");
            console.log(err);
        }
    };

    return (
        <main>
            <h1 className={classes.head1}>{props.expert === 'A' ? 'Ivy For Career' : 'Ivy For Life'}</h1>
            <Chats chats={chats} />
            <div className={isTyping ? "" : classes.hide}>
                <p className={classes.msgg}>
                    <span>
                        <b>AI</b>
                    </span>
                    <span>:</span>
                    <i> Typing...</i>
                </p>
            </div>
            <form onSubmit={(e) => chat(e, userMessage)}>
                <input className={classes.inp} type="text" name="userMessage" value={userMessage} placeholder="Enter your queries..." onChange={(e) => setUserMessage(e.target.value)} />
                <button className={`${classes.but} ${classes.submit}`}>Submit</button>
            </form>
        </main>
    )
}

export default Chat;
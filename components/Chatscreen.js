import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components"
import { auth, db } from "../firebase"
import {useRouter} from 'next/router'
import {Avatar, IconButton} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVertRounded'
import AttachFileIcon from '@material-ui/icons/AttachFileRounded'
import {useCollection} from 'react-firebase-hooks/firestore'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import firebase from 'firebase'
import Message from "./Message"
import {useState, useRef} from 'react'
import getRecipEmail from '../utils/getRecipEmail';
import TimeAgo from 'timeago-react'
function Chatscreen({chat, messages}) {
    console.log(chat)
    const [user] = useAuthState(auth)
    const [input, setInput] = useState("")
    const endOfMessageRef = useRef(null)
    const router = useRouter()
    const [messageSnapshot] = useCollection(db.collection("chats").doc(router.query.id).collection("message").orderBy("timestamp", 'asc'))
    const [recipientSnapshot] = useCollection(db.collection("users").where('email', '==', getRecipEmail(chat.users, user)))
    const showMessages = () => {
        if(messageSnapshot) {
            // messageSnapshot.docs.map((message)=> {console.log(message.data())})
            return messageSnapshot.docs.map((message)=> 
                <Message
                    key={message.id}
                    user={message.data().user} 
                    message={
                    {
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime()
                    }}
                />

        );
        
    }else{
        // console.log(message)
        return JSON.parse(messages).map((message) => {
            <Message key={message.id} user={message.user} message={message}/>
        });
    }
}
    const sendMessage = (e) => {
        e.preventDefault()
        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, {merge:true})
        db.collection('chats').doc(router.query.id).collection("message").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoUrl: user.photoURL,
        })
        setInput("")
        scrollToBottom()
    }
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = () => {
        return getRecipEmail(chat.users, user)
    }
    const scrollToBottom = () => {
        endOfMessageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }

    
    return (
        <Container>
            <Header>
                {
                    recipient? (<Avatar src={recipient.photoURL} />) :
                    <Avatar>{recipientEmail[0]}</Avatar>
                }
                <Avatar />
                <HeaderInformation>
                    <h3>{recipientEmail()}</h3>
                    {recipientSnapshot ? (
                        <p>Last Active: {' '} {recipient?.lastSeen?.toDate() ? (<TimeAgo datetime={recipient?.lastSeen?.toDate()}/>) : "Unavailable"}</p>
                    ): (<p>Loading last active</p>)}
                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMessageRef}/>
            </MessageContainer>
            <InputContainer>
                <InsertEmoticonIcon />
                <Input value={input} onChange={e=> setInput(e.target.value)}/>
                <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
                <MicIcon />
            </InputContainer>
        </Container>
    )
}


export default Chatscreen

const Container = styled.div`
    
`;

const Header = styled.div`
    position: sticky;
    background-color: #fff;
    z-index: 1;
    top:0;
    display: flex;
    height: 80px;
    padding: 11px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1;
    > h3 {
        margin-bottom:3px
    }
    > p {
        font-size: 14px;
        color: grey
    }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height:90vh;
`;

const EndOfMessage = styled.div`
    margin-bottom: 50px;
`

const InputContainer = styled.form`
    display:flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: #fff;
`

const Input = styled.input`
    flex:1;
    border-outlined: none;
    border: none;
    outline-width:0;
    border-radius: 30px;
    background: #f1f1f1;
    padding: 20px;
    margin-right: 15px;
`
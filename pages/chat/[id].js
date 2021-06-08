import styled from "styled-components"
import Head from 'next/head'
import Sidebar from "../../components/Sidebar"
import Chatscreen from "../../components/Chatscreen"
import { auth, db } from "../../firebase"
import getRecipEmail from "../../utils/getRecipEmail"
import { useAuthState } from "react-firebase-hooks/auth"
function Chat({chat, messages}) {
    const [user] = useAuthState(auth)
    return (
        <Container>
            <Head>
                <title>Chat with {getRecipEmail(chat.users, user)}</title>
            </Head>
            <Sidebar />
            <ChatContainer>
                <Chatscreen chat={chat} messages={messages}/>
            </ChatContainer>
        </Container>
    )
}

export default Chat

export async function getServerSideProps(context){
    const ref = db.collection("chats").doc(context.query.id);

    // Prep messages on the server
    const messegesRef = await ref.collection('message').orderBy('timestamp', 'asc').get()
    
    const messages = messegesRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime(),
    }));

    // Prep the chats

    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }
    console.log(chat, messages)

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat
        }
    }
}

// Style Elements
const Container = styled.div`
    display: flex;
`;

const ChatContainer = styled.div`
    flex:1;
    overflow: scroll;
    height: 100vh;

    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width:none;
`;



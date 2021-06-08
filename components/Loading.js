import Head from "next/head"
import styled from "styled-components"
import {Circle} from "better-react-spinkit"
function Loading() {
    return (
        <Container>
             <Head>
                <title>Loading...</title>
            </Head>
              <center>
            <div>
                <img src="http://img.icons8.com/color/48/000000/chat--v3.png" style={{
                    marginTop:350
                }}/>
                <p>Loading Chat ...</p>
                <Circle color="#2196f3"/>
            </div>
        </center>
        </Container>
      
    )
}

export default Loading

const Container = styled.div`
    display: grid;
    place-items:center;
    height: 100vh;
`
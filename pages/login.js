import {Button} from "@material-ui/core"
import Head from 'next/head'
import styled from 'styled-components'
import {auth,provider} from '../firebase'
function LoginPage() {
    const signIn = () =>{
        auth.signInWithPopup(provider).catch(alert);
    }
    return (
        <Container>
            <Head>
            <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo src="http://img.icons8.com/color/48/000000/chat--v3.png"/>
                <Button onClick={signIn} variant="outlined">Sign In with google</Button>
            </LoginContainer>
        </Container>
    )
}

export default LoginPage

const Container = styled.div`
    display: grid;
    place-items:center;
    height: 100vh;
    background-color: whitesmoke;
    
`
const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
    background-color: #fff;
    border-radius: 30px;
    
`;
const Logo = styled.img`
    height:50px;
    width:50px;
    margin: auto;
    margin-bottom: 50px;
`




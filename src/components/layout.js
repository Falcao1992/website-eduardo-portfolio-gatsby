import React from "react"
import "./layout.css"
import theme from "../assets/theme";
import {ThemeProvider} from "styled-components";
//import {Footer} from "./Footer";
import styled from "styled-components";


const Layout = (props) => {

    return (
        <ThemeProvider theme={theme}>
            <LayoutContainer>
                <main>{props.children}</main>
                {/*<Footer/>*/}
            </LayoutContainer>
        </ThemeProvider>
    )
};

const LayoutContainer = styled.div`
    font-family: ${props => props.theme.fonts.primary};
    h1,h2,h3 {
        color: ${props => props.theme.colors.secondary};
        font-weight: 300;
    }
    h2 {
        font-size: 1.5rem;
        letter-spacing: 1px;
    }
    p {
        font-weight: 300;
        font-size: 0.7rem;
    }
    
`;


export default Layout

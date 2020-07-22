import React from "react"
import "./layout.css"
import theme from "../assets/theme";
import {ThemeProvider} from "styled-components";
import styled from "styled-components";
import Footer from "./Footer/Footer";


const Layout = (props) => {

    return (
        <ThemeProvider theme={theme}>
            <LayoutContainer>
                <main>{props.children}</main>
                <Footer />
            </LayoutContainer>
        </ThemeProvider>
    )
};

const LayoutContainer = styled.div`
    font-family: ${props => props.theme.fonts.primary};

    h1 {
        font-weight: 700;
    }
    
    h2 {
        font-weight: 700;
    }
    
    p {
        font-weight: 300;
    }

`;


export default Layout

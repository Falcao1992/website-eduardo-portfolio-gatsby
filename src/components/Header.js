import React, {useEffect, useState} from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image-es5'
import Typewriter from 'typewriter-effect';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export default ({className, namePage, bannerImage, slogan}) => {

    const [burgerIsActive, setBurgerIsActive] = useState(false);
    const [directionMoveHeader, setDirectionMoveHeader] = useState("DSC");

    useEffect(  () => {
        let timerOut = setTimeout(() => {
            setDirectionMoveHeader((directionMoveHeader) => directionMoveHeader === "DSC" ? "ASD" : "DSC")
        }, 0);
        return () => clearTimeout(timerOut);
    },[]);

    useEffect(  () => {
        let timer = setInterval(() => {
            setDirectionMoveHeader((directionMoveHeader) => directionMoveHeader === "DSC" ? "ASD" : "DSC")
            console.log('change direction header')
        }, 25000);
        return () => clearInterval(timer)
    },[]);

    const handleBurger = (e) => {
        e.preventDefault();
        if (burgerIsActive === false) {
            setBurgerIsActive(true)
        } else {
            setBurgerIsActive(false)
        }
    };

    const sloganMatch = () => {
        return <Typewriter
            onInit={(typewriter) => {
                typewriter
                    .changeDelay(100)
                    .typeString(`${slogan}`)
                    .pauseFor(2500)
                    .start();
            }}
        />
    };

    const closeBurgerTimeout = () => {
        setTimeout(() => {
            setBurgerIsActive(false)
        }, 200)
    };

    return (
        <>
            <StyledBackgroundSection
                Tag="header"
                className={className}
                fluid={[`linear-gradient(180deg, rgba(0, 0, 0, 0.85), rgba(28, 28, 28, 0.2))`, bannerImage]}
                alt={namePage}
                directionMoveHeader={directionMoveHeader}
                fadeIn={false}
                style={{
                    // Defaults are overwrite-able by setting one or each of the following:
                    //backgroundSize: '',
                    backgroundPosition: `${directionMoveHeader === "DSC" ? "10% 100%" : "90% 0"}`,
                    //backgroundRepeat: '',
                }}
            >
                {console.log("render header")}
                <NavStyled>
                    <ListItemIconStyled>
                        <MenuIcon fontSize="large" onClick={handleBurger}/>
                        <Link to="/"><MenuItem isActive={namePage === "home"}>Portfolio Eduardo Lépine</MenuItem></Link>
                    </ListItemIconStyled>

                    <ContainerLink burgerIsActive={burgerIsActive}>
                        <Link to="/" ><MenuItem isActive={namePage === "home"}>Portfolio Eduardo Lépine</MenuItem></Link>
                        <Link to={`/#about`} ><MenuItem onClick={closeBurgerTimeout} isActive={namePage === "about"}>A propos de moi</MenuItem></Link>
                        <Link to={`/#skill`}><MenuItem onClick={closeBurgerTimeout} isActive={namePage === "skill"}>Compétences</MenuItem></Link>
                        <Link to={`/#projects`}><MenuItem onClick={closeBurgerTimeout} isActive={namePage === "projects"}>Projets</MenuItem></Link>
                        <Link to={`/#contact`}><MenuItem onClick={closeBurgerTimeout} isActive={namePage === "contact"}>Contact</MenuItem></Link>
                    </ContainerLink>
                </NavStyled>

                <BlockHeaderText>
                    <small>{namePage === "home" ? "Eduardo Lépine" : "Projet :"}</small>
                    <ContainerTypewriter>
                        {sloganMatch()}
                    </ContainerTypewriter>
                </BlockHeaderText>
            </StyledBackgroundSection>
        </>
    )
};

const StyledBackgroundSection = styled(BackgroundImage)`
    color: ${props => props.theme.colors.primary};
    text-transform: uppercase;
    z-index: 1000;
    //background-blend-mode: overlay;
    &::after {
        transition: background-position 29s linear, opacity 0.5s ease 500ms !important;
    }
    &::before {
        transition: background-position 29s linear, opacity 0.5s ease 500ms !important;
    }
    @media only screen and (min-width:750px) {
        height: 75vh;
        &::after {
            height: 100% !important;
            top: 0 !important;
        }
    }
    @media only screen and (min-width:1200px) {
        height: 100vh;
    }
`;

const NavStyled = styled.nav`
    display: flex;
    width: 100%;
    position: fixed;
    flex-direction: column;
    line-height: 1.8;
    align-items: center;
    
    @media only screen and (min-width:750px) {
        position: relative;
        flex-direction: row;
        padding: 0 1.5rem;
        & a:first-child {           
            margin-right: auto;
        }
    }
`;

const ListItemIconStyled = styled(ListItemIcon)`
    z-index: 1000;
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.dark};
    min-width: auto;
    padding: 0.5rem 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: fixed;
    @media only screen and (min-width:750px) {
        display: none;
        position: relative;
    }
    
    a {
        align-self: center;
    }
`;

const ContainerLink = styled.div`
    display: flex;
    transform: ${props => props.burgerIsActive ? "translateY(3rem)" : "translateY(-100vh)"}; 
    flex-direction: column;
    width: 100%;
    padding: 0.5rem 3rem 3rem;
    margin: auto;
    background-color: ${props => props.theme.colors.dark};
    transition: transform .7s ${props => props.burgerIsActive ? "ease-out" : "ease-in"} ;
    position: fixed;
        & a:first-child {           
            display: none;
            border-bottom: none;
            text-decoration: none;
        }
        a {
            border-bottom: 1px solid lightgray;
        }
        
    @media only screen and (min-width:750px) {
        padding: 1rem 1.5rem 0;
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: center;
        background-color: transparent;
        transform: translateY(0);
        position: relative;
        & a:first-child {           
            display: flex;
        }
        a {
            border-bottom: none;
        }     
    }
`;

const MenuItem = styled.span`
    font-size: 0.8rem;
    display: inline-block;
    font-weight: 500;
    margin: 0.5rem 0;
    color: ${props => props.isActive === true ? props.theme.colors.secondary : props.theme.colors.primary};
    text-decoration: none;
    transition: color .3s;
        &:hover {
            color: ${props => props.theme.colors.secondary};
        }
    @media only screen and (min-width:750px) {
        margin: 0.5rem 1rem;
    }
`;

const BlockHeaderText = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    small {
        font-size: 1.2rem;
        text-align: center;
        letter-spacing: 2px;
        text-transform: none;
        padding-bottom: 1rem;
    }   
    @media only screen and (min-width:750px) {
        height: calc(75vh - 3.5rem);
    }
    @media only screen and (min-width:1200px) {
        height: calc(100vh - 3.5rem);
    }
`;

const ContainerTypewriter = styled.div`
    display: flex;
    justify-content: center;
    span {
        display: contents;
        padding: 10px 0;
        letter-spacing: 2px;
        font-size: .7rem;
        text-shadow: 1px 1px 3px #000000;
    }
    
    @media only screen and (min-width:750px) {                 
        span {
            font-size: 1.4rem;
        }
    }
`;

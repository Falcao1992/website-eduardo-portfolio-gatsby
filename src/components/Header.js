import React, {useState} from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image-es5'
import Typewriter from 'typewriter-effect';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export default ({className, namePage, bannerImage, pageContext}) => {

    const [burgerIsActive, setBurgerIsActive] = useState(false);
    console.log("namePage", namePage)
    console.log(pageContext, "pagecontexte")

    const slogan = {
        home: "Envie de superbes vacances ?",
        underworldLeFilm: "Des appartements tout confort !",
        activity: "Vous ne vous ennuierez jamais !",
        interest: "Des paysages magnifique !",
        about: "S'informer avant de partir !",
        contact: "Nous répondrons à toutes vos questions !",
    };

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
                    .typeString(`${slogan[namePage]}`)
                    .pauseFor(2500)
                    .start();
            }}
        />
    };

    return (
        <>
            <StyledBackgroundSection
                Tag="header"
                className={className}
                fluid={bannerImage}
                alt={namePage}
            >
                <NavStyled>
                    <ListItemIconStyled>
                        <MenuIcon fontSize="large" onClick={handleBurger}/>
                        <Link to="/">
                            {namePage === "home"
                                ?
                                <MenuItemH1 isActive={namePage === "home"}>Accueil</MenuItemH1>
                                :
                                <MenuItem isActive={namePage === "home"}>Accueil</MenuItem>
                            }
                        </Link>
                    </ListItemIconStyled>

                    <ContainerLink burgerIsActive={burgerIsActive}>
                        <Link to="/">
                            {namePage === "home"
                                ?
                                <MenuItemH1 isActive={namePage === "home"}>Accueil</MenuItemH1>
                                :
                                <MenuItem isActive={namePage === "home"}>Accueil</MenuItem>
                            }
                        </Link>
                        {pageContext.projectTitle.map((project) => {
                            return (
                                <Link key={project.key} to={`/${project.key}`}><MenuItem isActive={namePage === project.key}>{project.projectTitle}</MenuItem></Link>
                            )
                        })}
                    </ContainerLink>
                </NavStyled>

                <Baseline>
                    <small>Welcome</small>
                    <strong>Pattaya</strong>
                    <ContainerTypewriter>
                        {sloganMatch()}
                    </ContainerTypewriter>
                </Baseline>
            </StyledBackgroundSection>

        </>
    )
};

const StyledBackgroundSection = styled(BackgroundImage)`
    color: ${props => props.theme.colors.primary};
    text-transform: uppercase;
    height: 60vh;
    @media only screen and (min-width:800px) {
        height: auto;
    }
    `;

const NavStyled = styled.nav`
    display: flex;
    width: 100%;
    position: fixed;
    flex-direction: column;
    line-height: 1.8;
    align-items: center;
    
    @media only screen and (min-width:800px) {
        position: relative;
        flex-direction: row;
        padding: 1rem 1.5rem;
        & a:first-child {           
            margin-right: auto;
        }
    }
    `;

const ListItemIconStyled = styled(ListItemIcon)`
    color: ${props => props.theme.colors.primary};
    background-color: rgba(0, 0, 0, 0.975);
    z-index: 1000;
    min-width: auto;
    padding: 0.5rem 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: fixed;
    @media only screen and (min-width:800px) {
        display: none;
        position: relative;
    }
        a{
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
    background-color: rgba(0, 0, 0, 0.975);
    transition: transform .9s ease-in-out ;
    position: fixed;
        & a:first-child {           
            display: none;
            border-bottom: none;
            text-decoration: none;
        }
        a {
          border-bottom: 1px solid lightgray;
        }
        
    @media only screen and (min-width:800px) {
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
    font-weight: 300;
    margin: 0.5rem 0;
    color: ${props => props.isActive === true ? props.theme.colors.secondary : props.theme.colors.primary};
    text-decoration: none;
    transition: color .3s;
        &:hover {
          color: ${props => props.theme.colors.secondary};
        }
    @media only screen and (min-width:800px) {
        margin: 0.5rem 1rem;
    }
    `;

const MenuItemH1 = styled.h1`
    font-size: 0.8rem;
    display: inline-block;
    font-weight: 300;
    margin: 0.5rem 0;
    color: ${props => props.isActive === true ? props.theme.colors.secondary : props.theme.colors.primary};
    text-decoration: none;
    transition: color .3s;
    
    @media only screen and (min-width:800px) {
        margin: 0.5rem 1rem;
    }
    
    &:hover {
        color: ${props => props.theme.colors.secondary};
    }  
    `;

const Baseline = styled.div`
        text-align: center;
        display: flex;
        flex-direction: column;
        margin: auto 0;
        height: 70vh;
        justify-content: center;  
        padding: 0 1rem;
        small {
            font-family: ${props => props.theme.fonts.secondary};
            font-size: 3rem;
            text-align: center;
            display: block;
            color: ${props => props.theme.colors.secondary};
            letter-spacing: 2px;
            text-transform: none;
        }
        strong {
            display: block;
            font-size: 2.70rem;
            letter-spacing: 3px;
            text-shadow: 1px 1px 3px #000000;
        }     
        @media only screen and (min-width:800px) {
            padding-bottom: 3rem;
            height: 60vh;
            small {
                font-size: 4rem;
            }
            strong {
                font-size: 3.7rem;
                padding: 1rem;
            }          
            p {
                font-size: 1.4rem;
            }
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
    
    @media only screen and (min-width:800px) {                 
            span {
                font-size: 1.4rem;
            }
        }
    `;



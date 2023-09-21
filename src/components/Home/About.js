import React from "react";
import styled from "styled-components";
import {StaticQuery, graphql} from "gatsby";
import Img from "gatsby-image";
import cv from "../../images/EduardoLepineCv.pdf"

const About = () => (
    <StaticQuery
        query={graphql`
            query {
                profilPicture: file(relativePath: { eq: "profilPicture.png" }) {
                    childImageSharp {
                        fluid(quality: 90, maxWidth: 800) {
                            ...GatsbyImageSharpFluid_withWebp_tracedSVG
                        }
                    }
                }
            }
        `}
        render={ data => {
            const profilPicture = data.profilPicture.childImageSharp.fluid;

            return (
                <ContainerAbout id="about">
                    <TitleHome>Développeur FullStack confirmé React/Node</TitleHome>
                    <SubtitleStyled>A Propos de moi :</SubtitleStyled>
                    <ContainerBlockAbout>
                        <ImgStyled
                            fluid={profilPicture}
                            alt="Eduardo Lépine"
                        />
                        <DescriptionStyled><span>B</span>onjour et bienvenue sur mon portfolio !
                            Je m’appelle Eduardo Lépine, je suis anciennement diplômé d’un Bac Pro en hôtellerie-restauration.
                            J'ai souhaité me réorienter dans un domaine qui me plait davantage.
                            C’est pourquoi, je me suis intéressé de plus près à ce que je voulais réellement, à mes réelles passions, et j'en ai découvert une : le développement web !
                            Aujourd’hui, je suis très motivé et c'est pourquoi, en 2019, j'ai suivi pendant 9 mois la formation de Développeur FulltStack à la Wild Code School.
                            Vous découvrirez dans ce portfolio, mes compétences, mon parcours ainsi que les projets que j'ai pu réaliser.
                            Si vous avez des questions, n'hésitez pas à me contacter.
                            </DescriptionStyled>
                    </ContainerBlockAbout>
                    <ContainerButton>
                        <a
                            href={cv}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Curiculum Vitae"
                        >
                            <ButtonCV className="learn">Voir mon CV</ButtonCV>
                        </a>
                    </ContainerButton>
                </ContainerAbout>
            )
        }}
    />
);

const ContainerAbout = styled.section`
    background-color: ${props => props.theme.colors.dark};
    position: relative;
`;

const TitleHome = styled.h1`
    color: ${props => props.theme.colors.secondary};
    background-color: ${props => props.theme.colors.dark};
    margin: 0 auto;
    padding: 4rem 1rem 2rem;
    font-size: 1.5rem;
    text-align: center;
`;

const SubtitleStyled = styled.h2`
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.dark};
    padding: 1rem 0;
    border-bottom: 1px dashed ${props => props.theme.colors.primary};
    width: max-content;
    margin: 2rem auto;
`;

const ContainerBlockAbout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    @media only screen and (min-width: 750px) {
        width: 95%;
        flex-direction: row;
        justify-content: space-between;
        margin: 4rem auto 0;
        padding: .5rem;
    }
    @media only screen and (min-width: 1200px) {
        width: 90%;
        justify-content: space-evenly;
        margin: auto;
        padding: 0;    
    }
    
`;

const DescriptionStyled = styled.p`
    color: ${props => props.theme.colors.primary};
    line-height: 1.3rem;
    font-size: 0.8rem;
    position: relative;
    padding: 1rem 0.5rem;
    margin-bottom: 3rem;
    text-align: justify;
    
    @media only screen and (min-width: 750px) {
        font-size: 1rem;
        width: 65%;
    }
    
    @media only screen and (min-width: 1200px) {
        font-size: 1rem;
        width: 60%;
    }
    
    &:before {
        content: "\\201C";
        font-family: ${props => props.theme.fonts.secondary};
        color: #c89446;
        font-size: 4rem;
        height: 1px;
        top: -.5rem;
        left: -1rem;
        position: absolute;
        z-index: -0;
    } 
    &:after {
        content: "\\201E";
        font-family: ${props => props.theme.fonts.secondary};
        color: #c89446;
        font-size: 4rem;
        height: 1px;
        bottom: 1rem;
        right: -1rem;
        position: absolute;
        z-index: -0;
    } 
    span {
        font-size: 3rem;
        color: ${props => props.theme.colors.secondary};
        margin-left: 1rem;
    }
`;

const ImgStyled = styled(Img)`
    border-radius: 50%;
    width: 50%;
    margin: 2rem 0 4rem;
    background-color: lightgray;
    
    @media only screen and (min-width: 750px) {
        width: 28%;
    }
`;

const ContainerButton = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    margin: auto;
    padding-bottom: 4rem;
    
    @media screen and (min-width: 750px) {
        width: 90%;
        justify-content: flex-end;
    }
    @media screen and (min-width: 1200px) {
        width: 80%;
        justify-content: flex-end;
    }
`;

const ButtonCV = styled.button`
    padding: 1rem;
    background-color: transparent;
    color: ${props => props.theme.colors.secondary};
    border: 1px solid ${props => props.theme.colors.secondary};
    position: relative;
    transition: .8s;
    overflow: hidden;
    cursor: pointer;
    
    @media screen and (min-width: 750px) {
        width: 100%;
    }
    
    :hover {
        background-color: transparent;
        color: aliceblue;
        z-index: 1;
    }
    
    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0;
        background: ${props => props.theme.colors.secondary};
        border-radius: 0 0 50% 50%;
        transition: .8s;
    }
    :hover:before {
        height: 180%;
        z-index: -1;
    }     
`;

export default About


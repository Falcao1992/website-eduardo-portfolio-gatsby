import React from "react";
import styled from "styled-components";
import {StaticQuery, graphql} from "gatsby";
import Img from "gatsby-image";

const About = () => (
    <StaticQuery
        query={graphql`
            query {
                profilPicture: file(relativePath: { eq: "profilPicture.png" }) {
                    childImageSharp {
                        fluid(quality: 90, maxWidth: 800) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        `}
        render={ data => {
            const profilPicture = data.profilPicture.childImageSharp.fluid;

            return (
                <ContainerAbout id="about">
                    <SubtitleStyled>A Propos de moi :</SubtitleStyled>
                    <ContainerBlockAbout>
                        <ImgStyled fluid={profilPicture}/>
                        <DescriptionStyled><span>B</span>onjour et bienvenue sur mon portfolio !
                            Je m’appelle Adeline, je suis anciennement diplômée d’un CAP petite enfance et d’un bac pro ASSP.
                            J'ai souhaité me réorienter dans un domaine qui me plait davantage.
                            C’est pourquoi, je me suis intéressée de plus près à ce que je voulais réellement, à mes réelles passions, et j'en ai découvert une : le développement web !
                            Aujourd’hui, je suis très motivée et je suis actuellement en formation de développeur web junior chez OpenClassrooms.
                            Vous découvrirez dans ce portfolio, mes compétences, mon parcours ainsi que les projets que j'ai pu réaliser.
                            Si vous avez des questions, n'hésitez pas à me contacter.</DescriptionStyled>
                    </ContainerBlockAbout>
                </ContainerAbout>
            )
        }}
    />
);

const ContainerAbout = styled.section`
    background-color: ${props => props.theme.colors.dark};
    z-index: -1;
    position: relative;
`;

const SubtitleStyled = styled.h2`
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.dark};
    padding: 1rem 0;
    border-bottom: 1px dashed ${props => props.theme.colors.primary};
    width: max-content;
    margin: auto;
`;

const ContainerBlockAbout = styled.div`
    padding: 1rem 1rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media only screen and (min-width: 750px) {
        width: 95%;
        margin: 4rem auto 0;
        flex-direction: row;
        justify-content: space-between;
    }
    @media only screen and (min-width: 1200px) {
        width: 90%;
        margin: auto;
        justify-content: space-evenly;    
    }
    
`;

const DescriptionStyled = styled.p`
    color: ${props => props.theme.colors.primary};
    line-height: 1.3rem;
    font-size: 0.8rem;
    position: relative;
    padding: 1rem 0.5rem;
    margin-bottom: 3rem;
    
    @media only screen and (min-width: 750px) {
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
    
    @media only screen and (min-width: 750px) {
        width: 28%;
    }
`;

export default About


import React from "react";
import styled from "styled-components";
import {Link} from 'gatsby'
import Img from "gatsby-image"

const Projects = ({allProjectsBanner}) => {

    return (
        <ContainerProjects id="projects">
            <BlockTitleText>
                <SubtitleStyled>Mes Projets :</SubtitleStyled>
                <TextExplanation>Voici un ensemble de mes realisations, pendant ma formation, ainsi que des projets personnels <br/>Cliquez sur un projet pour plus de detail</TextExplanation>
            </BlockTitleText>
            <ContainerProjectsBanner>
                {allProjectsBanner.filter(project => project.key !== "home").map(projectBanner => {
                    return (
                        <BlockProjectBanner key={projectBanner.key}>
                            <Link to={`/${projectBanner.key}`}>
                                <ImgStyled fluid={{...projectBanner.fileFirebase.childImageSharp.fluid, aspectRatio: 16 / 9 }}
                            /></Link>
                        </BlockProjectBanner>
                    )
                })}
            </ContainerProjectsBanner>
        </ContainerProjects>
    )
};

const ContainerProjects = styled.section`
    
`;

const BlockTitleText = styled.div `
    background-color: ${props => props.theme.colors.dark};
    padding: 1rem 0 2rem;
`;

const SubtitleStyled = styled.h2`
    color: ${props => props.theme.colors.primary};
    width: max-content;
    padding: 1rem 0;
    margin: 2rem auto;
    border-bottom: 1px dashed ${props => props.theme.colors.primary};
`;

const TextExplanation = styled.p`
    color: ${props => props.theme.colors.secondary};
    padding: 2rem 0;
    width: 80%;
    margin: 0 auto;
    text-align: center;
`;

const ContainerProjectsBanner = styled.div`
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 750px) {
        flex-direction: row;
        flex-wrap: wrap;
    }
`;

const BlockProjectBanner = styled.div`
    width: 100%;
    overflow:hidden;
    justify-content: center;
    
    @media screen and (min-width: 750px) {
        width: 50%;
        display: flex;
        flex-direction: column;
    }
    @media screen and (min-width: 1200px) {
        width: 25%;
        display: flex;
        flex-direction: column;
    }
`;

const ImgStyled = styled(Img)`
    z-index: -1;
    @media screen and (min-width: 750px) {
        z-index: auto;
    }
`;

export default Projects

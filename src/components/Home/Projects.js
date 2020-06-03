import React from "react";
import styled from "styled-components";
import Img from "gatsby-image"
const Projects = ({allProjectsBanner}) => {

    console.log("allProjectsBanner", allProjectsBanner)

    return (
        <ContainerProjects>
            <SubtitleStyled>Mes Projects :</SubtitleStyled>
            <TextExplanation>Voici un ensemble de mes realisations, pendant ma formation, ainsi que des projets perso </TextExplanation>
            <ContainerProjectsBanner>
                {allProjectsBanner.filter(project => project.key !== "home").map(projectBanner => {
                    return (
                        <BlockProjectBanner>
                            <ImgStyled fluid={projectBanner.fileFirebase.childImageSharp.fluid} />
                        </BlockProjectBanner>
                    )
                })}
            </ContainerProjectsBanner>

        </ContainerProjects>
    )
};

const ContainerProjects = styled.section`
    background-color: ${props => props.theme.colors.dark};
    padding: 1rem 0;
`;

const SubtitleStyled = styled.h2`
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.dark};
    width: max-content;
    padding: 1rem 0;
    margin: 1rem auto;
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
    padding: 3rem 0;
`;

const BlockProjectBanner = styled.div`
  
`;

const ImgStyled = styled(Img)`
    width: 100%;
`;



export default Projects

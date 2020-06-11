import React from "react";
import {graphql} from "gatsby";
import Layout from "../components/layout";
import Img from "gatsby-image"
import styled from "styled-components";
import Header from "../components/Header";
import SEO from "../components/seo";

export default ({data, pageContext}) => {
    const {description, fileFirebase, key, projectTitle, technos, sourceNetlify, uid, urlImage} = data.allFirebaseData.nodes[0];
    const bannerImage = data.allFirebaseData.nodes[1].fileFirebase.childImageSharp.fluid;

    const createTags = (sentenceTags) => {
        const sentenceTransform = sentenceTags.split(",");
        return (
            <ContainerTag>
                {sentenceTransform.map((tag, i) => {
                    return (
                        <span key={i}>{tag.substr(0, 1).toUpperCase() + tag.substr(1)}</span>
                    )
                })}
            </ContainerTag>
        )

    };

    return (
        <Layout>
            <SEO title={projectTitle}/>
            <Header namePage={key} bannerImage={bannerImage} allProjectsData={pageContext} slogan={projectTitle}/>
            <ContainerProject key={uid}>
                <ContainerImg>
                    <a href={urlImage} target="_blank" rel="noopener noreferrer">
                        <StyledImg alt={projectTitle}
                                   fluid={fileFirebase.childImageSharp.fluid}/>
                    </a>
                </ContainerImg>
                <BlockDescription>
                    <h2>{projectTitle}</h2>
                    <p>{description}</p>
                    {createTags(technos)}
                    {(sourceNetlify && sourceNetlify !== "none") &&
                    <SourceLink href={sourceNetlify} target="_blank"
                                rel="noopener noreferrer"><span>Visiter le Site ></span></SourceLink>}
                </BlockDescription>
            </ContainerProject>
        </Layout>
    );
};

export const query = graphql`
    query($key: String!) {
        allFirebaseData(filter: {key: {eq: $key}}) {
            nodes {
                projectTitle
                description
                technos
                sourceNetlify
                key
                uid
                type
                urlImage
                    fileFirebase {
                        childImageSharp {
                            fluid {
                                ...GatsbyImageSharpFluid
                                originalName
                        }
                    }
                }
            }
        }      
    }
`;

const ContainerProject = styled.article`
    position: relative;
    background-color: ${props => props.theme.colors.dark};
    z-index: -1;
    padding: 2rem 0;
    
    @media screen and (min-width: 750px) {
        z-index: auto;
        display: flex;
        justify-content: space-evenly;
        padding: 4rem 0;
    }
    @media screen and (min-width: 1200px) {    
        padding: 6rem 0;
    }
`;

const ContainerImg = styled.div`
    width: 95%;
    padding: 1rem 0;
    margin: auto;
    @media only screen and (min-width:750px) {
        width: 40%;
        margin: 0;
        padding: 0;
        align-self: center;                   
    }
`;

const StyledImg = styled(Img)`
    
`;

const BlockDescription = styled.div`            
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    @media only screen and (min-width:750px) {
        width: 50%;                   
    }   
    @media only screen and (min-width:750px) {
        justify-content: space-evenly;                  
    }
    h2 {
      color: ${props => props.theme.colors.secondary};
      padding: 1rem 0;
    }  
    p {
      color: ${props => props.theme.colors.primary};
      text-align: justify;
      padding: 1rem 0;
    }
`;

const ContainerTag = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 1rem 0;
    span {
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.dark};
        font-weight: 500;
        padding: .5rem;
        margin-right: 1rem;
        margin-bottom: 1rem;
        border-radius: 10%;
    }
`;

const SourceLink = styled.a`
    color: ${props => props.theme.colors.secondary};
    font-size: 0.85rem;                   
    @media only screen and (min-width:750px) {
        text-decoration: none;          
        span {               
            font-size: 0.9rem;
            &:hover {
                text-decoration: underline;
            }
        }              
    }
`;



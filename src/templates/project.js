import React from "react";
import {graphql} from "gatsby";
import Layout from "../components/layout";
import Img from "gatsby-image"
import styled from "styled-components";
import Header from "../components/Header";
import SEO from "../components/seo";

export default ({data, pageContext}) => {
    const {description, fileFirebase, key, projectTitle, sourceNetlify, uid, urlImage} = data.allFirebaseData.nodes[0];
    const bannerImage = data.allFirebaseData.nodes[1].fileFirebase.childImageSharp.fluid;

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
    }
`;

const ContainerImg = styled.div`
    width: 95%;
    padding: 1rem 0;
    margin: auto;
    @media only screen and (min-width:750px) {
        width: 75%;                   
    }
`;

const StyledImg = styled(Img)`
    
`;

const BlockDescription = styled.div`            
    display: flex;
    flex-direction: column;
    padding: 2rem;
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



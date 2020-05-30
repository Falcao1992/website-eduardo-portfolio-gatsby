import React from "react";
import {graphql} from "gatsby";
import Layout from "../components/layout";
import Img from "gatsby-image"
import styled from "styled-components";
import Header from "../components/Header";
import SEO from "../components/seo";

export default ({data, pageContext}) => {
    const {description, fileFirebase, key, projectTitle, sourceNetlify, uid, urlImage} = data.allFirebaseData.nodes[0];
    console.log("data", data)
    const bannerImage = data.allFirebaseData.nodes[1].fileFirebase.childImageSharp.fluid;

    return (
        <Layout>
            <SEO title={projectTitle}/>
            <Header namePage={key} bannerImage={bannerImage} pageContext={pageContext}/>
            <div key={uid}>
                <ContainerImg>
                    <a href={urlImage} target="_blank" rel="noopener noreferrer">
                        <StyledImg alt={projectTitle}
                                   fluid={fileFirebase.childImageSharp.fluid}/>
                    </a>
                </ContainerImg>
                <div>
                    <ProjectTitle>{projectTitle}</ProjectTitle>
                    <p>{description}</p>
                    {(sourceNetlify && sourceNetlify !== "none") &&
                    <SourceLink href={sourceNetlify} target="_blank"
                                rel="noopener noreferrer"><span>Source</span></SourceLink>}
                </div>
            </div>
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
                            fluid(maxWidth: 400, maxHeight: 250) {
                                ...GatsbyImageSharpFluid
                                originalName
                        }
                    }
                }
            }
        }      
    }
`;

const ContainerImg = styled.div`
    @media only screen and (min-width:800px) {
        position: relative;
        width: 40%;
        align-self: center;
        transition: transform .5s ease-in-out .2s;      
        &:hover {
            transform: scale(1.05);
        }                        
    }
`;

const StyledImg = styled(Img)`
    border: ${props => props.theme.colors.secondary} 1px solid;
    margin-bottom: 20px;
    z-index: -1;
    @media only screen and (min-width:800px) {    
        border: none;  
        position: relative;
        height: auto;
        overflow: visible !important;
        &::before {
            content: "";
            border: #C89446 1px solid;
            width: 100%;
            height: 100%;
            top: -30px;
            left: ${props => props.position === "right" ? "30px" : "-30px"};
            position: absolute;
            z-index: -0;
        }     
    }
`;

const ProjectTitle = styled.h2`            
    text-transform: none;
    color: ${props => props.theme.colors.secondary};
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
    &::before {
        display: block;
        content: "";
        width: 24px;
        height: 2px;
        background: #C89446;
        margin-bottom: 10px;
        clear: both;
    }  
`;

const SourceLink = styled.a`
    color: ${props => props.theme.colors.secondary};
    font-size: 0.85rem;                   
    @media only screen and (min-width:800px) {
        text-decoration: none;          
        span {               
            font-size: 0.9rem;
            &:hover {
                text-decoration: underline;
            }
        }              
    }
`;



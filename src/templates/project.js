import React from "react";
import {graphql} from "gatsby";
import Layout from "../components/layout";
import Img from "gatsby-image"
import styled from "styled-components";
import Header from "../components/Header";
import SEO from "../components/seo";

export default ({data, pageContext}) => {
    const {allFirebaseData} = data;


    /*const translatePageName = (namePage) => {
        if (namePage === "activity") {
            return "Les Activités"
        } else if (namePage === "apartments") {
            return "Les Appartements"
        } else if (namePage === "interest") {
            return "Lieux d'intérêts"
        } else if (namePage === "about") {
            return "A Savoir"
        } else {
            return namePage
        }
    };*/

    return (
        <Layout>
            {/*<SEO title={translatePageName(pageContext.page)}/>
            <Header pathPage={allFirebaseData.nodes[0].page}/>*/}
            <ContainerBodyPage>
                {/*<TitleStyled>{translatePageName(allFirebaseData.nodes[0].page)} :</TitleStyled>*/}
                {allFirebaseData.nodes.filter(art => art.type === "project").map((project, index) => {
                    return (
                        <ArticleContent position={index % 2 === 0 ? "left" : "right"} key={project.uid}>
                            <ContainerImg position={index % 2 === 0 ? "left" : "right"}>
                                <a href={project.urlImage} target="_blank" rel="noopener noreferrer">
                                    <StyledImg position={index % 2 === 0 ? "left" : "right"}
                                               alt={project.projectTitle}
                                               fluid={project.fileFirebase.childImageSharp.fluid} />
                                </a>
                            </ContainerImg>
                            <ArticleBody position={index % 2 === 0 ? "left" : "right"}>
                                <div>
                                    <ArticleTitle>{project.projectTitle}</ArticleTitle>
                                    {/*<ArticleLocation>{project.location}</ArticleLocation>*/}
                                </div>

                                <p>{project.description}</p>
                                {(project.sourceNetlify && project.sourceNetlify !== "none") &&
                                <SourceLink href={project.sourceNetlify} target="_blank" rel="noopener noreferrer"><span>Source</span></SourceLink>}
                            </ArticleBody>
                        </ArticleContent>
                    )
                })}
            </ContainerBodyPage>
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

const ContainerBodyPage = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 90%;
    `;

const TitleStyled = styled.h1`
    color: ${props => props.theme.colors.secondary};
    letter-spacing: 1px;
    border-bottom: 1px solid ${props => props.theme.colors.secondary};
    font-size: 1.7rem;
    padding-bottom: 0.2rem;
    `;

const ArticleContent = styled.article`   
    margin-bottom: 2rem;
        @media only screen and (min-width:800px) {      
            display: flex;
            justify-content: space-between;        
            margin: 4rem auto;                                                     
        }
    `;

const ContainerImg = styled.div`
    @media only screen and (min-width:800px) {
        position: relative;
        width: 40%;
        align-self: center;
        order: ${props => props.position === "right" ? 1 : 0};
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

const ArticleBody = styled.div`
    align-self: center;
        p {
            padding: 1rem 0 0.8rem 0;
            font-size: 0.9rem;
            line-height: 1.3rem;
        }
        h2 {
        font-size: 1.2rem;
        letter-spacing: 0;
        }
    @media only screen and (min-width:800px) {      
        width: 50%;
        align-self: center;
        box-shadow: ${props => props.position === "right" ? "-2px 2px 5px 1px rgba(0,0,0,0.2)" : "2px 2px 5px 1px  rgba(0,0,0,0.2)"};         
        padding: 1rem;                   
    }
    `;

const ArticleTitle = styled.h2`            
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

const ArticleLocation = styled.span`
    font-size: 0.7rem;
    font-weight: 700;
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



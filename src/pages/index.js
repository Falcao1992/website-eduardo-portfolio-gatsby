import React from "react"
import {graphql} from "gatsby";
import Layout from "../components/layout"

import SEO from "../components/seo"
import Header from "../components/Header";
import About from "../components/Home/About";
import Skill from "../components/Home/Skill";
import styled from "styled-components";

const IndexPage = ({data}) => {

    const bannerImageHome = data.banner.nodes[0].fileFirebase.childImageSharp.fluid;
    const allProjectsData = {
        allProjectsTitle : data.allProjectBanner.nodes
    };

    return (
        <Layout>
            <SEO title="Accueil" />
            <Header namePage={"home"} bannerImage={bannerImageHome} allProjectsData={allProjectsData} slogan={"Bienvenue sur mon Portfolio"}/>
            <TitleHome>Développeur FulltStack junior React/Node</TitleHome>
            <About/>
            <Skill/>
        </Layout>
    )
};

export const query = graphql`
    query {
        banner: allFirebaseData(filter: {key: {eq: "home"}}) {
            nodes {
                fileFirebase {
                    childImageSharp {
                        fluid(maxWidth: 400, maxHeight: 250) {
                            originalName
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
        allProjectBanner: allFirebaseData(filter: {type: {eq: "project"}}) {
            nodes {              
                urlImage
                key
            }
        }
    }
`;

const TitleHome = styled.h1`
    color: ${props => props.theme.colors.secondary};
    background-color: ${props => props.theme.colors.dark};
    margin: 0 auto;
    padding: 2rem 1rem;
    font-size: 1.5rem;
    text-align: center;
`;

export default IndexPage

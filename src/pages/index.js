import React from "react"
import {graphql} from "gatsby";
import Layout from "../components/layout"

import SEO from "../components/seo"
import Header from "../components/Header";
import About from "../components/Home/About";
import Skill from "../components/Home/Skill";
import styled from "styled-components";
import Projects from "../components/Home/Projects";

const IndexPage = ({data}) => {

    const bannerImageHome = data.banner.nodes[0].fileFirebase.childImageSharp.fluid;
    const allProjectsBanner = data.allProjectsBanner.nodes;

    console.log("allProjectsBanner", allProjectsBanner);

    return (
        <Layout>
            <SEO title="Accueil" />
            <Header namePage={"home"} bannerImage={bannerImageHome} slogan={"Bienvenue sur mon Portfolio"}/>
            <TitleHome>Développeur FulltStack junior React/Node</TitleHome>
            <About/>
            <Skill/>
            <Projects allProjectsBanner={allProjectsBanner} />
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
        allProjectsBanner: allFirebaseData(filter: {type: {eq: "banner"}}) {
            nodes {
                key
                fileFirebase {
                    childImageSharp {
                        fluid {
                            originalName
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
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

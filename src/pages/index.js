import React from "react"
import {graphql} from "gatsby";
import Layout from "../components/layout"

import SEO from "../components/seo"
import Header from "../components/Header";
import About from "../components/Home/About";
import Skill from "../components/Home/Skill";
import styled from "styled-components";
import Projects from "../components/Home/Projects";
import ContactForm from "../components/Home/ContactForm";
import { Icon} from '@iconify/react';
import arrowUpCircle from '@iconify/icons-bi/arrow-up-circle';



const IndexPage = ({data}) => {

    const bannerImageHome = data.banner.nodes[0].fileFirebase.childImageSharp.fluid;
    const allProjectsBanner = data.allProjectsBanner.nodes;

    console.log("allProjectsBanner", allProjectsBanner);

    const redirectArrowUp = () => {
        window.scrollTo({
            top:0,
            left:0,
            behavior: "smooth"
        })
    };

    return (
        <Layout>
            <SEO title="Portfolio Eduardo Lépine" />
            <Header namePage={"home"} bannerImage={bannerImageHome} slogan={"Bienvenue sur mon Portfolio "}/>
            <About />
            <Skill />
            <Projects allProjectsBanner={allProjectsBanner} />
            <BlockArrowUp onClick={redirectArrowUp}>
                <Icon icon={arrowUpCircle} width="50px" height="50px" />
            </BlockArrowUp>
            <ContactForm />

        </Layout>
    )
};

export const query = graphql`
    query {
        banner: allFirebaseData(filter: {key: {eq: "home"}}) {
            nodes {
                fileFirebase {
                    childImageSharp {
                        fluid {
                            originalName
                            ...GatsbyImageSharpFluid_withWebp_tracedSVG
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

const BlockArrowUp = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1000;
    color: ${props => props.theme.colors.secondary};
    cursor: pointer;
    bottom: 4.5rem;
    right: 1rem;
    opacity: .8;
    @media screen and (min-width: 750px) {
        right: 2rem;
    }
`;

export default IndexPage

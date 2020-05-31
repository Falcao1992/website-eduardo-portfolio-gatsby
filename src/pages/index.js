import React from "react"
import {graphql} from "gatsby";
import Layout from "../components/layout"
//import HomeCategories from "../components/HomeCategories";
import SEO from "../components/seo"
import Header from "../components/Header";


//import Metrics from "../components/Metrics";


const IndexPage = ({data}) => {

    const bannerImageHome = data.banner.nodes[0].fileFirebase.childImageSharp.fluid;
    const allProjectsData = {
        allProjectsTitle : data.allProject.nodes
    };

    return (
        <Layout>
            <SEO title="Accueil" />
            <Header namePage={"home"} bannerImage={bannerImageHome} allProjectsData={allProjectsData} slogan={"Bienvenue sur mon Portfolio"}/>
            {/*<Metrics/>*/}
            {/*<HomeCategories/>*/}
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
        allProject: allFirebaseData(filter: {type: {eq: "project"}}) {
            nodes {
                projectTitle
                key
            }
        }
    }
`;

export default IndexPage

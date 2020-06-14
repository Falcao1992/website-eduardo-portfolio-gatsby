import React from "react";
import styled from "styled-components";
import Img from "gatsby-image"
import {graphql, StaticQuery} from "gatsby";

const Carousel = () => (
    <StaticQuery
        query={graphql`
            query Salut {
                allFirebaseData(filter: {type: {eq: "banner"}, key: {ne: "home"}}) {
                    nodes {
                        key
                        urlImage
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
        `}

    render={data => (
        <ContainerCarousel>
            {console.log(data, "data")}
            {data.allFirebaseData.nodes.map((project) => {
                return (
                    <BlockProjectImg key={project.key}>
                        <Img fluid={project.fileFirebase.childImageSharp.fluid} alt={project.key} />
                    </BlockProjectImg>
                )
            })}
        </ContainerCarousel>
    )}
    />
);

export default Carousel

const ContainerCarousel = styled.div`
    display: flex;
`;

const BlockProjectImg = styled.div`
    width: 25%;
    Img {
      width: 100%;
    }
`;





import React from "react";
import styled from "styled-components";
import Img from "gatsby-image"
import {graphql, Link, StaticQuery} from "gatsby";

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
                                fluid(maxWidth: 400, maxHeight: 270) {
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
                        <Link to={`/${project.key}`}><Img fluid={project.fileFirebase.childImageSharp.fluid}
                             alt={project.key}

                        /></Link>
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
    flex-wrap: wrap;
`;

const BlockProjectImg = styled.div`
    width: 50%;
    @media screen and (min-width: 750px) {
        width: 25%;
    }
    Img {
      width: 100%;
      object-fit: contain;
    }
`;





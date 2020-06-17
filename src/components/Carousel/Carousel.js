import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Img from "gatsby-image"
import {graphql, Link, StaticQuery} from "gatsby";

import {Icon} from '@iconify/react';
import arrowLeftOutlined from '@iconify/icons-ant-design/arrow-left-outlined';
import arrowRightOutlined from '@iconify/icons-ant-design/arrow-right-outlined';

const Carousel = () => {

    const [positionCarousel, setPositionCarousel] = useState(0);
    const [direction, setDirection] = useState("ASD");
    let maxCarousel = null;

    useEffect(() => {
        const timer = setTimeout(() => {
            turnCarousel(positionCarousel)
        }, 6000);
        return () => clearTimeout(timer)

    }, [positionCarousel]);

    const turnCarousel = (positionCarouselRef) => {
        if (maxCarousel !== null) {
            if (direction === "ASD") {
                if (positionCarouselRef === maxCarousel - 2 || positionCarouselRef > maxCarousel - 2) {
                    setDirection('DSC');
                }
                setPositionCarousel(positionCarouselRef + 1);
                console.log("augmente")
            } else {
                if (positionCarouselRef <= 1 ) {
                    setDirection('ASD')
                }
                setPositionCarousel(positionCarouselRef - 1);
            }
        }
    };

    const changePositionBefore = () => {
        if (positionCarousel !== 0) {
            setPositionCarousel(positionCarousel - 1);
            setDirection("DSC");
        } else {
            console.log("min atteint")
        }
        console.log(positionCarousel)

    };

    const changePositionAfter = (max) => {
        if (positionCarousel < max - 1) {
            setPositionCarousel(positionCarousel + 1);
            setDirection("ASD");
        } else {
            //maxCarousel = max;
            console.log("max atteint")
        }
        console.log(positionCarousel)
    };

    const initializeMax = (max) => {
        maxCarousel = max
    };

    return (
        <StaticQuery
            query={graphql`
                query imageCarousel {
                    allFirebaseData(filter: {type: {eq: "banner"}, key: {ne: "home"}}) {
                        totalCount
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

            render={data => {

                return (
                    <ContainerCarousel>
                        {maxCarousel === null && initializeMax(data.allFirebaseData.totalCount)}
                        <SpanBefore onClick={changePositionBefore}><Icon icon={arrowLeftOutlined} width="25px"
                                                                         height="25px"/></SpanBefore>
                        {data.allFirebaseData.nodes.map((project) => {
                            return (
                                <Link key={project.key} to={`/${project.key}`}>
                                    <ImgStyled fluid={project.fileFirebase.childImageSharp.fluid}
                                               alt={project.key}
                                               positionCarousel={positionCarousel}
                                    />
                                </Link>
                            )
                        })}
                        <SpanAfter onClick={() => changePositionAfter(data.allFirebaseData.totalCount)}><Icon
                            icon={arrowRightOutlined} width="25px" height="25px"/></SpanAfter>
                    </ContainerCarousel>
                )
            }}
        />
    )
};

export default Carousel

const ContainerCarousel = styled.div`
    display: flex;
    overflow: hidden;
    position: relative;
`;

const ImgStyled = styled(Img)`
    width: 100vw;
    transform: translateX(-${props => props.positionCarousel * 100}vw);
    transition: transform .7s linear;    
`;

const SpanBefore = styled.span`
    position: absolute;
    z-index: 1000;
    top: 50%;
    left: 0;
    transform: translate(15%, -50%);
    cursor: pointer;
`;

const SpanAfter = styled.span`
    position: absolute;
    z-index: 1000;
    top: 50%;
    right: 0;
    transform: translate(-15%, -50%);
    cursor: pointer;
`;





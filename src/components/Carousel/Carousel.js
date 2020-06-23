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
        }, 8000);
        return () => clearTimeout(timer)

    }, [positionCarousel]);

    const turnCarousel = (positionCarouselRef) => {
        if (maxCarousel !== null) {
            if (direction === "ASD") {
                if (positionCarouselRef === maxCarousel - 2 || positionCarouselRef > maxCarousel - 2) {
                    setDirection('DSC');
                }
                setPositionCarousel(positionCarouselRef + 1);
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
            if(positionCarousel === 1) {
                setDirection("ASD")
            }
        } else {
            console.log("min atteint")
        }
    };

    const changePositionAfter = (max) => {
        if (positionCarousel < max - 1) {
            setDirection("ASD");
            if(positionCarousel === max - 2) {
                setDirection("DSC")
            }
            setPositionCarousel(positionCarousel + 1);
        } else {
            console.log("max atteint")
        }
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

            render={data => {

                return (
                    <ContainerCarousel
                        positionCarousel={positionCarousel}
                    >
                        {maxCarousel === null && initializeMax(data.allFirebaseData.totalCount)}
                        <SpanBefore onClick={changePositionBefore}
                                    ishidden={positionCarousel === 0}
                        >
                            <Icon icon={arrowLeftOutlined}
                                  width="20px"
                                  height="20px"
                            />
                        </SpanBefore>
                        {data.allFirebaseData.nodes.map((project) => {
                            return (
                                <ContainerBlockCarousel key={project.key} positionCarousel={positionCarousel} >
                                    <Link to={`/${project.key}`}>
                                        <ImgStyled fluid={project.fileFirebase.childImageSharp.fluid}
                                                   alt={project.key}
                                                   positionCarousel={positionCarousel}
                                        />
                                    </Link>
                                </ContainerBlockCarousel>
                            )
                        })}
                        <SpanAfter onClick={() => changePositionAfter(data.allFirebaseData.totalCount)}
                                   ishidden={maxCarousel - 1 === positionCarousel}
                        >
                            <Icon
                            icon={arrowRightOutlined}
                            width="20px"
                            height="20px"
                            />
                        </SpanAfter>
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
    background-color: ${props => props.theme.colors.primary} ;
    box-shadow: inset 0 0 100px ${props => props.positionCarousel * 9 + 60}px  ${props => props.theme.colors.dark};
    transition: box-shadow 1s ease-in-out;
    a {
      display: flex;
      height: 100%;
    }   

`;

const ContainerBlockCarousel = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    transform: translateX(-${props => props.positionCarousel * 100}vw);
    transition: transform 1s ease-in-out;
    
    @media screen and (min-width: 750px) {
       margin: 6rem 7rem;
       width: calc(100vw - 14rem);
       padding: 2rem;
       box-shadow: inset 10px 10px 100px 36px rgba(0,0,0,0.80);  
    }
    
    @media screen and (min-width: 1200px) {
       margin: 6rem 25vw;
       width: calc(100vw - 50vw);
          
    }
    
    p {
        text-align: center ;
        color: ${props => props.theme.colors.secondary} ;
    } 
`;

const ImgStyled = styled(Img)`
    width: 100vw !important;
    @media screen and (min-width: 750px) {
        height: 30vh;
        img {
            height: 30vh !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
        }
    }
    @media screen and (min-width: 1200px) {
        height: 50vh;
        img {
            height: 50vh !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
        }
    }    
`;

const SpanBefore = styled.span`
    position: absolute;
    z-index: 1000;
    top: 50%;
    left: .5rem;
    padding: .5rem;
    transform: translate(0, -50%);
    color: ${props => props.theme.colors.secondary};
    background-color: ${props => props.theme.colors.dark};
    opacity: ${props => props.ishidden ? 0 : .4};
    border-radius: 50%;
    transition: opacity .7s linear;
    
    @media screen and (min-width: 750px){
        padding: 1rem;
        left: 1rem;
    }
    
    @media screen and (min-width: 1200px){
        left: 20%;
    }
    
    &:hover {
        opacity: ${props => !props.ishidden && .9 };
    }
    svg {
      display: flex;
    }
`;

const SpanAfter = styled.span`
    position: absolute;
    z-index: 1000;
    top: 50%;
    right: .5rem;
    padding: .5rem;
    transform: translate(0, -50%);
    color: ${props => props.theme.colors.secondary};
    background-color: ${props => props.theme.colors.dark};
    opacity: ${props => props.ishidden ? 0 : .4};
    border-radius: 50%;
    transition: opacity .7s ease-in-out;
    
    @media screen and (min-width: 750px){
        padding: 1rem;
        right: 1rem;
    }
    
    @media screen and (min-width: 1200px){
        right: calc(20% - 1rem);
    }
    
    &:hover {
        opacity: ${props => !props.ishidden && .9 };
    }
    svg {
      display: flex;
    }
`;





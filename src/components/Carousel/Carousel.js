import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import Img from "gatsby-image"
import {graphql, Link, StaticQuery} from "gatsby";
import {Icon} from '@iconify/react';
import arrowLeftOutlined from '@iconify/icons-ant-design/arrow-left-outlined';
import arrowRightOutlined from '@iconify/icons-ant-design/arrow-right-outlined';
import lampLight from "../../images/lampLight.png"

const Carousel = () => {

    const [positionCarousel, setPositionCarousel] = useState(0);
    const [direction, setDirection] = useState("ASD");
    let maxCarousel = null;

    useEffect(() => {
        const timer = setTimeout(() => {
            turnCarousel(positionCarousel)
        }, 7000);
        return () => clearTimeout(timer)

    });

    const turnCarousel = useCallback((positionCarouselRef) => {
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
    }, [direction, maxCarousel]);

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
                query {
                    imagesCarousel: allFirebaseData(filter: {type: {eq: "banner"}, key: {ne: "home"}}) {
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
                    pictureDesktopDev: file(relativePath: { eq: "pictureDesktopDev.png" }) {
                        childImageSharp {
                            fluid(quality: 90, maxWidth: 800) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }   
                }    
            `}

            render={data => {
                return (
                    <ContainerSectionCarousel
                        positionCarousel={positionCarousel}
                    >
                        {maxCarousel === null && initializeMax(data.imagesCarousel.totalCount)}

                        <ContainerBlockPictureDesktop>
                            <Img fluid={data.pictureDesktopDev.childImageSharp.fluid}
                                 alt="pictureDesktopDev"
                            />
                            <BlockLamp positionCarousel={positionCarousel}>
                                    <img src={lampLight} alt="lampLight"/>
                            </BlockLamp>
                        </ContainerBlockPictureDesktop>
                        <ContainerCarousel>
                            <SpanBefore onClick={changePositionBefore} ishidden={positionCarousel === 0}><Icon icon={arrowLeftOutlined} width="20px" height="20px"/></SpanBefore>
                            {data.imagesCarousel.nodes.map((project) => {
                            return (
                                <BlockCarousel key={project.key} positionCarousel={positionCarousel} >
                                    <Link to={`/${project.key}`}>
                                        <ContainerImageCarousel>
                                            <ImgStyled fluid={project.fileFirebase.childImageSharp.fluid}
                                                       alt={project.key}
                                                       positionCarousel={positionCarousel}
                                                       //objectFit="cover"
                                                       //objectPosition="50% 50%"
                                            />
                                        </ContainerImageCarousel>
                                    </Link>
                                </BlockCarousel>
                            )
                        })}
                            <SpanAfter onClick={() => changePositionAfter(data.imagesCarousel.totalCount)} ishidden={maxCarousel - 1 === positionCarousel}><Icon icon={arrowRightOutlined} width="20px" height="20px"/></SpanAfter>
                        </ContainerCarousel>

                    </ContainerSectionCarousel>
                )
            }}
        />
    )
};

export default Carousel

const ContainerSectionCarousel = styled.div`
    display: flex;
    @media screen and (min-width: 750px) {
        overflow: hidden;
        padding: 4rem 2rem;
        background-color: ${props => props.theme.colors.primary} ;
        box-shadow: inset 0 0 100px ${props => props.positionCarousel * 9 + 50}px  ${props => props.theme.colors.dark};
        transition: box-shadow 3s ease-in-out;
    }
`;

const ContainerBlockPictureDesktop = styled.div`
    display: none;
    @media screen and (min-width: 750px) {
        align-self: center;
        z-index: 1;
        display: flex;
        align-items: center;
        position: relative;      
        > div {
            width: 30vw;
        }
    }
`;

const BlockLamp = styled.div`
    @media screen and (min-width: 750px) {
        position: absolute;
        top: -2rem;
        right: 0;
        width: 2.5rem !important;
        transition: box-shadow 3s linear;
        img {
            width: 100%;
        } 
        :before {
            position: absolute;
            top: -${props => props.positionCarousel / 3 + 0.5}rem;
            left: 50%;
            content: "";
            box-shadow: 0 0 80px ${props => props.positionCarousel * 7 + 20}px #f5faa9cf;
            transition: all 2s linear;
        }
        :after {
            position: absolute;
            bottom: -.5rem;
            left: 50%;
            content: "";
            box-shadow: 0 0 80px ${props => props.positionCarousel * 7 + 10}px #f5faa9cf;
            transition: all 2s linear;
        }  
    }       
`;

const ContainerCarousel = styled.div`
    width: 100vw;
    display: flex;
    position: relative;
    overflow: hidden;
    
    @media screen and (min-width: 750px) {
        width: 50vw;
        margin-left: 8vw;
    }
    
    @media screen and (min-width: 1200px) {
        width: 40vw;
        margin-left: 15vw;
    }
`;

const BlockCarousel = styled.div`
    align-self: center;
    transform: translateX(-${props => props.positionCarousel * 100}vw);
    transition: transform 1.2s ease-in-out;
    
    @media screen and (min-width: 750px) {
        width: 50vw;
        transform: translateX(-${props => props.positionCarousel * 100}vw);
        transition: transform 1.2s ease-in-out;
        margin-right: 50vw;   
    }
    
    @media screen and (min-width: 1200px) {
        width: 40vw;
        transform: translateX(-${props => props.positionCarousel * 100}vw);
        transition: transform 1.2s ease-in-out;
        margin-right: 60vw; 
    }
`;

const ContainerImageCarousel = styled.div`
    width: 100vw;
`;

const ImgStyled = styled(Img)`
    @media screen and (min-width: 750px) {
        height: 25vh;
        img {
            height: 25vh !important;
            width: 50vw !important;
            padding: .5rem;
            //background-color: ${props => props.theme.colors.dark};
            box-shadow: inset 10px 10px 100px 36px rgba(0,0,0,0.80);  
        }
    }
    @media screen and (min-width: 1200px) {
        height: 60vh;
        img {
            height: 60vh !important;
            width: 40vw !important;
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
    }
    
    @media screen and (min-width: 1200px){
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
    }
    
    @media screen and (min-width: 1200px){
    }
    
    &:hover {
        opacity: ${props => !props.ishidden && .9 };
    }
    svg {
      display: flex;
    }
`;





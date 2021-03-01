import React, {useState} from "react";
import styled from "styled-components";
import {Icon} from '@iconify/react';

import logoReact from '@iconify/icons-ion/logo-react';
import logoCss3 from '@iconify/icons-ion/logo-css3';
import logoHtml5 from '@iconify/icons-ion/logo-html5';
import logoJavascript from '@iconify/icons-ion/logo-javascript';
import logoGithub from '@iconify/icons-carbon/logo-github';
import logoNodejs from '@iconify/icons-ion/logo-nodejs';
import expressIcon from '@iconify/icons-logos/express';
import mysqltwoIcon from '@iconify/icons-whh/mysqltwo';
import logoFirebase from '@iconify/icons-ion/logo-firebase';
import gitlabIcon from '@iconify/icons-simple-icons/gitlab';
import gatsbyIcon from '@iconify/icons-cib/gatsby';
import styledComponents from '@iconify/icons-simple-icons/styled-components';
import materialUi from '@iconify/icons-simple-icons/material-ui';
import bootstrapIcon from '@iconify/icons-simple-icons/bootstrap';
import graphqlIcon from '@iconify/icons-simple-icons/graphql';
import tailwindSolid from '@iconify/icons-teenyicons/tailwind-solid';
import vueIcon from '@iconify/icons-file-icons/vue';
import nuxtJs from '@iconify/icons-cib/nuxt-js';


const Skill = () => {

    const [displayHelper, setDisplayHelper] = useState([]);

    const skills = [
        { name: "React Js", icon: logoReact,  width: "40", height: "40", padding: "normal"},
        { name: "Css3", icon: logoCss3,  width: "40", height: "40", padding: "normal"},
        { name: "Html5", icon: logoHtml5,  width: "40", height: "40", padding: "normal"},
        { name: "Javascript", icon: logoJavascript,  width: "40", height: "40", padding: "normal"},
        { name: "Github", icon: logoGithub,  width: "40", height: "40", padding: "normal"},
        { name: "Nodejs", icon: logoNodejs,  width: "40", height: "40", padding: "normal"},
        { name: "Express", icon: expressIcon,  width: "65", height: "40", padding: "normal"},
        { name: "MySql", icon: mysqltwoIcon,  width: "40", height: "40", padding: "normal"},
        { name: "Firebase", icon: logoFirebase,  width: "40", height: "40", padding: "normal"},
        { name: "Gitlab", icon: gitlabIcon,  width: "40", height: "40", padding: "normal"},
        { name: "Gatsby", icon: gatsbyIcon,  width: "40", height: "40", padding: "normal"},
        { name: "Styled Components", icon: styledComponents,  width: "65", height: "50", padding: "small"},
        { name: "Material-Ui", icon: materialUi,  width: "40", height: "40", padding: "normal"},
        { name: "Bootstrap", icon: bootstrapIcon,  width: "40", height: "40", padding: "normal"},
        { name: "GraphQl", icon: graphqlIcon,  width: "40", height: "40", padding: "normal"},
        { name: "Tailwind CSS", icon: tailwindSolid,  width: "40", height: "40", padding: "normal"},
        { name: "Vue Js", icon: vueIcon,  width: "40", height: "40", padding: "normal"},
        { name: "Nuxt Js", icon: nuxtJs,  width: "40", height: "40", padding: "normal"},
    ];

    const showHelperText = (e) => {
        const result = [...displayHelper];
        result[e.target.id] = true;
        setDisplayHelper(result)
    };

    const hideHelperText = (e) => {
        const result = [...displayHelper];
        result[e.target.id] = false;
        setDisplayHelper(result)
    };

    return (
        <ContainerSkill id="skill">
            <ContainerIcons>
                {skills.map(skill => {
                    return (
                        <BlockIcon key={skill.name}>
                            <SpanStyled padding={skill.padding} display={displayHelper[skill.name] === true ? "show" : "hidden"}>{skill.name}</SpanStyled>
                            <BlockSvg id={skill.name} onMouseEnter={(e) => showHelperText(e)} onMouseLeave={(e) => hideHelperText(e)} display={displayHelper[skill.name] === true ? "show" : "hidden"}>
                                <Icon
                                      icon={skill.icon} width={skill.width} height={skill.height}/>
                            </BlockSvg>
                        </BlockIcon>
                    )
                })}
            </ContainerIcons>
        </ContainerSkill>
    )
};

const ContainerSkill = styled.section`
    background-color: ${props => props.theme.colors.primary};
    position: relative;
    
    @media screen and (min-width: 750px) {
        width: 90%;
        margin: auto;
    }
    
    @media screen and (min-width: 1200px) {
        padding: 1rem 0;
        width: 80%;
        margin: auto;
    }
`;

const ContainerIcons = styled.div`
    background-color: ${props => props.theme.colors.primary};
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: .5rem;
    padding: 2rem 1rem;
    
    @media screen and (min-width: 750px) {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-gap: 1rem;
        padding: 2rem 0;
    }
    
    @media screen and (min-width: 1200px) {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-gap: 2rem;
        padding: 2rem 0;
    }
    
`;

const BlockIcon = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
`;

const BlockSvg = styled.div`
    width: 100%;
    justify-content: center;
    display: flex;
    background-color: ${props => props.theme.colors.primary};
    z-index: 2;
    padding: ${props => props.display === "hidden" ? ".5rem" : `calc(.5rem - 1px)`};
    border-left: ${props => props.display === "hidden" ? `1px solid #c8944600` : `1px solid ${props.theme.colors.secondary}`};
    border-right: ${props => props.display === "hidden" ? `1px solid #c8944600` : `1px solid ${props.theme.colors.secondary}`};
    transition:  1s;  
`;

const SpanStyled = styled.span`
    display: none;
    @media screen and (min-width: 1200px) {
        display: block;
        position: absolute;
        background-color: ${props => props.theme.colors.dark};
        color: ${props => props.theme.colors.secondary}; 
        text-align: center;
        font-size: .8rem;
        padding: .6rem .6rem ${props => props.padding === "small" ? "1.2rem" : "1rem"};
        opacity: 1;
        z-index: ${props => props.display === "hidden" ? "1" : "2"};
        transform: ${props => props.display === "hidden" ? "initial" : "translate(0, -100%)"};
        transition: transform .3s linear .1s;  
    }  
`;

export default Skill

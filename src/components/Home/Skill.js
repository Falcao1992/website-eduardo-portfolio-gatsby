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


const Skill = () => {

    const [displayHelper, setDisplayHelper] = useState([]);

    const skills = [
        { name: "React", icon: logoReact,  width: "45", height: "45", padding: "normal"},
        { name: "Css3", icon: logoCss3,  width: "45", height: "45", padding: "normal"},
        { name: "Html5", icon: logoHtml5,  width: "45", height: "45", padding: "normal"},
        { name: "Javascript", icon: logoJavascript,  width: "45", height: "45", padding: "normal"},
        { name: "Github", icon: logoGithub,  width: "45", height: "45", padding: "normal"},
        { name: "Nodejs", icon: logoNodejs,  width: "45", height: "45", padding: "normal"},
        { name: "Express", icon: expressIcon,  width: "70", height: "45", padding: "normal"},
        { name: "MySql", icon: mysqltwoIcon,  width: "45", height: "45", padding: "normal"},
        { name: "Firebase", icon: logoFirebase,  width: "45", height: "45", padding: "normal"},
        { name: "Gitlab", icon: gitlabIcon,  width: "45", height: "45", padding: "normal"},
        { name: "Gatsby", icon: gatsbyIcon,  width: "45", height: "45", padding: "normal"},
        { name: "Styled Components", icon: styledComponents,  width: "70", height: "70", padding: "small"},
        { name: "Material-Ui", icon: materialUi,  width: "45", height: "45", padding: "normal"},
        { name: "Bootstrap", icon: bootstrapIcon,  width: "45", height: "45", padding: "normal"},
        { name: "GraphQl", icon: graphqlIcon,  width: "45", height: "45", padding: "normal"},
    ];

    const showHelperText = (e) => {
        console.log("show")
        console.log(e.target.id)
        const result = [...displayHelper];
        result[e.target.id] = true;
        setDisplayHelper(result)
        console.log("displayHelper", displayHelper)
    };

    const hideHelperText = (e) => {
        console.log("hide")
        const result = [...displayHelper];
        result[e.target.id] = false;
        setDisplayHelper(result)
        console.log("displayHelper", displayHelper)
    };


    return (
        <ContainerSkill id="skill">
            <ContainerIcons>
                {skills.map(skill => {
                    return (
                        <BlockIcon key={skill.name}>
                            <SpanStyled padding={skill.padding} display={displayHelper[skill.name] === true ? "show" : "hidden"}>{skill.name}</SpanStyled>
                            <BlockSvg>
                                <Icon id={skill.name} onMouseEnter={(e) => showHelperText(e)} onMouseLeave={(e) => hideHelperText(e)}
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
    z-index: -1;
    position: relative;
    
    @media screen and (min-width: 750px) {
        z-index: 0;
    }
    
    @media screen and (min-width: 1200px) {
        padding: 1rem 0;
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
    background-color: aliceblue;
    z-index: 2;
    padding: .5rem;
`;

const SpanStyled = styled.span`
    display: none;
    @media screen and (min-width: 1200px) {
        display: block;
        position: absolute;
        background-color: ${props => props.theme.colors.dark};
        color: ${props => props.theme.colors.secondary};
        border: 1px solid ${props => props.theme.colors.secondary};    
        text-align: center;
        font-size: .8rem;
        padding: 1rem 1rem ${props => props.padding === "small" ? "1.5rem" : "1rem"};
        opacity: 1;
        z-index: ${props => props.display === "hidden" ? "1" : "2"};
        transform: ${props => props.display === "hidden" ? "initial" : "translate(0, -100%)"};
        transition: transform .3s linear .1s;  
    }
     
`;

export default Skill

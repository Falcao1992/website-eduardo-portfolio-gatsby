import React from "react";
import styled from "styled-components";
import { Icon } from '@iconify/react';

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


const Skill = () => {
    return (
        <ContainerSkill>
            <SubtitleStyled>Skills :</SubtitleStyled>
            <ContainerIcons>
                <Icon icon={logoReact} width="45" height="45" />
                <Icon icon={logoCss3} width="45" height="45" />
                <Icon icon={logoHtml5} width="45" height="45" />
                <Icon icon={logoJavascript} width="45" height="45" />
                <Icon icon={logoGithub} width="45" height="45" />
                <Icon icon={logoNodejs} width="45" height="45" />
                <Icon icon={expressIcon} width="45" height="45" />
                <Icon icon={mysqltwoIcon} width="45" height="45" />
                <Icon icon={logoFirebase} width="45" height="45" />
                <Icon icon={gitlabIcon} width="45" height="45" />
                <Icon icon={gatsbyIcon} width="45" height="45" />
                <Icon icon={styledComponents} width="70" height="70" />
            </ContainerIcons>
        </ContainerSkill>
    )
};

const ContainerSkill = styled.section`
    background-color: ${props => props.theme.colors.primary};
`;

const SubtitleStyled = styled.h2`
    color: ${props => props.theme.colors.dark};
    padding: 1rem 0;
    border-bottom: 1px dashed ${props => props.theme.colors.dark};
    width: max-content;
    margin: auto;
`;

const ContainerIcons = styled.div`
    background-color: ${props => props.theme.colors.primary};
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: .5rem;
    padding: 2rem 1rem;
    svg {
        margin: auto;
    }
`;

export default Skill

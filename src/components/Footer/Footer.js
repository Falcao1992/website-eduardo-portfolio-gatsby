import React from "react";
import styled from "styled-components";

import {Icon} from '@iconify/react';
import logoGithub from '@iconify/icons-ion/logo-github';
import logoLinkedin from '@iconify/icons-ion/logo-linkedin';
import mailRu from '@iconify/icons-cib/mail-ru';
import mobilePhoneSolid from '@iconify/icons-clarity/mobile-phone-solid';


const Footer = () => {
    return (
        <ContainerFooter>
            <BlockLogo>
                <BlockIcon>
                    <a href="https://github.com/Falcao1992?tab=repositories"
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label="Github"
                    >
                        <Icon icon={logoGithub} width="35" height="35"/>
                    </a>
                </BlockIcon>
                <BlockIcon>
                    <a href="https://www.linkedin.com/in/eduardo-l%C3%A9pine/"
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label="Linkedin"
                    >
                        <Icon icon={logoLinkedin} width="35" height="35"/>
                    </a>
                </BlockIcon>
                <BlockIcon>
                    <a href="mailto:eduardo.lepine.pro@gmail.com" aria-label="mail"><Icon icon={mailRu} width="35" height="35"/></a>
                </BlockIcon>
                <BlockIcon>
                    <a href="tel:0659069604" aria-label="phone"><Icon icon={mobilePhoneSolid} width="35" height="35"/></a>
                </BlockIcon>
            </BlockLogo>
            <BlockText>
                <p>©2020 Eduardo Lépine, Tous droits réservés</p>
            </BlockText>
        </ContainerFooter>
    )
};

const ContainerFooter = styled.footer`
    background-color: ${props => props.theme.colors.primary};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
`;

const BlockText = styled.div`
    p {
      text-align: center;
      padding: .25rem 0;
    }
    
`;
const BlockIcon = styled.div`
    margin: 0 .5rem;
    cursor: pointer;
    a {
      color: initial;
    }
    
    svg {
       opacity: .5;
       transition: all .4s ease-in-out;
    }    
    svg:hover {
        opacity: .9;
        color: ${props => props.theme.colors.secondary};
    }
`;

const BlockLogo = styled.div`
    display: flex;
    padding: 1rem 0;
    
`;

export default Footer

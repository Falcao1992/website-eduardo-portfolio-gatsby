import React, {useState} from "react";
import styled from "styled-components";
import {Button, TextField} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import app from "../../firebase";


const ContactForm = () => {
    const data = {
        name: "",
        firstName: "",
        mail: "",
        phoneNumber: "",
        message: "",
        read: "false",
        key: "",
        dateMessage: ""
    };
    const [formData, setFormData] = useState(data);
    const [hasBeenSent, setHasBeenSent] = useState(false);
    const [missingField, setMissingField] = useState(false);

    const {name, mail, phoneNumber, message, firstName} = formData;

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };


    const sendData = () => {
        let newPostKey = app.database().ref("contactMessage").push().key;
        formData.dateMessage = Date.now();
        formData.key = newPostKey;
        app.database().ref(`contactMessage`).update({
            [newPostKey]: formData
        });
        setHasBeenSent(true);
        setTimeout(() => {
            setHasBeenSent(false);
            console.log("data envoyé , le message disparait apres 5sec")
        }, 5000);
        setFormData(data);
        console.log("forulaire envoyé")
    };

    const checkFormConform = () => {
        return new Promise(function (resolve, reject) {
            if (name !== "" && firstName !== "" && message !== "" && mail !== "") {
                console.log("tout est rempli merci");
                sendData();
                setMissingField(false);
                resolve("resolu")
            } else {
                setMissingField(true);
                reject('pas résolu')
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await checkFormConform();
        console.log(result)
    };

    return (
        <ContainerContact>
            <SubtitleStyled>Nous Contacter :</SubtitleStyled>
            {hasBeenSent && <ToastHasBeenSent><CheckIconStyled/> Votre message à bien été envoyé !</ToastHasBeenSent>}
            <FormStyled onSubmit={handleSubmit} autoComplete="off">


                <TextFieldStyled onChange={handleChange} value={name}
                                 id="name"
                                 autoComplete="off"
                                 label="Nom *" variant="filled"
                                 helperText={missingField && name === "" ? <small>Veuillez indiquer votre Nom svp
                                     !</small> : name !== "" && missingField ?
                                     <CorrectField>bien rempli*</CorrectField> : false}
                                 error={missingField && name === "" && true}
                />

                <TextFieldStyled onChange={handleChange} value={firstName}
                                 id="firstName"
                                 label="Prénom *" variant="filled"
                                 helperText={missingField && firstName === "" ?
                                     <small>Veuillez indiquer votre Prénom svp
                                         !</small> : firstName !== "" && missingField ?
                                         <CorrectField>bien rempli*</CorrectField> : false}
                                 error={missingField && firstName === "" && true}
                />

                <TextFieldStyled onChange={handleChange} value={message}
                                 multiline
                                 rows={4}
                                 id="message"
                                 label="message *" variant="filled"
                                 helperText={missingField && message === "" ?
                                     <small>Veuillez rentrer un message svp !</small> : message !== "" && missingField ?
                                         <CorrectField>bien rempli*</CorrectField> : false}
                                 error={missingField && message === "" && true}
                />

                <TextFieldStyled onChange={handleChange} value={mail}
                                 type="mail"
                                 id="mail"
                                 label="Email *" variant="filled"
                                 helperText={missingField && mail === "" ?
                                     <small>Veuillez rentrer une adresse mail valide
                                         !</small> : mail !== "" && missingField ?
                                         <CorrectField>bien rempli*</CorrectField> : false}
                                 error={missingField && mail === "" && true}
                />

                <TextFieldStyled onChange={handleChange} value={phoneNumber}
                                 id="phoneNumber"
                                 label="Numéro de téléphone (Falcutatif)" variant="filled"
                />

                <ButtonCreate variant="contained" type="submit" color="primary"
                              aria-label="edit">Envoyer</ButtonCreate>
            </FormStyled>
        </ContainerContact>
    )
};

const ContainerContact = styled.section`
    background-color: ${props => props.theme.colors.dark};
    padding: 2rem 0;
`;

const SubtitleStyled = styled.h2`
    color: ${props => props.theme.colors.primary};
    width: max-content;
    padding: 1rem 0;
    margin: 1rem auto;
    border-bottom: 1px dashed ${props => props.theme.colors.primary};
`;

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    padding: 3rem;       
    input {
        margin-bottom: 15px;
    }
    @media only screen and (min-width:800px) {
        width: 70%;
        margin: auto;       
    }
`;

const ToastHasBeenSent = styled.p`
    background-color: #40ee5b;
    padding: 10px 5px;
    text-align: center;
`;

const CheckIconStyled = styled(CheckIcon)`
    vertical-align: bottom;
`;

const CorrectField = styled.small`
    color: green
`;


const TextFieldStyled = styled(TextField)`
    margin-bottom: 25px;
    
    // couleur du label si selectionné
    .Mui-focused { 
        color: ${props =>props.theme.colors.secondary} !important;
    }   
    // couleur du label si pas selectionné
    .MuiFormLabel-root {
        color: ${props =>props.theme.colors.primary}
    }
    // Color Underline
    .MuiFilledInput-underline:after {
        border-bottom: 2px solid ${props =>props.theme.colors.secondary};
        transition: transform 900ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
    }
    
    // All Input Filled
    .MuiFilledInput-root {
        background-color: ${props =>props.theme.colors.lightDark}; 
    }

    .MuiInputBase-root {
        color: aliceblue;
    }

    input {
        margin-bottom: 0;
    }   

    // input's BackgroundColor when autofill active
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
    }
    // input's color when autofill active
    input:-webkit-autofill {
        -webkit-text-fill-color: ${props =>props.theme.colors.secondary} !important;
    } 
          
`;



const ButtonCreate = styled(Button)`
    width: 50%;
    margin: auto;
    background-color: black;
    color: ${props => props.theme.colors.secondary} !important;
    transition: all .3s;
    &:hover {
        background-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.primary} !important;
    }       
`;

export default ContactForm

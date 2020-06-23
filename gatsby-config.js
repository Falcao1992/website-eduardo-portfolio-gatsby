require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    siteMetadata: {
        title: `'Eduardo Lépine | Développeur Web Junior`,
        description: `Issue de la formation Développeur full-stack React/Node.js à la Wild Code School de Tours, Création et intégration de sites Internet Responsive, référencement SEO avec GatsbyJs et pour le traitement de données avec NodeJs/Express/MySQL/Firebase.`,
        author: `Eduardo Lépine`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: `gatsby-plugin-styled-components`,
            options: {
                // Add any options here
            },
        },
        {
            resolve: `gatsby-plugin-remote-images`,
            options: {
                nodeType: 'firebaseData',
                imagePath: 'urlImage',
                name: 'fileFirebase',
            },
        },
        {
            resolve: `gatsby-plugin-material-ui`,
            options: {
                stylesProvider: {
                    injectFirst: true,
                },
            },
        },
        `gatsby-background-image-es5`,
        {
            resolve: 'gatsby-background-image-es5',
            options: {
                // add your own characters to escape, replacing the default ':/'
                specialChars: '/:',
            },
        },
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [
                    `Pinyon Script`,
                    `Raleway\:300,400,500,700` // you can also specify font weights and styles
                ],
                display: 'swap'
            }
        }

        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
};

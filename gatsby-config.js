require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

const {
    NODE_ENV,
    URL: NETLIFY_SITE_URL = 'https://eduardolepine.netlify.app',
    DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
    CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env;

const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

module.exports = {
    siteMetadata: {
        title: `Eduardo Lépine | Développeur Web Junior`,
        description: `Issue de la formation Développeur full-stack React/Node.js à la Wild Code School de Tours, Création et intégration de sites Internet Responsive, référencement SEO avec GatsbyJs et pour le traitement de données avec NodeJs/Express/MySQL/Firebase.`,
        author: `Eduardo Lépine`,
        siteUrl: siteUrl,
        social: {
            twitter: `eduardo`,
        },
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                resolveEnv: () => NETLIFY_ENV,
                env: {
                    production: {
                        policy: [{userAgent: '*'}],
                    },
                    'branch-deploy': {
                        policy: [{userAgent: '*', disallow: ['/']}],
                        sitemap: null,
                        host: null,
                    },
                    'deploy-preview': {
                        policy: [{userAgent: '*', disallow: ['/']}],
                        sitemap: null,
                        host: null,
                    },
                },
            },
        },
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
        'gatsby-plugin-offline',
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Eduardo Lépine | Développeur Web Junior`,
                short_name: `Eduardo Lépine | Dév Web Junior`,
                start_url: `/`,
                background_color: `black`,
                theme_color: `black`,
                display: `standalone`,
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
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                // replace "UA-XXXXXXXXX-X" with your own Tracking ID
                trackingId: process.env.GATSBY_APP_TRACKING_ID,
                head: true,
            },
        },

        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
    ],
};

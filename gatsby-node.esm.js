import app from "./src/firebase";

const path = require("path");

exports.onCreateWebpackConfig = ({
                                     stage,
                                     actions,
                                     getConfig
                                 }) => {
    if (stage === 'build-html') {
        actions.setWebpackConfig({
            externals: getConfig().externals.concat(function (context, request, callback) {
                const regex = /^@?firebase(\/(.+))?/;
                // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
                if (regex.test(request)) {
                    return callback(null, 'umd ' + request);
                }
                callback();
            })
        });
    }
};

exports.sourceNodes = async ({
                                 actions,
                                 createNodeId,
                                 createContentDigest
                             }) => {

    const {createNode} = actions;

    const flattenTranslations = (obj, parents = []) => {
        if (typeof obj !== 'object') {
            return []
        }
        return Object.entries(obj)
            .flatMap(([currentItemName, value]) => {
                if (typeof value !== 'object' && currentItemName === "urlImage") {
                    return [
                        obj
                    ]
                }
                return flattenTranslations(value, parents.concat(currentItemName))
            })
    };

    const fetchDataFirebase = await app.database().ref("/projects").once("value")
        .then(snapshot => {
            return flattenTranslations(snapshot.val());
        });

    const fetchDataFirebaseBanner = await app.database().ref("/banners").once("value")
        .then(snapshot => {
            return flattenTranslations(snapshot.val());
        });

    const allFirebaseData = fetchDataFirebase.concat(fetchDataFirebaseBanner);


    for (const result of allFirebaseData) {
        const nodeId = createNodeId(`${result.uid}`);
        const nodeContent = JSON.stringify(result);
        const node = Object.assign({}, result, {
            id: nodeId,
            originalId: result.uid,
            parent: result.uid,
            children: [],
            //title: result.title,
            //type:result.type,
            internal: {
                type: "firebaseData",
                description: result.key,
                content: nodeContent,
                contentDigest: createContentDigest(result)
            }
        });
        createNode(node);
    }
};

exports.createResolvers = ({createResolvers}) => {
    const resolvers = {
        firebaseData: {
            type: {
                resolve: source => {
                    return source.type
                }
            },
            key: {
                resolve: source => {
                    return source.key
                }
            },
            urlImage: {
                resolve: source => {
                    return source.urlImage
                }
            },
            projectTitle: {
                resolve: source => {
                    return source.projectTitle
                }
            },
            description: {
                resolve: source => {
                    return source.description
                }
            },
            sourceNetlify: {
                resolve: sources => {
                    return sources.sourceNetlify
                }
            },
            uid: {
                resolve: source => {
                    return source.uid
                }
            },
        }
    };
    createResolvers(resolvers);
};

exports.createSchemaCustomization = ({actions}) => {
    const {createTypes} = actions;
    const typeDefs = `
    type firebaseData implements Node {
      type: String!
      key: String
      urlImage: String!
      projectTitle: String
      description: String
      sourceNetlify: String
      uid: String!
    }
  `;
    createTypes(typeDefs);
};


exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions;
    const firebaseData = await graphql(`
        query {
            allFirebaseData(filter: {type: {eq: "project"}}) {
                distinct(field: key)
                    nodes {
                        projectTitle
                        key
                }
            }
        }
    `);


    firebaseData.data.allFirebaseData.distinct.forEach(key => {
        createPage({
            path: key,
            component: path.resolve("./src/templates/project.js"),
            context: {
                key: key,
                projectTitle: firebaseData.data.allFirebaseData.nodes
            }
        })
    });
};

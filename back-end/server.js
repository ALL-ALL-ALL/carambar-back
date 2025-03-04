// config de base 

// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('la vie la terre le soleil');
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

// point de départ qui relie votre serveur web (Express) avec votre base de données (Sequelize/SQLite).


const express = require('express'); // importation de express framework de la biblotheque de node.js pour construire app web et api 

const { sequelize, Joke } = require('./models'); // importation de deux element de mon fichier model  
                                                  // joke qui represente les table et (sequelize ) la base de donnée 

const app = express(); // cration de app  express 
app.use(express.json()); // Utilisation du middleware pour traiter les données JSON dans les requêtes

const cors = require('cors'); // Importation du module CORS pour autoriser les requêtes cross-origin (mais sans agir comme si on prend un outil)


// Activez CORS  permettre les requette venant de nimporte ou du moins git et render il me semble  (est la j'utilise mon outil pour apliqquer  )
app.use(cors());



// Creation d'un ROUTEUR pour la Version 1 (elle permettra de grouper les routes via la methode Express)

const v1Router = express.Router();


 


                      //  tester api au debut 

// // pour consulter une blague en mode ramdom aleatoire 

// // async permet de traiter plusieur requette sans que celle-ci soit finit sinon chaque action doit attendre que la précédente soit terminée avant de continuer
// app.get('/blagues/random', async (req, res) => {    // la méthode GET fait référence à l'URL spécifiée
//   try {
//     const randomJoke = await Joke.findOne({   // utilise la méthode findOne() de Sequelize pour récupérer une blague au hasard
//       order: sequelize.literal('RANDOM()') // choisir une blague au hasard avec sequelize dans la base de donnée
//     });

//     if (!randomJoke) {
//       return res.status(404).json({ message: 'Aucune blague trouvée' }); // si aucune blague est trouve alors erreur 404
//     }

//     res.status(200).json(randomJoke); // sinon Renvoie la blague aléatoire avec status 200 OK 
//   } catch (error) {
//     console.error('Erreur lors de la récupération de la blague aléatoire:', error); // sinon status 500 avec un message d'erreur 
//     res.status(500).json({ message: 'Erreur serveur' }); // et un message d'erreur pour le server 
//   }
// });

// //  pour ajouter une blague

// // async permet de traiter plusieur requette sans rien bloquer
// app.post('/blagues', async (req, res) => {
//   try {
//     const { content } = req.body; // recupere le contenu de la blague car "content" via la requete
//     const newJoke = await Joke.create({ content }); // utilise la méthode create() de Sequelize pour insérer la blague dans la base de données
//     res.status(201).json(newJoke);  // renvoi la blague cree en status 201  
//   } catch (error) {                  // chope en cas d'erreur  avec un status 500 avec le message
//     res.status(500).json({ error: 'Erreur lors de l\'ajout de la blague' });
//   }
// });


     // pour consulter une blague avec son ID 

// // toujours en async 
// app.get('/blagues/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const joke = await Joke.findByPk(id); // Recherche une blague avec la methode (findByPk) de sequilizze avec id
//     if (joke) {
//       res.status(200).json(joke); // Si la blague existe, la renvoyer status 200 ok
//     } else {
//       res.status(404).json({ message: 'Blague non trouvée' }); // Si la blague n'existe pas status 404
//     }
//   } catch (error) {
//     console.error('Erreur lors de la récupération de la blague:', error); // prendre l 'erreur la catcher avec un status 500 avec son message 
//     res.status(500).json({ message: 'Erreur lors de la récupération de la blague' });
//   }
// });

// // pour recuprer toutes les jokesss 

// // toujours en async 
// app.get('/blagues', async (req, res) => {
//   try {
//     const allJokes = await Joke.findAll(); // Récupère toutes les blagues avec la methode findAll() de sequilize
//     res.status(200).json(allJokes); // Envoie les blagues en réponse avec son status
//   } catch (error) {
//     console.error('Error fetching jokes:', error);  // catch l'erreur avec son message 
//     res.status(500).json({ message: 'Error fetching jokes' });
//   }
// });




















//------------SWAGGER---SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER----------------------------------------
//------------SWAGGER---SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER----------------------------------------
//------------SWAGGER---SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER----------------------------------------
//------------SWAGGER---SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER----------------------------------------
//------------SWAGGER---SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER----------------------------------------
//------------SWAGGER---SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER----------------------------------------



  // pour intergrer SWAGGER 
  // importation swager

const swaggerJsdoc = require('swagger-jsdoc'); // Import de swagger-jsdoc
const swaggerUi = require('swagger-ui-express'); // Import de swagger-ui-express


  
// Configuration de Swagger  ce qui équivaut a ce qu'on verra dans la banniere plus le server
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Carambar & Co',
      version: '1.0.0',
      description: 'API pour gérer une collection de blagues Carambar',
      contact: {
        name: 'Allan ixart',
        url: 'https://all-all-all.github.io/Mini-App-carambar-and-co/'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      },
      {
        url: 'https://mini-app-carambar-and-co.onrender.com',
        description: 'Serveur de production'
      }
    ],
  },
  apis: ['./server.js'], // Le fichier qui contient les routes etc..
};

// en gros il traduit les anotations donc les commentaire ( @swagger ) en formation jSON et se document JSON passe apres par Swagger UI (juste en bas) qui configure l'interface 
const swaggerDocs = swaggerJsdoc(swaggerOptions); //   elle utilise la fonction swaggerJsdoc 

// Génération de swagger ui quand ya /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // // on peux voir la terminaison - /api-docs - quand un utilisateur et sur /api-docs express lui dit sert toi de swagger ui 


// Route d'accueil pour rediriger vers la documentation car si un utilisateur veux aller a la racine de api au lieu de voir un 404 erreur ou 502 ou un truc vide il aura une redirection 
app.get('/', (req, res) => {
  res.send('API Carambar & Co -  Vous pouvez Accéder à la documentation sur /api-docs     à bientôt 🙋🏻‍♂️🙋🏻‍♂️🙋🏻‍♂️' );
});


// voila le model swagger et de mes routes (des 4 end-point)
// le shemas du model joke  que lon va retrouver tout en bas dans la page 
//LE SCHEMAS
/**
 * @swagger
 * components:
 *   schemas:
 *     Joke:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: ID automatique de la blague
 *         content:
 *           type: string
 *           description: Le texte de la blague
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création (automatique)
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière modification (automatique)
 */
















// la je documente mon end-point RANDOM 

/**
 * @swagger
 * /v1/blagues/random:
 *   get:                                        
 *     summary: Récupère une blague aléatoire     
 *     tags: [Blagues V1]                            
 *     responses:                                 
 *       200:
 *         description: Une blague aléatoire      
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:                                         
 *         description: Aucune blague disponible      
 *       500:                                      
 *         description: Erreur serveur
 */


//processs
// 1er etape: on recupere les blague dans la base de donner    (avec la methode choisi en l'occurence sequilize qui permet de récupérer tous les enregistrements d'un modèle)
//2em etape: on les transforme en format json et les envoi avec un status 200 ok     (avec .json)  (status 200 ok) avec des console.log si on veut pour debeuger
//3em etape : est cree une gestion d'erreur si tout ne va pas      (catch) avec des console.log si on veut mettre un message 

// async permet de traiter plusieur requette sans que celle-ci soit finit sinon chaque action doit attendre que la précédente soit terminée avant de continuer
// Route Version 1 RANDOM 

v1Router.get('/blagues/random', async (req, res) => {    // la méthode GET 
  try {
    const randomBlagues = await Joke.findOne({   // cree une variable qui stock le resultat utilise la méthode findOne() de Sequelize pour récupérer une blague au hasard dans la base de données
      order: sequelize.literal('RANDOM()') // choisir une blague au hasard avec sequelize dans la base de donnée
    });

    if (!randomBlagues) { // Si aucune blague n'est trouvée !
      return res.status(404).json('Tu as eu acces à la base de donnée mais la Blague que tu cherches existe pas 🙋🏻‍♂️'); // si aucune blague est trouve alors erreur 404
    }

    res.status(200).json(randomBlagues); // sinon Renvoie la blague aléatoire avec status 200 OK 
  } catch (error) {
    console.error('Erreur lors de la récupération de la blague aléatoire:', error); // pour le debeug pour moi 
    res.status(500).json({ message: 'Erreur serveur' }); //  message d'erreur problème du au  server 
  }
});









// la je documente mon end-point POST donc (l'ajout de blagues)

/**
 * @swagger
 * /v1/blagues:
 *   post:
 *     summary: Ajoute une nouvelle blague
 *     tags: [Blagues V1]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Le texte de la blague
 *     responses:
 *       201:
 *         description: Blague créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       500:
 *         description: Erreur lors de l'ajout de la blague
 */

// async permet de traiter plusieur requette sans rien bloquer
// Route (Ajout de blagues) Version 1

v1Router.post('/blagues', async (req, res) => {
  try {
    const { content } = req.body; //  je recupere le contenu de la blague car "content" via la requete
    const ajoutBlague = await Joke.create({ content }); // cree une variable qui stock le resultat utilise la méthode create() de Sequelize pour insérer la blague dans la base de données
    res.status(201).json(ajoutBlague);  // j'envoi la blague en repons cree en status 201  
  } catch (error) {                  
    res.status(500).json('Erreur server 🙋🏻‍♂️'); // probleme avec le server chope en cas d'erreur  avec un status 500 avec le message
  }
});

  




// la je documente mon end-point GET avec (ID) de la blague

/**
 * @swagger
 * /v1/blagues/{id}:
 *   get:
 *     summary: Récupère une blague par son ID
 *     tags: [Blagues V1]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la blague
 *     responses:
 *       200:
 *         description: Détails de la blague
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: Blague non trouvée
 *       500:
 *         description: Erreur lors de la récupération de la blague
 */
// toujours en async 
// Route Version 1 recuperation (ID) 
v1Router.get('/blagues/:id', async (req, res) => {
  try {
    const blagueId = await Joke.findByPk(req.params.id); // cree une variable qui stock le resultat Recherche une blague avec la methode (findByPk- by my primera key ) de sequilizze avec id dans la base de donnéé      (avant c'était id mais le changement est dans la route pas dans la recup du parametre)
    if (blagueId) {
      res.status(200).json(blagueId); // Si la blague existe, la renvoyer status 200 ok
    } else {
      res.status(404).json( 'Tu as eu acces à la base de donnée mais la Blague que tu cherches existe pas 🙋🏻‍♂️' ); // acces a la base de données mais la blague n'existe pas status 404 
    }
  } catch (error) {
    console.error('Erreur le server reessayer 🙋🏻‍♂️'); // pour moi pour debeuger 
    res.status(500).json('Erreur avec le server 🙋🏻‍♂️'); // prendre l 'erreur la catcher avec un status 500 avec son message 
  }
});


// la je documente mon end-point GET pour (recuperer toutes les blagues)


/**
 * @swagger
 * /v1/blagues:
 *   get:
 *     summary: Récupère toutes les blagues
 *     tags: [Blagues V1]
 *     responses:
 *       200:
 *         description: Liste de toutes les blagues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Joke'
 *       500:
 *         description: Erreur lors de la récupération des blagues
 */

// toujours en async 
// Route Version 1  de (toutes les blagues )
v1Router.get('/blagues', async (req, res) => {
  try {
    const toutesLesBlagues = await Joke.findAll(); // cree une variable qui stock le resultat Récupère toutes les blagues  avec la methode findAll() de sequilize dans la base de données
    res.status(200).json(toutesLesBlagues); // Envoie les blagues en réponse avec son status
  } catch (error) {
    console.error('Erreur server');  // pour le debeug pour mooi  
    res.status(500).json('Erreur avec server reessayer 🙋🏻‍♂️');  // catch l'erreur avec son message probleme avec le server 
  }
});

// et on utilise le routass express
app.use('/v1', v1Router);
app.use('/V1', v1Router);


// Démarrer le serveur 3000 avec un console.log message Serveur est en marche sur http://localhost:3000
app.listen(3000, () => {
  console.log('Serveur est en marche sur http://localhost:3000');
});
const express = require('express');     // On importe le module déjà installé en ligne de commande
const app = express();

//Importation de body-parser (après l'avoir installé : npm install --save body-parser)
const bodyParser = require('body-parser');// Création d'une instance de l'application express()

const port = 3000;
const frenchMovies = [
    { title: 'Le fabuleux destin d\'Amélie Poulain', year: 2001},
    { title: 'Buffet froid', year: 1979},
    { title: 'Le dîner de cons', year: 1998},
    { title: 'De rouille et d\'os', year: 1998},
];

// Permet d'ajouter les MiddleWares
// Permet de reconnaitre ce qui se trouve dans '/public' comme fichiers static
app.use('/public', express.static('public'));

// Pour pouvoir utiliser body-parser :
//app.use(bodyParser.urlencoded({ extended: false })); // methode 1


// 2 configurations pour pouvoir utiliser EJS :
//          - Indique ou seront disposées nos views :
app.set('views', './views');

//          - Déclare le "View Engine" utilisé :
app.set('view engine', 'ejs');

app.get('/movies', (req, res) => {

    const title = 'Films Français des 30 dernières années ';

    res.render('movies', { movies: frenchMovies, title: title });
});

const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.post('/movies', urlencodedParser, (req, res) => {
    console.log('ligne 41')
    console.table(req.body);

    // Autre affichage possible :
    console.log('Titre : ', req.body.title);
    console.log('Année : ', req.body.year);
    const newMovie = { title : req.body.movietitle, year : req.body.movieyear };
    // Ajouter à un tableau existant :
    frenchMovies.push(newMovie);

    // Ajouter en recréant un nouveau tableau (ES6) : (plus moderne "spread operator" : ...)
    // Equivalent de .push mais en recréant un nouveau tableau
    // frenchMovies = [...frenchMovies, newMovie];
    console.table(frenchMovies)
});

app.get('/movies/add', (req, res) => {
    res.send("<b>Bientôt la possibilité d'ajouter des films ici !</b>")
});

app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    const title = req.params.title;
    // res.send( `Film n° ${id}`  )
    res.render('movie-details', { movieId: id });
});

app.get('/', (req, res) => {
    // res.send('<b>Hello World !</b>')
    // 'render' permet d'importer des templates : (ici index.ejs)
    res.render('index');
});

app.listen(port, () => {           // Demande à l'application d'écouter sur le port 3000
    console.log(`Listening on port ${port}`);
});

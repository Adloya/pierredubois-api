# pierredubois-api
Une API pour les informations, les actualités, les réseaux sociaux du Collège Pierre Dubois à 🗺Laval

[![Website naereen.github.io](https://img.shields.io/website-up-down-green-red/https/pierredubois-api.herokuapp.com.svg)]([https://pierredubois-api.herokuapp.com](https://pierredubois-api.herokuapp.com))
[![GitHub license](https://img.shields.io/github/license/Adloya/pierredubois-api.svg)](https://github.com/Adloya/pierredubois-api/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/Adloya/pierredubois-api.svg)](https://GitHub.com/Adloya/pierredubois-api/issues/)



## Comment l'utiliser ?
Faites une requête GET à l'adresse suivante : https://pierredubois-api.herokuapp.com/
  - Pour accéder aux news du collège, faites une requête vers /news
  - Pour accéder aux tweets du collège, faites une requête vers /tweeter (PAS ENCORE DISPONIBLE)
  - Pour accéder aux journaux du collège, faites une requête vers /dubnews (PAS ENCORE DISPONIBLE)
  
## Reproduire l'API sur votre propre serveur
Clonez ce repo `git clone https://github.com/Adloya/pierredubois-api.git`
Dans le répertoire du projet, initialisez le projet comme ceci :

  - Installez les dépendances : `npm i`
  - Créez un fichier .env, remplissez le avec l'adresse de votre base de donnée MongoDB (pour d'autres bases de données cela necessite une réécriture) : `DATABASE_URL="     <votre_url>"`
  - Initialisez Prisma : `npx prisma generate` (en cas d'erreur, éxécutez d'abord `npx prisma init` puis `npx prisma generate`)
  - Dans le fichier json/twitterclient.json, remplissez les lignes avec vos tokens Twitter API v2
  - Executez le projet : ``node index.js`` (vous pouvez également utiliser des gestionnaires comme pm2 ou nodemon)

## Routes
|Route| Nom de la page | Utilité | Disponibilité (✅/❌)
|--|--|--|--|
| / | Accueil | Liste les différentes routes | ✅
| /news | Actualités | Les dernières actualités du collège | ✅
| /dubnews | Journaux "Dub'news" | Les derniers journaux du collège | ❌
| /twitter | Tweets | Les derniers Tweets du collège | ❌
| /youtube | Videos Youtube | Les dernières vidéos Youtube du collège | ❌

D'autres fonctions et d'autres routes seront ajoutées à l'API pour avoir le maximum d'informations utiles sur le Collège Pierre Dubois


### License : MIT
### Créé avec ❤ par Adloya

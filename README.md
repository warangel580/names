# Répartition des prénoms de naissance en France de 1900 à 2021 (source INSEE)

## Utilisation

- Mettre les dépendances à jour (`yarn` ou `npm install`)
- Télécharger la source des données (cf. Source des données plus bas)
- Parsing .csv -> .json : `yarn run parse [minYear] [maxYear]`
- Statistiques sur le fichier .json pour enrichir les données : `yarn run stats`

- Lister les prénoms avec leur répartition : `yarn run list [sortBy=gender_spectrum|popularity_spectrum|popularity|gender_popularity|gender] [minUsage] [maxUsage]`
- Ouvrir le fichier list.txt pour voir les résultats
OU
- Lister l'utilisation d'un nom au fil du temps : `yarn run usage <name>`
- Ouvrir le fichier history.txt pour voir les résultats

Exemples complets :

Les prénoms ordonnés par popularité dans les années 2000+ (Emma et Lucas)
- `yarn run parse 2000 _ && yarn run stats && yarn run list popularity_spectrum`

Les prénoms ordonnés par popularité avant les années 2000 (Marie et Jean)
- `yarn run parse _ 1999 && yarn run stats && yarn run list popularity_spectrum`

Les prénoms ordonnés par genre donnés en 1990 (Elodie et Kevin)
- `yarn run parse 1990 1990 && yarn run stats && yarn run list popularity_spectrum`

Les prénoms peu donnés entre 1980 et 1999 ordonnés par genre puis popularité
- `yarn run parse 1980 1999 && yarn run stats && yarn run list gender_popularity 50 500`

Utilisation du prénom "MARIE-ANTOINE" au fil des années
- `yarn run parse && yarn run stats && yarn run history "MARIE-ANTOINE"`

## Source des données

- Aller sur https://www.insee.fr/fr/statistiques/2540004
- Fichiers France hors Mayotte
- Télécharger le fichier .csv (sous format zip)
- L'extraire et renommer le fichier csv en data.csv
- Le mettre dans data/
- Mettre en header `gender;name;year;count` dans le fichier csv
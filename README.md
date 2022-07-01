# Répartition des prénoms de naissance en France

4 axes : genre / prénom (évidemment) / l'année / le nombre de fois où il a été utilisé

## Utilisation

- Mettre les dépendances à jour (`yarn` ou `npm install`)
- Parsing .csv -> .json : `yarn run parse [minYear] [maxYear]`
- Transformation .json pour améliorer les données : `yarn run transform`
- Lister les prénoms avec leur répartition : `yarn run list [sortBy=gender|popularity]`
- Ouvrir le fichier list.txt pour voir les résultats

Le tri des prénoms est le suivant : 100% utilisé pour des femmes - Majoritairement utilisé pour des femmes - Mixte - Majoritairement utilisés pour des hommes - 100% utilisé pour des hommes

Trier par `gender` privilégie le "majoritairement utilisé par X" et `popularity` privilégie le nombre de personnes portant le nom en question.

Exemples complets :

Les prénoms ordonnés par popularité dans les années 2000+ (Emma et Lucas)
- `yarn run parse 2000 _ && yarn run transform && yarn run list popularity`

Les prénoms ordonnés par popularité avant les années 2000 (Marie et Jean)
- `yarn run parse _ 1999 && yarn run transform && yarn run list popularity`

Les prénoms ordonnés par genre donnés en 1990 (Elodie et Kevin)
- `yarn run parse 1990 1990 && yarn run transform && yarn run list gender`

## Source des données

- Aller sur https://www.insee.fr/fr/statistiques/2540004
- Fichiers France hors Mayotte
- Télécharger le fichier .csv (sous format zip)
- L'extraire et renommer le fichier csv en data.csv
- Le mettre dans data/
- Mettre en header `gender;name;year;count` dans le fichier csv
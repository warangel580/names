# Répartition des prénoms de naissance en France

4 axes : genre / prénom (évidemment) / l'année / le nombre de fois où il a été utilisé

## Utilisation

- Parsing .csv -> .json : `yarn run parse`
- Transformation .json pour améliorer les données : `yarn run parse`
- Lister les prénoms avec leur répartition : `yarn run list [year=1990 or _ to ignore] [sortBy=gender|popularity]`

## Source des données

- Aller sur https://www.insee.fr/fr/statistiques/2540004
- Fichiers France hors Mayotte
- Télécharger le fichier .csv (sous format zip)
- L'extraire et renommer le fichier csv en data.csv
- Le mettre à la racine du projet
- Mettre en header `gender;name;year;count`
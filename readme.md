# INTRODUCTION
Ce script comporte des fonctionnalité récentes de node comme par exemple le mot clé await.
Il a été testé avec node 11.7.0, utilisez nvm pour installer et utiliser une version de node recente.

Il comporte plusieurs modes. 


# FONCTIONNEMENT
Pour le faire fonctionner, il faut configurer le mode et les settings du mode.
     Choisir un mode en configurant ./opts.json
     Chaque mode devra ensuite être configuré avant d'être lancé via son fichier settings.js trouvable dans son sous dossier : ./scripts/<mode>/settings.js

     Par exemple, pour lancer le mode "extract" il faudra :
          - configurer ./opts.json en indiquant "mode": "extract"
          - configurer ./scripts/extract/settings.js 
          - lancer npm startm
        
     Autre exemple, pour lancer le mode "import" il faudra :
          - configurer ./opts.json en indiquant "mode": "import"
          - configurer ./scripts/import/settings.js 
          - lancer npm start


# MODES

## extract 
Il génère :
* ALL-PROPS.json un gros fichier qui contient toutes les properties de toutes les cartriges
* essential.json un fichier qui contient toutes les properties sans les doublons inutiles
* TO-TRANSLATE.json un fichier simplifié qui vous interesse si vous voulez traduire. Ce fichier une fois traduit pourra être réimporté avec le mode import

## import
Placez le .json traduit dans /scripts/import/translated.json ou comme indiqué dans votre settings.js
Indiquer la langue de traduction dans settings.js exemple 'it_IT'
Le script 
* efface le contenu du dossier generatedProps
* génère toutes les .properties traduites du .json

## specificExtract
Permet d'extraire uniquement des clé spécifiques sous la forme d'un .csv
Attention ce script réutilise le mode 'extract' il faut donc configurer opts.json extract/settings.js et specificExtract/settings.js

## specificImport
Ce script vous permet de générer les properties uniquement pour quelques key / value dans un csv. 
Placer votre csv généré par le mode specificExtract et traduit dans le dossier de ce script.
Ce script utilise les scripts :
* extract au début puis 
* specificImport puis 
* import 
Vous devez donc paramétrer le fichier opts.json ainsi que les 3 settings.js des scripts utilisés.
Remarques : 
* Pour le moment ce script utilise 'import' vous ne pouvez donc avoir qu'une langue générée à la fois. Il vous faudra donc modifier import/settings et relancer le script pour les autre langues.
* Comme ce script utilise 'import' il génère toutes les properties même celles non demandées.
* Attention, il est plus prudent qu'il n'y ait qu'une seule colonne de traduction dans le csv exemple seulement it_IT

## specificImport
Pour une liste de locales, extrait seulement les keys / values qui sont en fr_FR et nl_NL mais pas dans la locale demandée.
Ce script étant destiné à être peu utilisé, il n'a pas de settings pour le moment. Il devra être amélioré s'il s'avère qu'on en a souvent besoin.

# TODO
Il faut refaire les old modes suivant :
* remove duplicates
* extract only new Langage
* remove the already translated from extract
* babyliss e-commerce import addEcommerceCSVtoEssential
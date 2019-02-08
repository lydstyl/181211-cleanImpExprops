Ce script a été testé avec node 11.7.0 .

Il comporte plusieurs modes. 


Pour le faire fonctionner, il faut configurer le mode et les settings du mode.
     Choisir un mode en configurant ./opts.json
     Chaque mode devra ensuite être configuré avant d'être lancé via son fichier settings.js trouvable dans son sous dossier : ./scripts/<mode>/settings.js

     Par exemple, pour lancer le mode "extract" il faudra :
          - configurer ./opts.json en indiquant "mode": "extract"
          - configurer ./scripts/extract/settings.js 
        
     Autre exemple, pour lancer le mode "import" il faudra :
          - configurer ./opts.json en indiquant "mode": "import"
          - configurer ./scripts/import/settings.js 


Les modes :
1/ 'extract' 
     Il génère 
          ALL-PROPS.json un gros fichier qui contient toutes les properties de tous les cartriges
          essential.json un fichier qui contient toutes les properties sans les doublons inutiles
          TO-TRANSLATE.json un fichier simplifié qui vous interesse si vous voulez traduire. Ce fichier une fois traduit pourra être réimporté avec le mode import

2/ 'import'
     Placez le .json traduit dans /scripts/import/translated.json ou comme indiqué dans votre settings.js
     Indiquer la langue de traduction dans settings.js exemple 'it_IT'
     Le script 
          efface le contenu du dossier generatedProps
          génère toutes les .properties traduites du .json

TODO : 
     Il faut refaire toutes les old features ou old modes à la manière des nouveaux modes extract et import
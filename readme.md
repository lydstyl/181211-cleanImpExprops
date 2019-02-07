 Ce script a été testé avec node 11.7.0 .
 
 Il comporte plusieurs modes.

 Chaque mode devra être configuré avant d'être lancé via son fichier settings.js trouvable dans son sous dossier.
 Par exemple, pour lancer le mode extract il faudra 
     - configurer ./opts.json en indiquant "mode": "extract"
     - configurer ./scripts/extract/settings.js 
 
 Les modes :
     1/ 'extract' 
          Il génère 
               ALL-PROPS.json un gros fichier qui contient toutes les properties de tous les cartriges
               essential.json un fichier qui contient toutes les properties sans les doublons inutiles
               TO-TRANSLATE.json un fichier simplifié qui vous interesse si vous voulez traduire. Ce fichier une fois traduit pourra être réimporté avec le mode import.
     
     1.2/ 'remove the already translated from extract'
          Il génère un .json qu'il faudra traduire sans ce qui est déjà traduit.
     
     2/ 'import'
          Placez le .json extrait et traduit à la racine de ce dossier.
          Supprimer le contenu du dossier "translatedProps"
          changer "newlanguage" dans opts.json par le nom de la locale traduite (pour qu'il complete bien les nom de fichier ex: mail_nl_BE.properties) 
          Le script génère toutes les .properties traduites.

     3/ 'remove duplicates'
          Le script génère uniquement les .properties qui avaient une ou plusieurs clés en double.
 
 
 TODO : 
    en mode import, 
       il faut vider le dossier des properties avant de lancer le script (à automatiser)
       des <cartridgeName>.properties sont générées

 Ce script fonctionne avec le fichier opts.json qu'il faut préalablement éditier.
 Ce script a été testé avec node 11.7.0 .
 
 Il comporte 3 modes :
 
 1/ 'extract' 
      Il génère un .json qu'il faudra traduire.
 
 
 ATTENTION : pour les autre modes ci-dessous, il est nécessaire d'avoir lancé le mode extract d'abord.
 
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

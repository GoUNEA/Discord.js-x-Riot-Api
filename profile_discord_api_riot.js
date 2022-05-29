/* déclarer sa key riot
const riotApiKey = ("VOTRE KEY")

installer et déclarer axios
npm i axios
const axios = require('axios')*/



if(message.content.startsWith(prefix + "lol")) {
        //récupération du pseudo du joueur
        var args = message.content.slice(prefix.length).split(/ +/);
        var name = args.slice(1)

        if(!name) return message.channel.send("Ce pseudo n'existe pas ou est mal écrit !")
            
        // récupération des données personnelles de l'utilisateur indiqué via discord
        const profile = await axios.get('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + "?api_key=" + riotApiKey);

        // identifiant du joueur
        var encryptedId = profile.data.id

        // récupération et listage de toutes les informations ranked du joueur
        const rank = await axios.get('https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + encryptedId + "?api_key=" + riotApiKey);
        console.log(rank)
        console.log(profile.data.id)

        //variables 
        let flexRank
        let soloQrank
        let soloQratio
        let flexRatio
        
        // permet d'indiquer "Non classé" ou "Pas de partie enregistrée" lorsque les variables ne sont pas définies
        if(soloQrank == undefined) soloQrank = "Non classé"
        if(flexRank == undefined) flexRank = "Non classé "
        if(soloQratio == undefined) soloQratio = "Pas de partie enregistrée"
        if(flexRatio == undefined) flexRatio = "Pas de partie enregistrée"


        // essais en fonction de où est placer chaque type de queue dans le JSON que l'api nous envoie
        try{
        if(rank.data[0].queueType == "RANKED_SOLO_5x5") {
            soloQrank = rank.data[0].tier + " " + rank.data[0].rank + " " + rank.data[0].leaguePoints + " " + "LP"
            soloQratio = rank.data[0].wins + " victoires" + " / " + rank.data[0].losses + " défaites"
        }}
        catch{} 

        try{
        if(rank.data[1].queueType == "RANKED_SOLO_5x5") {
            soloQrank = rank.data[1].tier + " " + rank.data[1].rank + " " + rank.data[1].leaguePoints + " " + "LP"
            soloQratio = rank.data[1].wins + " victoires" + " / " + rank.data[1].losses + " défaites"
        }}
        catch{}
        
        try {
        if(rank.data[2].queueType == "RANKED_SOLO_5x5") {
            soloQrank = rank.data[2].tier + " " + rank.data[2].rank + " " + rank.data[2].leaguePoints + " " + "LP"
            soloQratio = rank.data[2].wins + " victoires" + " / " + rank.data[2].losses + " défaites"
        }}
        catch{}

        try {
        if(rank.data[0].queueType == "RANKED_FLEX_SR") {
                flexRank = rank.data[0].tier + " " + rank.data[0].rank + " " + rank.data[0].leaguePoints + " " + "LP"
                flexRatio = rank.data[0].wins + " victoires" + " / " + rank.data[0].losses + " défaites"
        }}
        catch{}
        
        try {
        if(rank.data[1].queueType == "RANKED_FLEX_SR") {
                flexRank = rank.data[1].tier + " " + rank.data[1].rank + " " + rank.data[1].leaguePoints + " " + "LP"
                flexRatio = rank.data[1].wins + " victoires" + " / " + rank.data[1].losses + " défaites"
        }}
        catch{}
        
        try{
        if(rank.data[2].queueType == "RANKED_FLEX_SR") {
            flexRank = rank.data[2].tier + " " + rank.data[2].rank + " " + rank.data[2].leaguePoints + " " + "LP"
            flexRatio = rank.data[2].wins + " victoires" + " / " + rank.data[2].losses + " défaites"
        }}
        catch{}
        
        
        
        // embed envoyé sur discord
        var lpEmbed = new Discord.MessageEmbed()
        .setAuthor(profile.data.name, ('http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/'+ profile.data.profileIconId + '.png'))
        .setDescription(`Voici le profil de **${profile.data.name}** :`)
        .addField("Niveau du compte :", profile.data.summonerLevel)
        .addField(`Rang Solo / Duo: `, soloQrank) 
        .addField("Ratio Solo / Duo :", soloQratio)
        .addField(`Rang ranked Flex :`, flexRank)
        .addField("Ratio ranked flex :", flexRatio)
        .setThumbnail('http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/'+ profile.data.profileIconId + '.png')
        message.channel.send(lpEmbed)
        

    }
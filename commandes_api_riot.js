// Commande pour l'icône (à mettre dans un event message) (avoir la variable riotApiKey déclarée avec votre key d'api riot dedans (const riotApiKey = ('VOTRE KEY RIOT') ) ) (avoir le module axiom installé et déclaré (npm i axiom) (const axiom = require('axiom') ) )

if(message.content.startsWith(prefix + "icon")) {
    //récupération du pseudo
    var args = message.content.slice(prefix.length).split(/ +/);
    var name = args.slice(1)

    //requête à l'api
    const profile = await axios.get('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ name + "?api_key=" + riotApiKey);

    //embed avec l'icône
    var embed = new Discord.MessageEmbed()
    .setThumbnail('http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/'+ profile.data.profileIconId + '.png')
     message.channel.send(embed)
}


//Commande profil (à mettre dans un event message) (pareil que pour la commande icône, déclarer riotApiKey et avoir axios installé et déclaré)

if(message.content.startsWith(prefix + "profile")) {
    
    // récupération du pseudo    
    var args = message.content.slice(prefix.length).split(/ +/);
    var name = args.slice(1)
        
    // la requête à l'api
    const profile = await axios.get('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + "?api_key=" + riotApiKey);
    console.log(profile);
 
    //l'embed
    var embed = new Discord.MessageEmbed()
    .setAuthor(profile.data.name, ('http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/'+ profile.data.profileIconId + '.png'))   
    .setThumbnail('http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/'+ profile.data.profileIconId + '.png')
    .addField("Niveau d'invocateur", `${profile.data.summonerLevel}`)
    .setColor("RED")
    message.channel.send(embed)
    }
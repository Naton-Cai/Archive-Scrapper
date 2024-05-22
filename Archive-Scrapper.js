const request= require("request-promise")
const axios = require("axios");
const cheerio= require("cheerio");
const { testElement } = require("domutils");
var fs = require('fs');
const { first } = require("cheerio/lib/api/traversing");

var filename = "Monstersnew.cmx";
var filetext = '<?xml version="1.0" encoding="utf-8"?><ExportData xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><Monsters>'
fs.writeFile(filename,'', function (err) 
{
     if (err) throw err;
console.log('File is created successfully.');
});


async function scrapeData() 
{  
     const id = 1706
     const website = "https://2e.aonprd.com/Monsters.aspx?ID="+id+""
     
    try
    {
     const data = await axios.get(website);
     const html = data.data
     //console.log(html)
     var $= cheerio.load(html);
     //console.log($.html(), $.text())
     //console.log($)
     var name1 = $('h1.title > a', html).text();
     //console.log(name1)
     var filename = name1+".cmx";
     var CR = $('h1.title > span', html).first().text().replace("Creature ", "");
     var alignment = $('span.traitalignment', html).text()
     var size = $('span.traitsize', html).text()
     var type = $('span.trait > a', html).text()
     var text =  $('span#ctl00_RadDrawer1_Content_MainContent_DetailedOutput').text()
     //console.log(text)
     var perception = ""

     if((/Perception (\-|\+)\d+/).test(text))
               perception = text.match(/Perception (\-|\+)\d+/)[0]
     var Description = ""
     if((/[\w \n\-:()., -—"“”]*(?=Elite)|(?=Recall Knowledge)/).test(text))
               Description = text.match(/[\w\W \n\-:()., -—"“”]*(?=Elite)|(?=Recall Knowledge)/)[0]
     var senses = ""
     if((/[0-9a-zA-Z() ,]*(?=Languages)|(?=Skills)/).test(text))
               senses = text.match(/[0-9a-zA-Z() ,]*(?=Languages)|(?=Skills)/)+", "
     var Languages = ""
     if((/(Languages* [a-zA-Z ,]*(?=Skills))/).test(text))
               Languages = text.match(/(Languages* [a-zA-Z ,]*(?=Skills))/)[0]
     var skills = ""
     if((/(?<=Skills )[0-9a-zA-Z ,+\-()]+(?=Str)/).test(text))
               skills = text.match(/(?<=Skills )[0-9a-zA-Z ,+\-()]+(?=Str)/)[0]

     var Str = ""
     if((/(?<=Str )(\+|\-)\d+/).test(text))
               Str = text.match(/(?<=Str )(\+|\-)\d+/)[0]*2+10
     var Dex = ""
     if((/(?<=Dex )(\+|\-)\d+/).test(text))
               Dex = text.match(/(?<=Dex )(\+|\-)\d+/)[0]*2+10
     var Con = ""
     if((/(?<=Con )(\+|\-)\d+/).test(text))
               Con = text.match(/(?<=Con )(\+|\-)\d+/)[0]*2+10
     var Int = ""
     if((/(?<=Con )(\+|\-)\d+/).test(text))
               Int = text.match(/(?<=Int )(\+|\-)\d+/)[0]*2+10
     var Wis = ""
     if((/(?<=Wis )(\+|\-)\d+/).test(text))
               Wis = text.match(/(?<=Wis )(\+|\-)\d+/)[0]*2+10
     var Cha = ""
     if((/(?<=Cha )(\+|\-)\d+/).test(text))
               Cha = text.match(/(?<=Cha )(\+|\-)\d+/)[0]*2+10 
     var init = perception.match(/-?\d+/)[0]
     console.log(perception)
     console.log(init)
     
 

     var AC = ""
     if((/(?<=AC )[0-9]+/).test(text))
               AC = text.match(/(?<=AC )[0-9]+/)[0]
     var Fort = ""
     if((/(?<=Fort )[0-9+\-]+/).test(text))
               Fort = text.match(/(?<=Fort )[0-9+\-]+/)[0]
     var Ref = ""
     if((/(?<=Ref )[0-9+\-]+/).test(text))
               Ref = text.match(/(?<=Ref )[0-9+\-]+/)[0]
     var Will = ""
     if((/(?<=Will )[0-9+\-]+/).test(text))
               Will = text.match(/(?<=Will )[0-9+\-]+/)[0]
     var HP = ""
     if((/(?<=HP )[0-9+\-]+/).test(text))
               HP = text.match(/(?<=HP )[0-9+\-]+/)[0]
   
     console.log(AC, Fort, Ref, Will, HP);
     
     var Resistances = ""
     if((/(?<=Resistances )[0-9a-zA-Z ,+\-()]+/).test(text))
             Resistances = text.match(/(?<=Resistances )[0-9a-zA-Z ,+\-()]+/)[0]
     var Weaknesses = ""
     if((/(?<=Weaknesses )[0-9a-zA-Z ,+\-()]+/).test(text))
             Weaknesses = text.match(/(?<=Weaknesses )[0-9a-zA-Z ,+\-()]+/)[0]
     var Immunities = ""
     if((/(?<=Immunities )[0-9a-zA-Z ,+\-()]+(?=Skills)/).test(text))
             Immunities = text.match(/(?<=Immunities )[0-9a-zA-Z ,+\-()]+/)[0]

     console.log(Resistances, Weaknesses, Immunities);
     
     var speed = ""
     if((/(?<=Speed )[0-9]+ feet/).test(text))
          speed = text.match((/(?<=Speed )[0-9]+/))[0] + ' ft.';
        
     var flyspeed = ""
     if((/(?<=fly )[0-9]+ feet/).test(text))
               flyspeed = ', fly ' + text.match((/(?<=fly )[0-9]+/))[0] + ' ft. ' + '(average)';

     var swimspeed = ""
     if((/(?<=swim )[0-9]+ feet/).test(text))
          swimspeed = ', swim ' + text.match((/(?<=swim )[0-9]+/))[0] + ' ft.';


     const abilities = $('span.hanging-indent', html)
     filetext = filetext + '<Monster><ActiveConditions /><UsableConditions /><LoseDexBonus>false</LoseDexBonus><DexZero>false</DexZero><StrZero>false</StrZero><RulesSystemInt>0</RulesSystemInt><PreLossDex xsi:nil="true" /><PreLossStr xsi:nil="true" /><Name>' + '[2e] ' + name1 + " ID:" + id +  '</Name><CR>'+ CR + '</CR><XP>400</XP><Alignment>'+ alignment +'</Alignment><Size>'+ size +'</Size><Type>'+ type +'</Type><Init>'+ init +'</Init><DualInit xsi:nil="true" /><Senses>'+ perception + senses +'</Senses><AC>'+ AC +', touch 10, flat-footed 10</AC><AC_Mods /><HP>'+ HP +'</HP><HD>1d8</HD><Fort>'+ Fort +'</Fort><Ref>'+ Ref +'</Ref><Will>'+ Will +'</Will><Resist>'+Resistances+'</Resist><Speed>'+ speed + flyspeed + swimspeed + '</Speed><AbilitiyScores>Str '+ Str +', Dex '+ Dex +', Con '+ Con +', Int '+ Int +', Wis '+ Wis +', Cha '+ Cha +'</AbilitiyScores><BaseAtk>0</BaseAtk><CMB>+0</CMB><CMD>10</CMD><Skills>'+skills+'</Skills><Languages>'+Languages+'</Languages><Description>'+Description+'</Description><Immune>'+Immunities+'</Immune><HP_Mods /><SpellsKnown /><Weaknesses>'+Weaknesses+'</Weaknesses><TResources /><DontUseRacialHD>false</DontUseRacialHD><MR xsi:nil="true" /><StatsParsed>true</StatsParsed><Strength>'+ Str +'</Strength><Dexterity>'+ Dex +'</Dexterity><Constitution>'+ Con +'</Constitution><Intelligence>'+ Int +'</Intelligence><Wisdom>'+ Wis +'</Wisdom><Charisma>'+ Cha +'</Charisma>'
    
     if (abilities.length > 0) {
          filetext = filetext + '<SpecialAblitiesParsed>true</SpecialAblitiesParsed><SpecialAbilitiesList>'
          // Iterate through each ability
          abilities.each((index, element) => {
               console.log($(element).text())
               filetext = filetext + '<SpecialAbility><Name></Name><Type>Ex</Type><Text>'+$(element).text()+'</Text><ConstructionPoints xsi:nil="true" /></SpecialAbility>'
          });
          filetext = filetext + '</SpecialAbilitiesList>'
      } else {
          console.log('No specials');
          filetext = filetext + '<SpecialAblitiesParsed>false</SpecialAblitiesParsed><SpecialAbilitiesList />'
      }
     
     filetext = filetext + '<SkillsParsed>false</SkillsParsed><SkillValueList /><FeatsParsed>false</FeatsParsed><FeatsList /><AcParsed>true</AcParsed><FullAC>' + AC + '</FullAC><TouchAC>10</TouchAC><FlatFootedAC>'+ (AC-2) +'</FlatFootedAC><NaturalArmor>0</NaturalArmor><Deflection>0</Deflection><Shield>0</Shield><Armor>0</Armor><Dodge>0</Dodge><CMB_Numeric>0</CMB_Numeric><CMD_Numeric>10</CMD_Numeric></Monster>'

     fs.appendFile(filename, filetext + '</Monsters><Spells /><Feats /><Conditions /></ExportData>',{ flag: 'a' },function (err) {
     if (err) throw err;
     });


     }catch (err){
     console.error(err);
     }
     
     
}
scrapeData();

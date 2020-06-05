let request = require('request');
let cheerio = require('cheerio');

let url = 'https://www.worldometers.info/coronavirus';
let kenyaUrl ='https://www.worldometers.info/coronavirus/country/kenya/';
var statssGlobal={};
var statssKenya={};  

    request(url, (err, res, html) => {
        let $ = cheerio.load(html);        
        let globalitems = $('.maincounter-number > span');        
        var Gdata = [];

        for (i = 0; i < globalitems.length; i++) {
            globalitems.each(function (i, e) {
                Gdata[i] = $(this).text();
            });
        }
        statssGlobal.gcases=Gdata[0];
        statssGlobal.gdeath=Gdata[1];
        statssGlobal.grecovery=Gdata[2];

        module.exports.statssGlobal = statssGlobal;
    });

request(kenyaUrl,(err,res,html)=>{
    let $ = cheerio.load(html); 
    var Kdata = [];
    let kenyaitems = $('.maincounter-number>span');

    for(i=0;i<kenyaitems.length;i++){
        kenyaitems.each(function(i,e){
            Kdata[i]=$(this).text();
        });
    }
    statssKenya.kcases=Kdata[0];
    statssKenya.kdeath=Kdata[1];
    statssKenya.krecovery=Kdata[2];

    module.exports.statssKenya =statssKenya;
    console.log(statssKenya);
});


    


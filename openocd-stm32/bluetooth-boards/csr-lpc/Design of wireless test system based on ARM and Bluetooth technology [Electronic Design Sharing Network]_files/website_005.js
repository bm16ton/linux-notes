//¸ü¸Ä×ÖÌå´óÐ¡
var status0        = '';
var curfontsize    = 10;
var curlineheight  = 18;
function fontSize(type,objname){
  if (type=="b"){
    if(curfontsize<64){
      document.getElementById(objname).style.fontSize=(++curfontsize)+'pt';
      document.getElementById(objname).style.lineHeight=(++curlineheight)+'pt';
    }
  }
  else {
    if(curfontsize>8){
      document.getElementById(objname).style.fontSize=(--curfontsize)+'pt';
      document.getElementById(objname).style.lineHeight=(--curlineheight)+'pt';
    }
  }
}
function setColor(objname,color)
{
document.getElementById(objname).style.color=color
}
//Ôö¼Ó¼ò·±×ª»»¹¦ÄÜ£¡stardy Edit
function bodytojt(x)
{
	var bodys=document.getElementById(x);
	bodys.innerHTML=Simplized(bodys.innerHTML);
}
function bodytoft(x)
{
	var bodys=document.getElementById(x);
	bodys.innerHTML=Traditionalized(bodys.innerHTML);
}
function JTPYStr()
{
	return '°¨°ª°­°®°¯°¿°À°Â°Ã°Ä°Æ°Ð°Ñ°Ò°Ó°Ô°Õ°Ú°Ü°Þ°â°ä°ì°í°ï°ð°ó°÷°ù°ý°þ±¡±¢±¤±¥±¦±¨±«±²±´±µ±·±¸±¹±Á±Ê±Ì±Í±Î±Ï±Ð±Õ±Ö±×±Ú±Û±Ü±Ý±Þ±ß±à±á±ä±æ±ç±è±î±ï±ð±ñ±ô±õ±ö±÷±ý²¦²§²ª²¬²­²µ²·²¹²º²¾²¿²À²Á²Î²Ï²Ð²Ñ²Ò²Ó²Ô²Õ²Ö²×²Þ²à²á²â²ã²ï²ó²ô²õ²ö²÷²ø²ù²ú²û²ü²ý²þ³¡³¢³¤³¥³¦³§³¨³©³®³µ³·³¸³¹³º³»³¾³Â³Ä³Å³Æ³Í³Î³Ï³Ò³Õ³Ù³Û³Ü³Ý³ã³å³æ³ç³è³é³ê³ë³ì³ï³ñ³ò³ó³÷³ø³ù³ú³û´¡´¢´£´¤´¥´¦´§´«´¯´³´´´¸´¿´À´Á´Â´Ã´Ä´Å´Æ´Ç´È´É´Ê´Í´Ï´Ð´Ñ´Ó´Ô´Õ´Ö´×´Ø´Ù´Ú´Û´Ü´Ý´á´â´ã´è´é´ê´ë´ì´í´î´ï´ö´÷´ø´ûµ£µ¥µ¦µ§µ¨µªµ«µ¬µ­µ®µ¯µ°µ±µ²µ³µ´µµµ·µ¸µºµ»µ¼µÁµÅµÆµËµÎµÏµÐµÓµÔµÝµÞµßµàµáµâµãµåµæµçµëµìµíµîµöµ÷µøµùµúµûµüµýµþ¶¤¶¥¶§¶©¶«¶­¶®¶¯¶°¶³¶·¶¿¶À¶Á¶Â¶Ã¶Ä¶Æ¶Í¶Ï¶Ð¶Ñ¶Ò¶Ó¶Ô¶Õ¶Ö¶×¶Ø¶Ù¶Ú¶Û¶Ü¶Ý¶Þ¶ß¶á¶â¶ì¶î¶ï¶ð¶ñ¶ó¶ô¶õ¶ö¶÷¶ù¶û¶ü¶ý·¡·¢·£·§·©·ª·¯·°·³·¶···¹·Ã·Ä·É·Ï·Ð·Ñ·×·Ø·Ü·ß·à·á·ã·ä·å·æ·ç·è·é·ê·ë·ì·í·ï·ô·õ·ø¸§¸¨¸³¸´¸µ¸¹¸º¸»¸¼¸¾¸¿¸À¸Á¸Â¸Ã¸Ä¸Å¸Æ¸Ç¸È¸É¸Ï¸Ð¸Ñ¸Ò¸Ó¸Ô¸Õ¸Ö¸Ù¸Ú¸Ý¸Þ¸â¸ã¸ä¸é¸ë¸ì¸í¸ó¸ô¸õ¸ö¸ø¸û¸þ¹¡¹¢¹£¹¨¹¬¹®¹±¹³¹µ¹¹¹º¹»¹¿¹Æ¹Ë¹Ð¹Ø¹Û¹Ü¹Ý¹ß¹á¹ã¹å¹æ¹è¹é¹ê¹ë¹ì¹î¹ñ¹ò¹ó¹ô¹õ¹ö¹÷¹ø¹ù¹ú¹ü¹ý¹þº¡º§º«ºººÒºÔºÕºÖº×ºØºÙºáºäºèºìºóºøºù»¤»¦»§»©»ª»­»®»°»±»²»³»´»µ»¶»·»¸»¹»º»»»½»¾»¿»À»Á»Æ»Ç»È»É»Ñ»Ó»Ô»Õ»Ö»×»Ù»Ú»Û»Ý»Þ»ß»à»á»â»ã»ä»å»æ»ç»ë»í»ï»ñ»ô»õ»ö»÷»ú»û»ü»ý»þ¼¢¼¤¼¥¼¦¼§¼¨¼©¼«¼¬¼­¼¶¼·¼¸¼¹¼»¼½¼Á¼Â¼Ã¼Æ¼Ç¼È¼Ê¼Ì¼Í¼Ï¼Ð¼Ô¼Õ¼Ö¼Ø¼Ù¼Ú¼Û¼Ý¼Þ¼ß¼à¼á¼ã¼ä¼è¼ê¼ë¼ì¼í¼î¼ï¼ð¼ñ¼ò¼ó¼ô¼õ¼ö¼÷¼ø¼ù¼ú¼û¼ü½¢½£½¤½¥½¦½§½¬½®½¯½°½±½²½´½¶½·½¸½¹½º½½½¾½¿½Á½Â½Ã½Ä½Å½È½É½Ê½Ë½Ì½Í½Î½Ï½Ñ½Ò½Õ½×½Ø½Ú¾¥¾ª¾¬¾­¾¯¾°¾±¾²¾³¾´¾µ¾¶¾·¾¸¾¹¾º¾»¾À¾Ç¾È¾É¾Ô¾Ù¾Ý¾â¾å¾ç¾è¾é¾î¾ï¾ð½Ü½Ý½Þ½ß½à½á½ä½å½æ½ë½ì½ô½õ½ö½÷½ø½ù½ú½ý½þ¾¡¾¢¾£¾¤¾õ¾ö¾÷¾ø¾û¾ü¾þ¿¡¿¢¿£¿¤¿¥¿ª¿«¿­¿®¿°¿±¿²¿³¿µ¿¶¿·¿Ä¿Å¿Ç¿È¿Î¿Ñ¿Ò¿Ù¿â¿ã¿ä¿é¿ë¿í¿ó¿õ¿ö¿÷¿ù¿ú¿û¿ü¿ý¿þÀ¡À¢À£À¤À©ÀªÀ«À®À¯À°À³À´ÀµÀ¶À·À¸À¹ÀºÀ»À¼À½À¾À¿ÀÀÀÁÀÂÀÃÀÄÀÈÀÌÀÍÀÓÀÔÀÕÀÖÀØÀÝÀÞÀßÀàÀáÀãÀäÀåÀæÀçÀèÀéÀêÀëÀìÀíÀïÀðÀñÀòÀóÀöÀ÷ÀøÀùÀúÀüÁ¡Á£Á¤Á¥Á§Á¨Á©ÁªÁ«Á¬Á­Á®Á¯Á°Á±Á²Á³Á´ÁµÁ¶Á·Á¸Á¹Á½Á¾Á¿ÁÂÁÃÁÄÁÅÁÆÁÇÁÈÁÉÁÊÁÌÁÍÁÔÁØÁÙÁÚÁÛÁÜÁÝÁÞÁàÁâÁãÁäÁåÁèÁéÁêÁëÁìÁóÁõÁúÁûÁüÁýÁþÂ¡Â¢Â£Â¤Â¥Â¦Â§Â¨Â©ÂªÂ«Â¬Â­Â®Â¯Â°Â±Â²Â³Â¸Â»Â¼Â½Â¾Â¿ÂÀÂÁÂÂÂÃÂÄÂÅÂÆÂÇÂÊÂËÂÌÂÍÂÎÂÏÂÐÂÒÂÕÂÖÂ×ÂØÂÙÂÚÂÛÂÜÂÝÂÞÂßÂàÂáÂâÂãÂäÂåÂæÂçÂèÂêÂëÂìÂíÂîÂïÂðÂñÂòÂóÂôÂõÂöÂ÷ÂøÂùÂúÂûÃ¡Ã¨ÃªÃ­Ã³Ã´Ã¹Ã»Ã½Ã¾ÃÅÃÆÃÇÃÈÃÉÃÊÃËÃÌÃÍÃÎÃÕÃÖÃØÃÙÃàÃáÃãÃäÃåÃéÃêÃìÃíÃïÃðÃõÃöÃøÃùÃúÃýÃþÄ¡Ä¢Ä±Ä¶Ä·ÄÆÄÉÄÑÄÒÄÓÄÔÄÕÄÖÄ×ÄØÄÙÄåÄçÄèÄìÄíÄïÄðÄñÄóÄôÄõÄöÄ÷ÄøÄùÄûÄüÄýÄþÅ¡Å¢Å¥Å¦Å§Å¨Å©Å±Å²Å³Å´ÅµÅ¶Å·Å¸Å¹ÅºÅ»Å¼Å½ÅÊÅËÅÌÅÍÅÎÅÏÅÓÖÐ¹úÀ¥É½²©°®ÌìÏÂÅÕÅâÅçÅêÅôÆ­Æ®ÆµÆ¶Æ¸Æ»Æ¼Æ¾Æ¿ÆÀÆÁÆÂÆÃÆÄÆËÆÌÆÓÆ×ÆêÆëÆïÆñÆôÆõÆöÆøÆúÆýÆþÇ£Ç¤Ç¥Ç¦Ç¨Ç©Ç«Ç¬Ç­Ç®Ç¯Ç±Ç²Ç³Ç´ÇµÇ¶Ç¸Ç¹ÇºÇ»Ç¼Ç½Ç¾Ç¿ÇÀÇÁÇÂÇÅÇÇÇÈÇÊÇËÇÌÇÍÇÏÇÔÇÕÇ×ÇáÇâÇãÇäÇêÇëÇìÇíÇîÇ÷ÇøÇûÇýÇþÈ¡È¢È£È¤È§È¨È©È¬È°È±È²È³È´ÈµÈÃÈÄÈÅÈÆÈÇÈÈÈÍÈÏÈÒÈÙÈÞÈàÈìÈíÈñÈòÈóÈõÈöÈ÷ÈøÈùÈúÈûÈüÉ¡É£É¤É¥É¦É§É¨É¬É±É´ÉµÉ¶É·É¸É¹ÉÁÉÂÉÃÉÄÉÉÉÊÉËÉÍÉÒÉÓÉÔÉÕÉÜÉÝÉÞÉßÉâÉãÉåÉæÉèÉéÉðÉóÉôÉöÉøÉùÉþÊ¤Ê¥Ê¦Ê¨ÊªÊ«Ê¬Ê±Ê´ÊµÊ¶Ê»ÊÆÊÍÊÎÊÓÊÔÊÙÊÝÊÞÊßÊàÊäÊéÊêÊëÊìÊíÊîÊïÊðÊñÊòÊóÊôÊõÊ÷ÊúÊýÊþË§Ë«Ë­Ë°Ë±Ë²Ë³Ë´ËµË¶Ë¸Ë¿ËÃËÇËÊËËËÌËÏËÐËÑËÒËÓËÔËÕËßËàËáËâËäËçËèËéËêËïËðËñËòËóËôËõËöË÷ËøÌ¡Ì¢Ì£Ì§Ì©ÌªÌ¯Ì°Ì±Ì²Ì³Ì´ÌµÌ¶Ì·Ì¸ÌºÌ»Ì¼Ì½Ì¾ÌÀÌÇÌÌÌÎÌÏÌÐÌÚÌÛÌÜÌàÌâÌãÌäÌåÌæÌçÌèÌéÌêÌëÌõÌ÷ÌùÌúÌûÌüÌýÌþÍ­Í³Í·Í¼Í¿ÍÅÍÇÍÈÍÉÍÊÍËÍÎÍÏÍÑÍÒÍÔÍÕÍÖÍÝÍàÍãÍäÍåÍçÍòÍøÎ¤Î¥Î¦Î§Î¨Î©ÎªÎ«Î¬Î­Î®Î°Î±Î³Î½Î¿ÎÀÎÂÎÅÎÆÎÇÎÈÎÉÎÊÎËÎÌÎÍÎÎÎÏÎÐÎÑÎÓÎÕÎØÎÙÎÚÎÜÎÞÎßÎâÎëÎíÎñÎóÎýÎþÏ¡Ï¥Ï¬Ï­Ï®Ï°Ï±Ï³Ï·Ï¸ÏºÏ½Ï¿ÏÀÏÁÏÃÏÇÏÊÏËÏÌÏÍÏÎÏÏÏÐÏÔÏÕÏÖÏ×ÏØÏÙÏÚÏÛÏÜÏÝÏÞÏßÏáÏâÏçÏêÏìÏîÏôÏöÏúÏþÐ¥Ð¨Ð©ÐªÐ«Ð¬Ð­Ð®Ð¯Ð²Ð³Ð´ÐµÐ¶Ð·Ð¸Ð¹ÐºÐ»Ð¿ÐÆÐËÐÚÐâÐäÐåÐæÐçÐèÐéÐêÐëÐìÐíÐîÐ÷ÐøÐùÐüÑ¡Ñ¢Ñ£Ñ¤Ñ¥Ñ¦Ñ§Ñ«Ñ¯Ñ°Ñ±ÑµÑ¶Ñ·Ñ¹Ñ»Ñ¼ÑÆÑÇÑÈÑÉÑÊÑËÑÌÑÍÑÎÑÏÑÕÑÖÑÞÑáÑâÑãÑäÑåÑèÑéÑìÑîÑïÑðÑñÑôÑ÷ÑøÑùÑúÑûÑüÑþÒ¡Ò¢Ò£Ò¤Ò¥Ò¦Ò©Ò¬Ò­Ò¯Ò³Ò´ÒµÒ¶Ò¸Ò¹ÒºÒ¼Ò½Ò¾Ò¿ÒÃÒÄÒÅÒÇÒÉÒÍÒÏÒÕÒÚÒÜÒÝÒÞÒßÒáÒãÒäÒåÒèÒéÒêÒëÒìÒíÒîÒïÒñÒóÒõÒøÒûÓ£Ó¤Ó¥Ó¦Ó§Ó¨Ó©ÓªÓ«Ó¬Ó±Ó²Ó´ÓµÓ¶Ó·Ó¸Ó¹ÓºÓ»Ó¼Ó½Ó¿ÓÅÓÇÓÊÓËÓÌÓÎÓÔÓÕÓÙÓÛÓÝÓÞÓßÓâÓãÓäÓåÓæÓçÓéÓëÓìÓíÓïÓõÓøÓùÓüÓþÔ¤Ô¥Ô¦Ô§Ô¨Ô¯Ô°Ô±Ô²Ô³Ô´ÔµÔ¶Ô·Ô¸Ô¹ÔºÔ¼Ô½Ô¾Ô¿ÔÀÔÁÔÃÔÄÔÆÔÇÔÈÔÉÔËÔÌÔÍÔÎÔÏÔÒÔÓÔÖÔØÔÜÔÝÔÞÔßÔàÔáÔâÔãÔäÔåÔæÔîÔïÔðÔñÔòÔóÔôÔùÔúÔýÔþÕ¡Õ¢Õ©Õ«Õ®Õ¯Õ°Õ±ÕµÕ¶Õ·Õ¸Õ¹ÕºÕ»Õ½Õ¾Õ¿ÕÀÕÅÕÇÕÊÕËÕÍÕÔÕÝÕÞÕàÕáÕâÕåÕçÕèÕéÕêÕëÕìÕïÕðÕñÕòÕóÕôÕõÕöÕøÖ¡Ö£Ö¤Ö¯Ö°Ö²Ö³Ö´Ö½Ö¿ÖÀÖÄÖÊÖÓÖÕÖÖÖ×ÖÚÖÞÖßÖàÖáÖåÖæÖçÖèÖíÖîÖïÖòÖóÖõÖöÖüÖýÖþ×¤×§×¨×©×ª×«×¬×­×®×¯×°×±×²×³×´×¶×¸×¹×º×»Öø×Ç×È×Ê×Ò×Õ×××Ø×Ù×Ú×Û×Ü×Ý×Þ×á×ç×é×ê×ëÖÂÖÓÃ´ÎªÖ»Ð××¼Æô°åÀïö¨ÓàÁ´Ð¹';
}
function FTPYStr()
{
	return '°}Ì@µKÛ°¯ÂOÒ\ŠW°Ã°Ä°Æ°Ð°Ñ°Ò‰Î°ÔÁT”[”¡°Þ°âîCÞk½OŽÍ°ð½‰æ^Ör°ý„ƒ±¡±¢±¤ï–ŒšˆóõUÝ…Øä^ªN‚ä‘v¿‡¹P±Ì±Í±Î®…”Àé]±Ö±×±Ú±Û±Ü±Ý±Þß…¾ŽÙH×ƒ±æÞqÞpü‚±ï„e°TžlžIÙe”Pïž“ÜÀ²ªãK²­ñgÊNÑa²º²¾²¿²À²Á…¢ÐQšˆ‘M‘K NÉnÅ“‚}œæŽú‚ÈƒÔœyŒÓÔŒ”v“½Ïsð’×‹ÀpçP®bêUî²ý²þˆö‡LéLƒ”ÄcS³¨•³ânÜ‡³·³¸Ø³º³»‰mêÒr“Î·Q‘Í³ÎÕ\òG°VßtñYuýXŸë›_Ïx³çŒ™³é³ê® ÜP»I¾I³òáh™»N³ùäzërµAƒ¦´£´¤Ó|ÌŽ´§‚÷¯êJ„“åN¼ƒ´À´Á¾b´Ã´Ä´Å´ÆÞo´È´ÉÔ~ÙnÂ”Ê[‡èÄ…²œ´Ö´×´Ø´ÙÜf´Û¸Z´Ý´á´â´ã´è´é´ê´ë´ìåe´îß_´ö´÷Ž§ÙJ“ú†Îà“ÛÄ‘µªµ«‘„µ­ÕQ—µ°®”“õühÊŽ™n“vµ¸u¶\Œ§±IµÅŸôà‡µÎµÏ”³œìµÔßf¾†îµàµáµâücµå‰|ëŠµëµìÕµîážÕ{µøµùµúµûµþÕ™¯Bá”í”åVÓ†–|¶­¶®„Ó—ƒöôY Ùªš×x¶Â¶ÃÙ€åƒå‘”à¾„¶Ñƒ¶ê Œ¦¶Õ‡¶×¶ØîD¶Úâg¶Ü¶Ý¶Þ¶ßŠZ¶âùZî~Óž¶ðº¶ó¶ô¶õðI¶÷ƒº –ðD¶ýÙE°lÁPéy¬m·ªµ\âCŸ©¹ ØœïˆÔL¼ïwU·ÐÙM¼Š‰žŠ^‘¼SØS—÷·ä·åähïL¯‚·é·êñT¿pÖSøPÄw·õÝ—“áÝoÙxÑ}¸µ¸¹Ø“¸»Ó‡‹D¿`¸À¸Á¸ÂÔ“¸Ä¸Åâ}Éw¸ÈŽÖÚs¸Ð¶’¸ÒÚMŒù„‚ä“¾V¸ÝÅV¸â¸ãæ€”Rø¸ì¸íéw¸ôãt‚€½o¸û¸þ¹¡¹¢¹£ýŒmì–Ø•âhœÏ˜‹Ù‰ò¹¿ÐMî™„ŽêPÓ^¹Üð^‘TØžV¹åÒŽÎùšwý”é|Ü‰ÔŽ™™¹òÙF„£ÝL¹÷å¹ù‡ø¹üß^¹þº¡ñ”ínhéuºÔºÕºÖúQÙRºÙ™MÞZø™¼táá‰Øºù×oœû‘ô‡WÈA®‹„Ô’»±»²‘Ñ»´‰Äšg­h»¸ß€¾“Q†¾¯ˆ»¿Ÿ¨œoüS»Ç»È»ÉÖe“]Ýx»Õ»Ö»×š§»Ú»Û»Ý»ÞÙV·x•þ Z¡ÖMÕdÀLÈœ†»íâ·«@»ôØ›µœ“ô™C»û»ü·e»þð‡¼¤×Iëu¼§¿ƒ¾ƒ˜O¼¬Ý‹¼‰”DŽ×¼¹ËE¼½„©¼ÂúÓ‹Ó›¼ÈëHÀ^¼o¼ÏŠAÇvîaÙZâ›¼Ù¼Úƒrñ{¼Þšž±OˆÔ¹{égÆD¾}ÀO™z¼í‰Aû|’þ“ìº†ƒ€¼ôœpË]™‘èbÛ`ÙvÒŠæIÅž„¦ðTužR¾{½®ÊY˜ªª„Öváu½¶½·½¸½¹Äz²òœ‹É”‡ãq³CƒeÄ_ïœÀU½g½Ë½Ì½ÍÞIÝ^½Ñ½Ò·MëA½Ø¹Çoó@¾¬½›¾¯¾°îiìo¾³¾´çR½¯d¾¸¾¹¸‚œQ¼mŽý¾ÈÅfñxÅe“þä‘Ö„¡¾èùN½¾ï¾ð‚Ü½Ý½Þ½ß½Y½ä½å½æÕ]ŒÃ¾oå\ƒHÖ”ßM½ù•x a½þ±M„ÅÇG¾¤ÓX›QÔE½^âxÜŠ¾þ¿¡¿¢¿£¿¤òEé_¿«„P¿®¿°¿±¿²¿³¿µ¿¶¿·¿Äîwš¤¿ÈÕn‰¨‘©“¸ŽìÑÕF‰Kƒ~Œ’µV•ç›rÌŽh¸Q¿û¿ü¿ý¿þðÀ¢¢À¤”UÀªéŸÀ®ÏžÅDÈRíÙ‡Ë{À·™Ú”r»@ê@Ìmž‘×Ž”ˆÓ[‘ÐÀ| €žEÀÈ“Æ„ÚÀÓ³ÀÕ˜·èD‰¾ÀÞÀßîœIÀãÀäÀåÀæÀçÀè»hÀêëxÀìÀíÑYõŽ¶YÀòÀóû…–„îµ[•ÑÀüÁ¡Á£žrë`Á§Á¨‚zÂ“ÉßBç Á®‘ziºŸ”¿Ä˜æœ‘ÙŸ’¾š¼Z›öƒÉÝvÁ¿ÕÁÃÁÄÁÅ¯ŸÁÇÁÈß|ÁÊÁÌç‚«CÁØÅRà÷[ÁÜ„CÙUÁàÁâÁãýgâœRì`ÁêŽXîIðs„¢ýˆÃ@‡µ»\ÁþÂ¡‰Å”në]˜ÇŠä“§ºtÂ©ÂªÌJ±RïB] t“ïûuÌ”ô”ÙTµ“ä›ê‘Â¾óH…ÎäX‚HÂÃÂÄŒÒ¿|‘]ÂÊžV¾GŽn”Œ\ž´y’àÝ†‚öœS¾]Õ“Ì}ÂÝÁ_ß‰èŒ»jò…ÂãÂäÂåñ˜½j‹Œ¬”´aÎ›ñRÁRÂï†áÂñÙIûœÙuß~Ã}²mðzÐUMÂûÖ™Øˆå^ãTÙQ÷áüq›]Ã½æVéTž‚ƒÃÈÃÉÃÊÃËåiÃÍ‰ôÖi›ÃØÒ’¾dÃáÃãÃä¾’ÃéÃêÃìRÃïœç‘‘é}ÃøøQã‘Ö‡ÃþÄ¡Ä¢Ö\®€Ä·âc¼{ëyÄÒ“ÏÄXÀô[Ä×ÄØðHÄÄçÄè”f“ÓÄïá„øBÄóÂ™Äõýmè‡æ‡Äù™ŽªŸÄýå¸”Qôâo¼~Ä“âÞr¯‘Å²Å³Å´ÖZÅ¶šWútšªÅº‡IÅ¼aÅÊÅË±PÅÍÅÎÅÏý‹ÖÐ‡øÀ¥É½²©ÛÌìÏÂÅÕÙr‡ŠÅêùiò_ïhîlØšÆ¸ÌOÆ¼‘{Æ¿ÔuÆÁÆÂŠîH“ää˜ã×VÄšýRòTØM†™ÆõÆöšâ—‰Ó™Æþ ¿’LâTãUßwºžÖtÇ¬Ç­åXãQ“Ç²œ\×l‰qÇ¶Ç¸˜Œ†ÜÇ»Ç¼ ËNŠ“ŒÇÁæ@˜ò†ÌƒSÇÊÇËÂNÇÍ¸[¸`šJÓHÝpšäƒAÇäí•Õˆ‘c­‚¸FÚ……^Ü|òŒÇþÈ¡È¢ýxÈ¤ïE™àÈ©È¬„ñÈ±È²È³…sùo×Œðˆ”_À@ÈÇŸáígÕJ¼x˜s½qÈàÈìÜ›äJéc™ÈõÈöž¢Ë_ÈùöwÈûÙ‚ãÉ£É¤†ÊÉ¦ò}’ß­š¢¼†ÉµÉ¶É·ºY•ñéWê„ÉÃÙ ¿˜ÉÊ‚ûÙpÉÒÉÓÉÔŸý½BÉÝÙdÉßÉâ”z‘ØÉæÔOÉé¼Œ‹ðÄIBÂ•ÀK„ÙÂ}ŽŸª{ñÔŠŒÆ•rÎgŒ×Rñ‚„ÝáŒï—Ò•Ô‡‰ÛÊÝ«FÊß˜ÐÝ”•øÚHÊëÊìÊíÊîÊïÊðÊñÊòÊóŒÙÐg˜äØQ”µÊþŽ›ëpÕl¶Ë±Ë²í˜Ë´Õf´T q½zËÃï•Â–‘ZížÔAÕbËÑËÒ”\ËÔÌKÔVÃCËáËâëm½—ËèËéšqŒO“p¹SËòËóËô¿s¬Ë÷æi«H“éÌ£”EÌ©Ìª”‚Ø°cž©‰¯Ì´ÌµÌ¶×TÕ„ÌºÌ»Ì¼Ì½šUœ«ÌÇ CýÌÏ¿lòvÌÛÖ`äRî}ÌãÌäówÌæÌçÌèÌéÌêŒÏ—lÌ÷ÙNèFÌûdÂ ŸNã~½yî^ˆD‰TˆFîjÍÈÍ‘ÍÊÍËÍÎÍÏÃ“ørñWñ„™E¸DÒmÍãž³îBÈf¾Wífß`Î¦‡úÎ¨Î© ‘žH¾SÈ”Î®‚¥ƒ^¾•Ö^Î¿ÐlœØÂ„¼yÎÇ·€ÎÉ†–ÎËÎÌ®Y“ëÎœu¸CÎÓÎÕ†èæužõÕ_ŸoÊ…Ç‰]ìF„ÕÕ`åa ÞÏ¡Ï¥Ï¬Ï­ÒuÁ•Ï±ãŠ‘ò¼šÎrÝ {‚bªMBåvõrÀwûyÙtã•ÏÏéeï@ëU¬F«I¿hÏÙðWÁw‘—ÏÝÏÞ¾€Žûè‚àlÔ”í‘í—Ê’ÏöäN•Ô‡[Ð¨Ð©ÐªÏÐ¬…f’¶”yÃ{ÖCŒ‘ÐµÐ¶Ð·Ð¸Ð¹žaÖxä\á…Åd›°çnÐäÀCÐæÐçÐèÌ“‡uíšÐìÔSÐî¾wÀmÜŽ‘Òßx°_Ñ£½kÑ¥Ñ¦ŒW„ìÔƒŒ¤ñZÓ–Óßd‰ºøfø††¡†Ó ÑÉÑÊéŽŸŸÑÍû}‡Àî†éØW…’³ŽÑãÑä©ÖVòžø„—î“PÑð¯ƒê–°WðB˜ÓÑúÑûÑü¬Ž“uˆòßb¸GÖ{Ò¦ËŽÒ¬Ò­ ”í“Ò´˜IÈ~Ò¸Ò¹ÒºÒ¼átÒ¾ãžîUÒÄßzƒxÒÉ¤ÏË‡ƒ|ÒÜÒÝÒÞÒßÒáÒã‘›ÁxÔ„×hÕx×g®ÒíÒîÀ[ÊaÒóêŽãyï‹™Ñ‹ëú—‘ªÀt¬“Îž IŸÉÏ‰·fÓ²†Ñ“í‚òÓ·°bÓ¹ÓºÛxÓ¼Ôœ¥ƒž‘nà]â™ªqß[ÓÔÕTÓÙÓÛÓÝÓÞÝ›Óâô~ÓäÓåOÓçŠÊÅcŽZÓíÕZ»nÓø¶Rªz×uîAÔ¥ñSøxœYÞ@ˆ@†TˆAÔ³Ô´¾‰ßhÔ·îŠÔ¹Ôº¼sÔ½ÜSè€Ž[»›‚é†ë…ày„òëEß\ÌNáj•žíÔÒësžÄÝd”€•ºÙÚEóvÔáÔâÔãèÔå——¸^ÔïØŸ“ñ„tÉÙ\Ù›¼™„žÜˆåŽélÔpýS‚ùÕ¯Õ°šÖ±K”ØÝšäÕ¹Õº—£‘ðÕ¾Õ¿¾`ˆqŽ¤Ù~Ã›ÚwÏUÞHæNÕáß@ÕåÕçÕèÕéØ‘á˜‚ÉÔ\ÕðÕñæ‚ê‡Õô’ê± ªbŽ¬à×C¿—ÂšÖ²Ö³ˆÌ¼ˆ“´”SŽÃÙ|æR½K·NÄ[Ð\ÖÞÖaÖàÝS°™Öæ•ƒóEØiÖTÕD TÖó²š‡ÚÙAèTºBñv×§Œ£´uÞD×«Ù×­˜¶ÇfÑbŠy×²‰Ñ îåFÙ˜‰‹¾YÕÖøáÆÙY×Òn×××ØÛ™×Ú¾C¿‚¿vàu×áÔ{½Mè×ë¿@çŠüNžéëbƒ´œÊ†¢é›ÑeìZðNå€›ª';
}
function Traditionalized(cc)
{
	var str='';
	var oldstat=""+window.status;
	for(var i=0;i<cc.length;i++)
	{
		if((i%1000)==0)window.status="Working..."+Math.round(i*100/cc.length,2)+"%";
		if(JTPYStr().indexOf(cc.charAt(i))!=-1)
   			str+=FTPYStr().charAt(JTPYStr().indexOf(cc.charAt(i)));
  		else
   			str+=cc.charAt(i);
 	}
 	window.status="100% OK!";
 	setTimeout("window.status='"+oldstat+"'",1000);
	return str;
}
function Simplized(cc)
{
	var str='';
	var oldstat=""+window.status;
	for(var i=0;i<cc.length;i++)
	{
		if((i%1000)==0)window.status="Working..."+Math.round(i*100/cc.length,2)+"%";
		if(FTPYStr().indexOf(cc.charAt(i))!=-1)
   			str+=JTPYStr().charAt(FTPYStr().indexOf(cc.charAt(i)));
  		else
   			str+=cc.charAt(i);
 	}
 	window.status="100% OK!";
 	setTimeout("window.status='"+oldstat+"'",1000);
	return str;
}
function bbimg(o){
	var zoom=parseInt(o.style.zoom, 10)||100;zoom+=event.wheelDelta/12;if (zoom>0) o.style.zoom=zoom+'%';
	return false;
}
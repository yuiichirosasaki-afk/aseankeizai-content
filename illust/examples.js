// 2026-11-25 に既存記事30本へ付けたイラストの元。新しい場面を書くときの見本（記事ID → 場面）。
// 実際の記事用は illust/scenes/<slug>.js に書く（形式は README.md）。
(function(G){
const L=G.ILL||require('./lib.js'),{C,g,frame,sea,ground,hills,clouds,pylon,wire,turbine,solar,smoke,factory,gasPlant,cship,lng,train,track,crane,flng,skyline,blocks,bank,board,candles,arrow,coins,note,tag,safe,bars,pie,bell,doc,stamp,gavel,chip,rack,car,charger,parcel,phone,bess,tower,person,stall,shop,house,bulb,merge,route,barrier,magnifier,palm,thermo,sprout,brain,flag}=L;
const {floor,bolt,plane,env,warn,signal,pump,waves}=L;
const eiffel=`<g fill="#A3ADC4"><path d="M972 472 C998 400 1013 330 1021 232 L1025 168 L1030 140 L1035 168 L1039 232 C1047 330 1062 400 1088 472 L1064 472 C1054 444 1043 432 1030 432 C1017 432 1006 444 996 472 Z"/><rect x="986" y="398" width="88" height="9"/><rect x="1007" y="310" width="46" height="7"/><rect x="1018" y="232" width="24" height="6"/></g>`;
const crystals=`<circle cx="600" cy="345" r="150" fill="#B98AE0" opacity="0.18"/><circle cx="600" cy="345" r="100" fill="#B98AE0" opacity="0.18"/><path d="M520 420 C530 392 560 382 600 384 C646 382 676 394 684 420 Z" fill="#7D6A58"/><path d="M598 248 L626 286 L622 398 L598 404 Z" fill="#6A3E8E"/><path d="M598 248 L570 286 L574 398 L598 404 Z" fill="#9C6CC9"/><g transform="rotate(-14 556 404)"><path d="M552 300 L570 330 L576 402 L556 404 L540 330 Z" fill="#8A5BB8"/><path d="M552 300 L570 330 L576 402 L556 404 Z" fill="#5D3580"/></g><g transform="rotate(16 648 404)"><path d="M648 296 L666 328 L660 404 L640 404 L632 330 Z" fill="#A97ED3"/><path d="M648 296 L666 328 L660 404 L648 404 Z" fill="#6A3E8E"/></g><path d="M520 352 L532 372 L534 410 L518 410 L510 372 Z" fill="#3E8C8A" transform="rotate(-30 520 410)"/><path d="M684 356 L694 374 L692 410 L678 410 L674 374 Z" fill="#4FA3A0" transform="rotate(28 684 410)"/>`;
const mine=`<ellipse cx="200" cy="500" rx="170" ry="34" fill="#D9A86E"/><ellipse cx="200" cy="505" rx="128" ry="25" fill="#C79058"/><ellipse cx="200" cy="509" rx="88" ry="17" fill="#B27944"/><ellipse cx="200" cy="512" rx="50" ry="9" fill="#8F5D33"/>`;
const coolTowers=`<g transform="translate(300,372)"><path d="M-62 0 C-52 -30 -48 -55 -54 -86 L-14 -86 C-20 -55 -16 -30 -6 0 Z" fill="#DCD6CB"/><path d="M4 0 C14 -26 18 -48 13 -74 L47 -74 C42 -48 46 -26 56 0 Z" fill="#D2CCC0"/><g fill="#FFFFFF" opacity="0.85"><circle cx="-34" cy="-100" r="16"/><circle cx="-18" cy="-116" r="20"/><circle cx="-40" cy="-124" r="14"/><circle cx="30" cy="-88" r="13"/><circle cx="44" cy="-102" r="16"/></g><rect x="-80" y="-14" width="150" height="14" fill="#B9B2A5"/></g>`;

const S={
9454:()=>frame({label:'マレーシア｜物流',sun:[1060,140,62]},hills(430)+ground(430,C.green)+palm(60,450,1)+palm(1140,455,0.85)+
  `<path d="M400 252 H1000" stroke="${C.navy}" stroke-width="3" stroke-dasharray="8 9"/>`+[['sg',400],['my',550],['th',700],['la',850],['cn',1000]].map(([c,x])=>`<circle cx="${x}" cy="252" r="8" fill="${C.navy}"/>`+flag(c,x-33,150,1,false)).join('')+
  track(505)+train(130,505,0.88,6)),
9452:()=>frame({label:'タイ｜経済',sun:[1080,130,56]},skyline('th',190,430,0.95)+ground(430,'#C9B68A')+ground(520,'#B9A47A')+
  stall(470,540,0.95,C.red)+stall(720,545,0.85,C.teal)+person(590,545,0.9,C.gold)+person(845,548,0.85,C.blue)+person(360,548,0.85,C.navy)+
  pie(1010,280,118,0.48,C.red)+`<circle cx="1010" cy="280" r="40" fill="#F7F1E6"/>`),
9440:()=>frame({label:'マレーシア×フランス｜資源',top:'#EDF1E4',bot:'#EDF1E4'},`<path d="M640 0 L1200 0 L1200 630 L560 630 Z" fill="#E6E9F1"/>`+skyline('my',392,472,1)+eiffel+
  `<rect x="0" y="470" width="1200" height="60" fill="#C3C9D6"/><path d="M0 470 L580 470 L573 530 L0 530 Z" fill="#B9C79A"/>`+mine+palm(70,484,1)+palm(140,484,0.75)+
  factory(770,472,1,'#B98AE0')+route([[220,452],[600,10],[850,378]],'#7A4FA0')+crystals+sea(530,[[120,580,70],[300,600,60],[820,590,80],[980,570,70],[1060,610,80]])+
  g(0,0,1,`<path d="M512 562 L700 562 L684 596 L528 596 Z" fill="${C.navy}"/><path d="M552 562 C566 534 598 528 616 534 C634 528 652 540 662 562 Z" fill="#8A5BB8"/><rect x="520" y="536" width="22" height="26" fill="#F7F4EE"/><rect x="527" y="524" width="6" height="12" fill="${C.red}"/>`)),
9439:()=>frame({label:'マレーシア｜金融・市場',sun:[1100,120,48]},skyline('my',1060,530,1.05,'#C5D0C0')+floor(530)+
  person(110,530,1,C.navy)+person(170,530,1,'#5B6B85')+person(230,530,1,C.navy)+route([[270,390],[390,250],[500,360]],C.navy)+coins(400,520,4,0.8)+
  doc(560,500,0.9,-7,5)+doc(660,515,0.8,8,5)+stamp(690,440,0.9)+board(730,130,300,210,[0.55,0.35,0.18,0.3,0.8],'#3E9C6A')),
9438:()=>frame({label:'フィリピン｜労働',sun:[1050,140,58]},sea(430,[[620,520,60],[960,600,90],[700,600,70],[1100,520,50]])+`<rect x="0" y="420" width="580" height="50" fill="#C2A77E"/><rect x="0" y="470" width="580" height="14" fill="#9E8562"/>`+
  [110,180,250,320,390].map((x,i)=>person(x,422,1,C.navy,'#FFFFFF')).join('')+flag('ph',470,250,1,170)+flag('no',545,250,1,170)+cship(880,480,0.8,1)),
9437:()=>frame({label:'ベトナム｜電力・インフラ',sun:[1000,150,86]},sea(366,[[760,470,60],[900,520,80],[1040,470,70],[820,590,90],[1000,600,110],[700,420,40],[1110,420,50]])+
  turbine(760,392,0.55)+turbine(1150,388,0.5)+turbine(880,420,0.8)+turbine(1060,470,1.05)+
  `<path d="M0 372 L0 318 C60 300 110 286 170 300 C230 314 270 282 340 288 C410 294 450 318 520 330 L580 372 Z" fill="#A8B9C9"/>`+coolTowers+
  `<path d="M0 372 L560 372 C610 420 650 520 712 630 L0 630 Z" fill="#8DAE74"/><path d="M0 470 C160 450 360 452 640 520 L712 630 L0 630 Z" fill="#7C9F64"/>`+
  solar(250,520,170)+solar(440,524,150)+solar(232,566,186)+solar(440,570,170)+
  wire([58,444],[358,409],26)+wire([200,444],[434,409],24)+wire([76,401],[368,385],24)+wire([182,401],[425,385],24)+
  `<g fill="none" stroke="${C.navy}" stroke-width="2" stroke-dasharray="6 8" opacity="0.6"><path d="M358 409 Q460 422 545 392"/><path d="M434 409 Q520 422 580 392"/></g>`+
  pylon(129,615,1.15)+pylon(396,500,0.62)+
  g(562,438,0.48,`<path d="M-34 0 L-21 -105 M34 0 L21 -105 M-34 0 L24 -55 L-21 -105 M34 0 L-24 -55 L21 -105 M-27 -55 L27 -55 M-21 -105 L21 -105" fill="none" stroke="${C.navy}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`)+
  `<g transform="translate(612,438)" stroke="${C.red}" stroke-width="3.5" fill="none" stroke-linecap="round"><path d="M0 0 L0 -96 M-4 0 L-4 -96 M0 -96 L-58 -96 M0 -96 L18 -96 M0 -96 L-4 -112 L-30 -96 M-50 -96 L-50 -66"/><rect x="-56" y="-66" width="12" height="9" fill="${C.red}"/><rect x="12" y="-100" width="10" height="10" fill="${C.red}"/></g>`),
9436:()=>frame({label:'フィリピン｜金融・市場'},skyline('ph',980,540,1,'#CBD5E1')+floor(540)+
  phone(260,340,1.15,`<rect x="-42" y="-84" width="84" height="50" rx="8" fill="${C.blue}"/><rect x="-32" y="-70" width="30" height="6" rx="3" fill="#FFFFFF" opacity="0.8"/><circle cx="24" cy="-48" r="8" fill="${C.gold}"/>`+[0,1,2].map(i=>`<rect x="-42" y="${-20+i*30}" width="84" height="22" rx="5" fill="#E1E8F0"/><circle cx="-28" cy="${-9+i*30}" r="7" fill="${[C.teal,C.gold,C.red][i]}"/>`).join('')+`<rect x="-42" y="70" width="84" height="16" rx="8" fill="${C.navy}"/>`)+
  bell(530,320,0.95)+coins(500,540,5,0.9)+coins(570,540,3,0.9)+board(700,140,360,240,[0.18,0.3,0.26,0.46,0.6,0.92],'#3E9C6A')+flag('ph',1080,380,0.9,175)),
9434:()=>frame({label:'インドネシア｜金融・市場'},skyline('id',1020,530,1.1,'#CBD5E1')+floor(530)+
  board(110,130,660,340,[0.72,0.55,0.38,0.24,0.3],C.navy,{dash:[0.46,0.62,0.82],dcol:'#3E9C6A',total:8})+arrow(860,250,0.8,'up','#3E9C6A')+flag('id',1130,350,0.9,200)),
9433:()=>frame({label:'インドネシア×中国｜通商',sun:[600,120,46]},sea(460,[[80,540,60],[300,600,70],[860,560,60],[1040,600,80],[960,520,50]])+
  `<rect x="0" y="400" width="430" height="62" fill="#C2A77E"/><rect x="770" y="400" width="430" height="62" fill="#B5BDCB"/>`+skyline('id',210,400,0.8,'#A9BBA9')+
  blocks(820,400,[[0,60,150],[70,46,100],[126,70,190],[206,50,130],[266,60,170],[336,44,110]],'#A3ADC4')+crane(380,400,0.8)+crane(800,400,0.8,C.navy)+
  flag('id',300,230,1,170)+flag('cn',850,230,1,170)+route([[340,200],[600,60],[860,200]],C.navy,false)+
  doc(560,330,0.62,-8,4)+doc(620,336,0.62,6,4)+stamp(660,250,0.7)+cship(600,520,0.62,-1)),
9431:()=>frame({label:'マレーシア｜エネルギー',sun:[1040,130,60]},sea(380,[[880,470,60],[1000,560,90],[700,600,80],[200,600,60]])+
  `<path d="M0 380 L300 380 C260 420 220 470 140 520 L0 540 Z" fill="#8DAE74"/>`+palm(60,470,0.95)+palm(150,445,0.7)+skyline('my',230,385,0.32,'#9FB09F')+
  flng(360,470,1.25)+lng(880,420,0.62)),
9429:()=>{let a='',b='';for(let i=0;i<30;i++)a+=`<rect x="${100+(i%6)*40}" y="${210+Math.floor(i/6)*40}" width="32" height="32" rx="4" fill="${C.navy}"/>`;
  for(let i=0;i<50;i++)b+=`<rect x="${500+(i%10)*40}" y="${210+Math.floor(i/10)*40}" width="32" height="32" rx="4" fill="${i<30?C.navy:C.gold}"/>`;
  return frame({label:'マレーシア｜金融・市場'},skyline('my',1080,560,0.95,'#C5D0C0')+floor(560)+a+arrow(430,306,0.6,'right',C.red)+b);},
9427:()=>frame({label:'フィリピン｜エネルギー',sun:[150,160,44]},Array.from({length:20},(_,i)=>bolt(390+i*39,140,0.85,i<6)).join('')+hills(470,'#A8B9C9')+ground(470,C.green)+
  gasPlant(80,530,1.1)+solar(420,500,170)+solar(440,548,170)+pylon(700,580,0.85)+wire([580,520],[647,452],16)+wire([753,452],[860,470],16)+turbine(930,520,0.85)+turbine(1080,545,1.05)),
9425:()=>frame({label:'フィリピン｜金融・市場'},floor(540)+bank(380,540,1.2)+arrow(380,140,0.8,'up',C.red)+flag('ph',560,320,0.9,245)+thermo(820,480,1,0.86)+sprout(1030,500,1)),
9423:()=>frame({label:'タイ｜経済',sun:[1090,120,44]},skyline('th',600,430,0.8,'#D6C9B0')+ground(430,'#C9B68A')+ground(560,'#B9A47A')+
  shop(40,560,0.95,C.blue)+[210,345,480,615].map((x,i)=>stall(x,565,0.62,[C.red,C.teal,C.gold,C.red][i])).join('')+shop(700,560,0.95,C.blue)+[880,1010,1130].map((x,i)=>stall(x,565,0.62,[C.teal,C.gold,C.red][i])).join('')),
9301:()=>frame({label:'フィリピン｜金融・市場'},floor(540)+bank(270,540,1.1)+arrow(270,160,0.7,'up',C.red)+
  candles(520,140,580,330,[[0.82,0.78],[0.78,0.66],[0.66,0.7],[0.7,0.54],[0.54,0.47],[0.48,0.34],[0.35,0.28],[0.28,0.14]])+arrow(1150,330,0.55,'down',C.red)),
9299:()=>frame({label:'フィリピン｜金融・市場'},floor(540)+safe(340,540,1.3)+note(560,330,0.8,-18)+note(640,260,0.7,14,'#8FBF9A')+coins(560,540,3,0.9)+
  bars(740,540,340,[0.95,0.88,0.8,0.7,0.6],[C.navy,C.navy,C.navy,C.navy,C.red],300)+arrow(1100,190,0.7,'down',C.red)),
9297:()=>frame({label:'インドネシア｜エネルギー',top:'#E9EEF5',bot:'#F3E9D8'},hills(480,'#B8C6D3')+ground(480,C.green)+house(120,540,1.2,true)+house(270,550,1,true)+house(400,540,1.1,true)+
  pylon(560,560,0.85)+wire([507,432],[430,470],12)+bulb(270,230,1.2)+coins(800,560,12,1.25)+coins(1050,560,5,1.25)+arrow(925,330,0.5,'right',C.red)),
9295:()=>frame({label:'タイ｜製造',top:'#DDE3EA',bot:'#E7E2D8'},ground(430,'#B9B2A5')+factory(90,480,1.6,'#E9B44C')+flag('th',420,300,0.9,180)+car(640,515,1.15,C.blue)+
  `<rect y="478" width="1200" height="152" fill="url(#flood)" opacity="0.92"/>`+waves([[60,520,80],[300,560,90],[540,600,70],[820,540,90],[1000,590,80]])+
  g(880,500,0.8,'<g transform="rotate(12)">'+parcel(0,0,1)+'</g>')+g(990,515,0.6,'<g transform="rotate(-15)">'+parcel(0,0,1)+'</g>')+arrow(1050,230,0.9,'down',C.red)),
9293:()=>frame({label:'ベトナム｜企業',sun:[700,130,46]},hills(470,'#A8B9C9')+ground(470,C.green)+factory(70,530,1.3,'#BFE3C9')+bess(340,550,1)+bess(540,550,1)+
  turbine(800,525,0.95)+turbine(905,535,0.7)+flag('vn',1010,290,1,240)+flag('us',1095,290,1,240)),
9291:()=>frame({label:'タイ｜通商',sun:[1080,110,40]},floor(540)+plane(640,150,0.9)+
  phone(200,340,1.15,`<rect x="-42" y="-84" width="84" height="60" rx="6" fill="#E1E8F0"/><g fill="none" stroke="${C.navy}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M-30 -2 H-18 L-6 40 H26 L34 10 H-12"/></g><circle cx="-2" cy="52" r="6" fill="${C.navy}"/><circle cx="22" cy="52" r="6" fill="${C.navy}"/><rect x="-42" y="70" width="84" height="16" rx="8" fill="${C.red}"/>`)+
  `<rect x="380" y="500" width="460" height="22" rx="11" fill="#5B6B85"/>${[400,460,520,580,640,700,760,820].map(x=>`<circle cx="${x}" cy="511" r="7" fill="#C9D1DC"/>`).join('')}<rect x="400" y="522" width="10" height="18" fill="#5B6B85"/><rect x="810" y="522" width="10" height="18" fill="#5B6B85"/>`+
  parcel(450,470,0.7)+parcel(540,474,0.6,'#D8B27C')+parcel(620,468,0.75)+parcel(720,474,0.6,'#D8B27C')+parcel(790,470,0.68)+
  tag(940,330,0.8,-8)+arrow(1090,330,0.75,'up',C.red)),
9281:()=>frame({label:'シンガポール｜テクノロジー'},skyline('sg',1000,520,1,'#C5D0DC')+floor(520)+chip(440,280,1.25)+barrier(270,430,340)+magnifier(700,250,1.05)+flag('sg',760,360,1,160)+flag('us',840,360,1,160)),
9280:()=>frame({label:'マレーシア｜通商'},skyline('my',1080,560,0.95,'#C5D0C0')+floor(560)+doc(380,500,1.55,-3,7,[2,5])+chip(720,330,0.75)+warn(880,330,1)),
9279:()=>frame({label:'タイ｜自動車',sun:[110,150,40]},floor(530)+charger(150,530,1.1)+car(460,530,1.45,C.teal,true)+tag(860,240,0.8,-8)+arrow(1060,250,0.75,'up',C.red)+pump(1020,530,0.95)),
9277:()=>frame({label:'ベトナム｜金融・市場'},skyline('vn',1060,530,0.95,'#D3DBE5')+floor(530)+bank(210,530,0.75,'#D6CEBE')+bank(880,530,1.2)+
  route([[270,330],[540,150],[790,300]],C.red)+candles(420,300,280,190,[[0.3,0.4],[0.4,0.36],[0.36,0.55],[0.55,0.5],[0.5,0.7],[0.7,0.82]])+flag('vn',1100,300,0.9,230)),
9267:()=>frame({label:'マレーシア｜税制'},skyline('my',1060,540,0.8,'#D3DBCF')+floor(540)+doc(260,500,1.25,-4,6)+stamp(320,400,1)+env(620,400,1)+
  note(600,250,0.7,-12)+note(680,220,0.6,10,'#8FBF9A')+coins(620,540,4,0.9)+coins(700,540,6,0.9)+person(860,540,1,C.navy)+person(930,540,1,C.teal)+person(1000,540,1,C.gold)),
9265:()=>frame({label:'シンガポール｜経済',sun:[1100,110,40]},skyline('sg',880,520,1.15,'#C5D0DC')+floor(520)+bars(120,520,480,[0.36,0.44,0.5,0.6,0.84],[C.navy,C.navy,C.navy,C.navy,C.red],300)+
  `<rect x="${120+4*96+14.4}" y="${520-0.7*300}" width="67.2" height="${0.7*300}" fill="none" stroke="${C.navy}" stroke-width="3" stroke-dasharray="8 7"/>`+arrow(660,170,0.6,'up','#3E9C6A')),
9263:()=>frame({label:'マレーシア｜企業',sun:[1090,120,44]},hills(470,'#B8C6D3')+ground(470,C.green)+tower(170,480,1)+tower(340,470,0.8)+tower(480,480,0.62)+
  route([[580,330],[700,260],[820,330]],C.navy)+coins(910,530,8,1.2)+note(1060,450,0.9,-10)+note(1080,380,0.8,8,'#8FBF9A')),
9261:()=>frame({label:'シンガポール｜企業'},skyline('sg',1020,540,0.9,'#D3DBE5')+floor(540)+merge([300,200],[300,440],[640,320],C.navy)+signal(240,200,72,C.red)+signal(240,440,72,C.blue)+signal(700,320,112,'#6A3E8E')+
  [840,905,970,1035,1100].map((x,i)=>person(x,560,0.8,[C.red,C.blue,C.gold,C.teal,C.navy][i])).join('')),
9259:()=>{let rk='';for(let i=0;i<12;i++){const w=300-i*20;rk+=`<rect x="830" y="${140+i*30}" width="${w}" height="20" rx="3" fill="${i===10?C.red:'#B9C2CF'}"/>`;}
  return frame({label:'インドネシア｜金融・市場'},skyline('id',1040,560,0.6,'#D3DBE5')+floor(560)+candles(100,130,640,380,[[0.9,0.84],[0.84,0.74],[0.74,0.78],[0.78,0.6],[0.6,0.52],[0.52,0.56],[0.56,0.4],[0.4,0.32],[0.32,0.36],[0.36,0.2],[0.2,0.12]])+rk+arrow(785,300,0.55,'down',C.red));},
9257:()=>frame({label:'フィリピン｜テクノロジー',sun:[1090,120,40]},hills(520,'#B8C6D3')+ground(520,C.green)+doc(200,490,1.1,-5,5)+flag('ph',240,300,0.9,false)+
  rack(530,530,1)+rack(630,530,1)+rack(730,530,1)+brain(670,190,1.05)+palm(1040,530,1)+palm(1130,530,0.8)),
};
G.SCENES=S;if(typeof module!=='undefined')module.exports=S;
})(typeof window!=='undefined'?window:globalThis);

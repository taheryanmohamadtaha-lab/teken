'use strict';
const $=id=>$.c[id]||($.c[id]=document.getElementById(id));$.c={};
const C=$('c'),X=C.getContext('2d'),W=960,H=540,GY=470,rnd=n=>Math.random()*n|0;
let S={mode:1,c:0,st:0,d:1,snd:1,w:0,l:0,best:0};
try{Object.assign(S,JSON.parse(localStorage.ivi||'{}'))}catch(e){}
const save=()=>{try{localStorage.ivi=JSON.stringify(S)}catch(e){}};
const CH=[{n:'آرمان',sk:'#e9b98d',top:'#f6f6f6',pt:'#23232e',bt:'#d41',sh:'#d22',bd:'#d22',fx:'#4af',hair:'#111',beard:1},
{n:'آگنی',sk:'#c88a58',top:'#d3171e',pt:'#f1dcae',bt:'#d3171e',sh:'#c88a58',bd:'#d3171e',fx:'#f80',hair:'#111',beard:0},
{n:'گوریل جنگجو',sk:'#555',top:'#222',pt:'#c22',bt:'#fc3',sh:'#555',bd:'#c22',fx:'#4af',hair:'#111',beard:0,d:'قدرتمند و سنگین؛ ضربات ویرانگر'},
{n:'ببر جنگجو',sk:'#e8962e',top:'#d33',pt:'#c22',bt:'#222',sh:'#e8962e',bd:'#d33',fx:'#f90',hair:'#111',beard:0,d:'چابک و تیز؛ پنجه‌های آتشین'},
{n:'مبارز آمریکایی',sk:'#e9b98d',top:'#eee',pt:'#2a52a8',bt:'#a52',sh:'#d22',bd:'#d22',fx:'#4cf',hair:'#fc3',beard:0,d:'متعادل و سریع؛ گلوله‌ی انرژی'}];
CH.push({n:'کماندوی آمریکایی',sk:'#e9b98d',top:'#c33',pt:'#586b3a',bt:'#a52',sh:'#222',bd:'#c33',fx:'#4af',hair:'#fc3',beard:0,d:'قدرت بدنی بالا؛ موج انرژی آبی'},{n:'مبارز تایلندی',sk:'#d9955a',top:'#c11',pt:'#c11',bt:'#fc3',sh:'#c11',bd:'#c11',fx:'#f80',hair:'#111',beard:0,d:'موای‌تای؛ ضربات زانو و لگد آتشین'});
CH[0].d='سریع و تکنیکی؛ گوی انرژی آبی';CH[1].d='سنگین و پرقدرت؛ گوی آتشین';
const STG=['حیاط کاخ ایرانی','معبد هندی','میدان شبانه','استادیوم بزرگ'],DF=['آسان','متوسط','سخت'];
const AT={punch:{d:18,hit:5,r:78,dm:6,kb:5,hi:1},kick:{d:28,hit:9,r:105,dm:9,kb:9},special:{d:34,hit:14},ult:{d:60,hit:26}};
let AC;function snd(f,d,t='square',v=.07,s=0){if(!S.snd)return;try{AC=AC||new AudioContext();const o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime;o.type=t;o.frequency.setValueAtTime(f,n);o.frequency.exponentialRampToValueAtTime(Math.max(30,f+s),n+d);g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g);g.connect(AC.destination);o.start();o.stop(n+d)}catch(e){}}
const K={},TB={};addEventListener('keydown',e=>{K[e.code]=1;if(e.code.startsWith('Arrow')||e.code=='Space')e.preventDefault();if(e.code=='Escape'&&run)menu()});addEventListener('keyup',e=>K[e.code]=0);
document.querySelectorAll('#tc b').forEach(b=>{const k=b.dataset.k,u=()=>{TB[k]=0;b.classList.remove('on')};b.onpointerdown=e=>{TB[k]=1;b.classList.add('on');try{b.setPointerCapture(e.pointerId)}catch(x){}};b.onpointerup=b.onpointercancel=u});
const KM=[[['KeyA'],['KeyD'],['KeyW'],['KeyS'],['KeyJ'],['KeyK'],['KeyL']],[['ArrowLeft'],['ArrowRight'],['ArrowUp'],['ArrowDown'],['Numpad1','Digit1'],['Numpad2','Digit2'],['Numpad3','Digit3']]],KN='lrudpks';
const inp=i=>{const o={};KN.split('').forEach((n,j)=>o[n]=KM[i][j].some(c=>K[c])||(i==0&&TB[n])?1:0);return o};
const mk=(c,x,f,ai)=>({c,x,y:GY,vx:0,vy:0,f,hp:100,en:0,s:'idle',t:0,ai,pv:{},cb:0,cbt:0,blk:0,wins:0,ah:0});
let P=[mk(0,300,1),mk(1,660,-1)],proj=[],par=[],shake=0,timer=99,tf=0,rn=1,phase='intro',pc=0,msg='',mc=0,run=0,T=0;
function burst(x,y,n,c,v=7){for(let i=0;i<n;i++){const a=Math.random()*6.3,s=Math.random()*v;par.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-2,l:20+rnd(20),c})}}
function hurt(a,b,dm,kb,fall,unb){if(['fall','lose','getup'].includes(b.s))return;
 const blk=b.blk&&!unb&&b.y>=GY&&['idle','walk','crouch'].includes(b.s);a.cbt=70;
 if(blk){dm*=.15;kb*=.4;a.cb=0;snd(130,.1)}else{a.cb++;S.best=Math.max(S.best,a.cb);dm*=1+Math.min(a.cb-1,5)*.1;snd(220,.12,'sawtooth',.1,-120)}
 b.hp=Math.max(0,b.hp-dm);b.vx=a.f*kb;a.en=Math.min(100,a.en+dm*1.2);b.en=Math.min(100,b.en+dm*.6);
 if(!blk){b.s=(fall||b.hp<=0||a.cb>=4)?'fall':'hit';b.t=0;if(b.s=='fall')a.cb=0}
 burst(b.x,b.y-110,blk?5:12,blk?'#8cf':'#ff6');shake=blk?3:fall?12:7}
function atk(f,s){if(s=='special'){if(f.en>=100){s='ult';f.en=0}else if(f.en>=30)f.en-=30;else return}f.s=s;f.t=0;f.ah=0;snd(s=='kick'?300:400,.08,'triangle')}
function melee(f,o,A){if(f.ah)return;const dx=(o.x-f.x)*f.f;if(dx>-10&&dx<A.r&&Math.abs(o.y-f.y)<70&&!(A.hi&&o.s=='crouch')){f.ah=1;hurt(f,o,A.dm,A.kb,0)}}
function upd(f,o,i,act){
 f.t++;f.en=Math.min(100,f.en+.03);if(f.cbt>0&&--f.cbt==0)f.cb=0;
 if(f.y<GY||f.vy<0){f.vy+=1.1;f.y+=f.vy;if(f.y>=GY){f.y=GY;f.vy=0;if(f.s=='jump')f.s='idle'}}
 f.x+=f.vx;f.vx*=.82;f.x=Math.max(50,Math.min(W-50,f.x));const d=f.x-o.x;if(Math.abs(d)<36&&Math.abs(f.y-o.y)<60)f.x+=(d>=0?2:-2);
 const s=f.s;
 if(['idle','walk','crouch','jump'].includes(s)){const g=f.y>=GY;f.blk=0;if(g)f.f=o.x>=f.x?1:-1;
  if(act){const dir=(i.r?1:0)-(i.l?1:0);
   if(g){if(i.u){f.vy=-19;f.s='jump'}else if(i.d){f.s='crouch';f.blk=1}else{f.s=dir?'walk':'idle';f.wd=dir==f.f;f.x+=dir*(dir==f.f?4.3:3.3);if(dir==-f.f)f.blk=1}}else f.x+=dir*3.5;
   if(i.p&&!f.pv.p)atk(f,'punch');else if(i.k&&!f.pv.k)atk(f,'kick');else if(i.s&&!f.pv.s)atk(f,'special')}
  else if(g)f.s='idle'}
 else if(AT[s]){const A=AT[s];
  if(s=='punch'||s=='kick'){if(f.t>=A.hit&&f.t<A.hit+4)melee(f,o,A)}
  else if(f.t==A.hit){if(s=='special'){proj.push({x:f.x+f.f*55,y:f.y-115,vx:f.f*11,o:f,c:f.c});snd(500,.3,'sawtooth',.1,-300)}
   else{burst(f.x,f.y-80,70,CH[f.c].fx,14);snd(90,.5,'sawtooth',.14,-40);if(Math.abs(o.x-f.x)<240)hurt(f,o,32,14,1,1)}}
  if(f.t>=A.d){f.s=f.y<GY?'jump':'idle';f.t=0}}
 else if(s=='hit'&&f.t>=16)f.s='idle';
 else if(s=='fall'&&f.t>=60&&f.hp>0){f.s='getup';f.t=0}
 else if(s=='getup'&&f.t>=22)f.s='idle';
 f.pv={p:i.p,k:i.k,s:i.s}}
function aiIn(f,o){f.ar=(f.ar||0)-1;if(f.ar>0)return f.ac||{};const lv=[.5,.8,1.1][S.d];f.ar=Math.round(20/lv)+rnd(8);
 const d=Math.abs(o.x-f.x),dir=o.x>f.x?'r':'l',bk=dir=='r'?'l':'r',n={},r=Math.random(),inc=proj.some(p=>p.o!=f&&Math.abs(p.x-f.x)<260);
 if((o.s=='punch'||o.s=='kick'||inc)&&d<260&&r<.3+.25*lv){if(r<.4*lv&&!inc)n.d=1;else if(inc&&r<.3)n.u=1;else n[bk]=1;n.d=n.d||(r<.5?1:0)}
 else if(f.en>=100&&d<200&&r<.6)n.s=1;
 else if(d>270&&f.en>=30&&r<.35*lv)n.s=1;
 else if(d>95){n[dir]=1;if(r<.06*lv)n.u=1}
 else if(r<.6*lv)n[r<.3*lv?'p':'k']=1;else if(r<.8)n[bk]=1;
 f.ac=Object.assign({},n,{p:0,k:0,s:0});return n}
function blast(){}
function endRound(){phase='end';pc=130;const a=P[0].hp/100,b=P[1].hp/100,w=a>b?0:b>a?1:-1;
 msg=P[0].hp<=0||P[1].hp<=0?'K.O.!':'TIME UP';mc=130;snd(70,.6,'sawtooth',.15);
 P.forEach((f,i)=>{if(i==w){f.wins++;f.s='win'}else if(w>=0||1){f.s=w<0?'idle':'lose'}});if(w<0)msg='DRAW'}
function newRound(){P.forEach((f,i)=>{Object.assign(f,{x:i?660:300,y:GY,vx:0,vy:0,f:i?-1:1,hp:100,en:f.en*.3,s:'idle',t:0,cb:0,blk:0});});proj=[];timer=99;tf=0;phase='intro';pc=90;msg='ROUND '+rn;mc=90}
function over(){run=0;const w=P[0].wins>=2?0:1;if(S.mode==1){w?S.l++:S.w++}save();document.body.classList.remove('play');if(TR){tourEnd(w);return}
 scr(`<h1>${CH[P[w].c].n} برنده شد!</h1><h2>${w?(S.mode==1?'ببخشید، دوباره تلاش کن':'بازیکن ۲'):'بازیکن ۱'}</h2><button onclick="startMatch()">مبارزه مجدد</button><button onclick="menu()">منوی اصلی</button>`)}
function step(){if(mc>0)mc--;
 const act=phase=='fight';P[1].ai=S.mode==1;
 const ins=[act?inp(0):{},act?(P[1].ai?aiIn(P[1],P[0]):inp(1)):{}];
 P.forEach((f,i)=>upd(f,P[1-i],ins[i],act));
 for(let i=proj.length-1;i>=0;i--){const p=proj[i],t=p.o==P[0]?P[1]:P[0];p.x+=p.vx;let rm=Math.abs(p.x-480)>560;
  if(!rm&&Math.abs(p.x-t.x)<34&&!(t.s=='crouch'||t.s=='hit'&&0)){hurt(p.o,t,12,9,0);burst(p.x,p.y,18,CH[p.c].fx);rm=1}
  proj.forEach(q=>{if(q!=p&&q.o!=p.o&&Math.abs(q.x-p.x)<30){rm=1;q.x=9999;burst(p.x,p.y,25,'#fff')}});if(rm)proj.splice(i,1)}
 par=par.filter(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.3;return--p.l>0});shake*=.85;
 if(phase=='intro'&&--pc<=0){phase='fight';msg='FIGHT!';mc=45;snd(600,.2)}
 else if(phase=='fight'){if(++tf%60==0)timer--;if(P[0].hp<=0||P[1].hp<=0||timer<=0)endRound()}
 else if(phase=='end'&&--pc<=0){if(P[0].wins>=2||P[1].wins>=2)over();else{rn++;newRound()}}}
function limb(a,b,c,d,w,col){X.strokeStyle=col;X.lineWidth=w;X.lineCap='round';X.beginPath();X.moveTo(a,b);X.lineTo(c,d);X.stroke()}
function drawOld(f){const c=CH[f.c],s=f.s,t=f.t,ph=Math.sin(T*.28);
 X.fillStyle='#0005';X.beginPath();X.ellipse(f.x,GY+4,Math.max(15,40-(GY-f.y)/6),8,0,0,7);X.fill();
 X.save();X.translate(f.x,f.y);X.scale(f.f,1);if(s=='special'||s=='ult'){X.shadowColor=c.fx;X.shadowBlur=28}
 const q=s=='fall'?Math.min(1,t/8):s=='lose'?1:s=='getup'?1-Math.min(1,t/22):0;if(q){X.translate(0,-16*q);X.rotate(-1.5*q)}
 let hy=-88,ln=0,fA=[24,-128],bA=[8,-118],fL=[20,0],bL=[-22,0],bend=0;
 if(s=='walk'){fL=[20+ph*16,-Math.max(0,-ph)*10];bL=[-22-ph*16,-Math.max(0,ph)*10]}
 else if(s=='crouch'){hy=-52;fL=[36,0];bL=[-28,0];fA=[26,-98];bA=[10,-90];bend=1}
 else if(s=='jump'){hy=-92;fL=[30,-36];bL=[-6,-26];fA=[30,-140];bA=[10,-128];bend=1}
 if(f.blk&&['idle','walk','crouch'].includes(s)){fA=[28,hy-52];bA=[18,hy-40]}
 if(AT[s]){const A=AT[s],p=Math.min(1,t<A.hit?t/A.hit:1-(t-A.hit)/(A.d-A.hit));
  if(s=='punch'){fA=[22+p*58,hy-42];bA=[8,hy-34];ln=p*7}
  else if(s=='kick'){fL=[22+p*88,-76-p*34];ln=-p*7;fA=[12,hy-48];bA=[0,hy-40]}
  else if(s=='special'){hy=-70;fL=[40,0];bL=[-34,0];fA=[55,hy-36];bA=[42,hy-40];ln=6;bend=1}
  else{hy=-82;fA=[22,-178];bA=[-2,-178]}}
 else if(s=='hit'){ln=-14;fA=[6,hy-30];bA=[-8,hy-26]}
 else if(s=='win'){fA=[24,-196];bA=[-4,-190]}
 const sx=ln*.6+6,sy=hy-60,hx=ln+10,hd=hy-82;
 const leg=L=>{const k=bend?[(L[0]-2)/2+16,(hy+L[1])/2-6]:[(L[0]-2)/2,(hy+L[1])/2];limb(-2,hy,k[0],k[1],17,c.pt);limb(k[0],k[1],L[0],L[1],14,c.pt);X.fillStyle=c.sh;X.beginPath();X.ellipse(L[0]+7,L[1]-5,14,7,0,0,7);X.fill()};
 const arm=A=>{const e=[(sx+A[0])/2,(sy+A[1])/2+9];limb(sx,sy,e[0],e[1],12,f.c?c.sk:c.top);limb(e[0],e[1],A[0],A[1],10,c.sk);X.fillStyle=f.c?c.sk:'#222';X.beginPath();X.arc(A[0],A[1],8,0,7);X.fill()};
 leg(bL);arm(bA);
 X.fillStyle=c.top;X.beginPath();X.moveTo(sx-16,sy);X.lineTo(sx+16,sy);X.lineTo(15,hy);X.lineTo(-15,hy);X.fill();
 if(f.c){X.fillStyle=c.sk;X.beginPath();X.moveTo(sx+1,sy);X.lineTo(sx+11,sy);X.lineTo(sx+4,sy+28);X.fill()}
 X.fillStyle=c.bt;X.fillRect(-16,hy-9,32,10);limb(-12,hy-4,-26-ph*3,hy+22,6,c.bt);
 leg(fL);
 X.fillStyle=c.sk;X.beginPath();X.arc(hx,hd,17,0,7);X.fill();
 X.fillStyle=c.hair;X.beginPath();X.arc(hx,hd-3,18,Math.PI,0);X.fill();
 if(c.beard){X.beginPath();X.arc(hx+1,hd+2,16,.2,Math.PI-.2);X.fill()}else X.fillRect(hx+4,hd+6,13,3);
 X.fillStyle=c.bd;X.fillRect(hx-18,hd-9,36,6);limb(hx-17,hd-6,hx-38,hd+4+ph*6,5,c.bd);
 X.fillStyle='#fff';X.fillRect(hx+6,hd-4,7,4);X.fillStyle='#000';X.fillRect(hx+9,hd-4,3,4);limb(hx+4,hd-8,hx+15,hd-5,3,'#000');
 arm(fA);X.restore()}
const IMG=[0,1,2,3,4,5,6].map(i=>{const m=new Image();if(typeof ATL!='undefined')m.src=ATL[i];return m});
const BIM=(typeof BGI!='undefined'?BGI:[]).map(u=>{const m=new Image();m.src=u;return m});
const POSE=[{idle:[1,2],walk:[3,4],run:[4,5],punch:[1,6,6,2],kick:[6,7,7,6],crouch:[9],block:[13],up:[8],down:[5],akick:[7],hit:[10],fall:[10,14],getup:[13,9],sp:[11,6],ult:[8],win:[1,2]},
{idle:[1,2,3,2],walk:[2,3,6,3],run:[23,24,25,26,27],punch:[3,4,5,5,4,6],kick:[3,7,10,10,7],crouch:[12],block:[21],up:[8],down:[8],akick:[9],hit:[28],fall:[29,16],getup:[15,12],sp:[5,5],ult:[5],win:[1,2]}];
function pick(f){const R=SPR[f.c],Q=POSE[f.c],s=f.s,t=f.t,cy=(a,n)=>a[(T/n|0)%a.length],pr=(a,A)=>a[Math.min(a.length-1,t/A.d*a.length|0)],o=a=>R[a];
 if(R.idle){if(s=='special')return R.sp[0];if(s=='ult')return R.ult?R.ult[0]:R.sp[0];if(s=='punch')return pr(R.punch,AT.punch);
  if(s=='kick')return f.y<GY?R.akick[0]:pr(R.kick,AT.kick);if(s=='hit')return R.hit[0];
  if(s=='fall')return t<12?R.fall[0]:R.fall[1];if(s=='lose')return R.fall[1];if(s=='getup')return t<11?R.getup[0]:R.getup[1];
  if(s=='jump')return f.vy<2?R.up[0]:R.down[0];if(s=='crouch')return R.crouch[0];if(f.blk&&f.y>=GY)return R.block[0];
  if(s=='win')return cy(R.idle,12);if(s=='walk')return f.wd?cy(R.run,4):cy(R.walk,6);return cy(R.idle,10)}
 if(s=='special')return o(Q.sp[t<22?0:1]);if(s=='ult')return o(Q.ult[0]);
 if(s=='punch')return o(pr(Q.punch,AT.punch));
 if(s=='kick'){if(f.y<GY)return o(Q.akick[0]);return o(pr(Q.kick,AT.kick))}
 if(s=='hit')return o(Q.hit[0]);
 if(s=='fall')return o(t<12?Q.fall[0]:Q.fall[1]);
 if(s=='lose')return o(Q.fall[1]);
 if(s=='getup')return o(t<11?Q.getup[0]:Q.getup[1]);
 if(s=='jump')return o(f.vy<2?Q.up[0]:Q.down[0]);
 if(s=='crouch')return o(Q.crouch[0]);if(f.blk&&f.y>=GY)return o(Q.block[0]);
 if(s=='win')return o(cy(Q.win,12));
 if(s=='walk')return o(f.wd?cy(Q.run,4):cy(Q.walk,6));
 return o(cy(Q.idle,10))}
const KS=[.9,.95,1,1,1,1,1];
function draw(f){const m=IMG[f.c];if(typeof SPR=='undefined'||!m.complete||!m.naturalWidth)return drawOld(f);
 const fr=pick(f),k=KS[f.c]||1,s=f.s,wk=s=='walk'?Math.abs(Math.sin(T*.25))*5:0,br=1+Math.sin(T*.12)*.012*(s=='idle');
 X.fillStyle='#0006';X.beginPath();X.ellipse(f.x,GY+6,Math.max(20,58-(GY-f.y)/5),10,0,0,7);X.fill();
 X.save();X.translate(f.x,f.y-wk);X.scale(f.f,1);if(s=='special'||s=='ult'){X.shadowColor=CH[f.c].fx;X.shadowBlur=36}
 if(s=='hit'){X.filter='brightness(1.5)'}
 X.scale(1,br);if(fr[6])X.scale(-1,1);X.imageSmoothingQuality='high';X.drawImage(m,fr[0],fr[1],fr[2],fr[3],-fr[4]*k,-fr[3]*k,fr[2]*k,fr[3]*k);X.restore()}
function bgImg(){const i=S.st,im=BIM[i];if(!im||!im.complete||!im.naturalWidth)return 0;
 const m=(P[0].x+P[1].x)/2-W/2,sc=Math.max((W+90)/im.width,(GY+8)/im.height),dw=im.width*sc,dh=im.height*sc,dx=-(dw-W)/2-m*.06,dy=GY-dh+8;
 X.fillStyle='#223';X.fillRect(-20,-20,W+40,H+40);X.drawImage(im,dx,dy,dw,dh);
 if(i==2){X.fillStyle='rgba(8,10,60,.62)';X.fillRect(-20,-20,W+40,GY+10);X.fillStyle='#fff';for(let j=0;j<40;j++)X.fillRect((j*97)%W,(j*53)%160,2,2);X.fillStyle='#fffbe0';X.beginPath();X.arc(790,80,32,0,7);X.fill();X.fillStyle='#0ff';X.shadowColor='#0ff';X.shadowBlur=14;X.fillRect(130,GY-40,6,30);X.fillStyle='#f0f';X.shadowColor='#f0f';X.fillRect(820,GY-46,6,36);X.shadowBlur=0}
 const gc=[['#c9b48a','#a8946a'],['#c4a77c','#8f7650'],['#3a3a52','#22222f'],['#d0b078','#a08850']][i],gg=X.createLinearGradient(0,GY-10,0,H);gg.addColorStop(0,gc[0]);gg.addColorStop(1,gc[1]);X.fillStyle=gg;X.fillRect(-20,GY-8,W+40,H-GY+28);
 X.fillStyle='#0003';X.fillRect(-20,GY-8,W+40,3);for(let j=-2;j<14;j++){X.beginPath();X.moveTo(j*90-m*.4%90,GY-5);X.lineTo((j*90-480)*1.5+480-m*.4%90,H);X.strokeStyle='#0002';X.lineWidth=2;X.stroke()}
 for(let j=1;j<5;j++){X.fillStyle='#0002';X.fillRect(-20,GY-8+j*j*5,W+40,2)}
 X.fillStyle='#0000';return 1}
function bg(){if(!bgImg())bgOld()}
function bgOld(){const m=(P[0].x+P[1].x)/2-W/2,st=S.st,th=[['#5fb8ee','#d6eefa','#6b86a8','#c9b48a'],['#f08a3c','#ffe0a8','#8d5a7a','#b98b5e'],['#070720','#40307a','#1b1b45','#2a2a3a'],['#3f9ee0','#bfe4f7','#7a8794','#d0b078']][st];
 const g=X.createLinearGradient(0,0,0,GY);g.addColorStop(0,th[0]);g.addColorStop(1,th[1]);X.fillStyle=g;X.fillRect(-20,-20,W+40,H+40);
 if(st==2){X.fillStyle='#fff';for(let i=0;i<40;i++)X.fillRect((i*97)%W,(i*53)%250,2,2);X.fillStyle='#fffbe0';X.beginPath();X.arc(760,90,38,0,7);X.fill()}
 X.fillStyle=th[2];X.beginPath();X.moveTo(-200,GY);for(let i=-2;i<9;i++)X.lineTo(i*140-m*.04,GY-130-((i*37)&63)*2),X.lineTo(i*140+70-m*.04,GY-40);X.lineTo(W+200,GY);X.fill();
 for(let i=-1;i<4;i++){const x=i*320+160-m*.1;
  if(st==0){X.fillStyle='#e8d9b0';X.fillRect(x-110,GY-190,220,190);X.fillStyle='#2a7fd4';X.beginPath();X.arc(x,GY-190,70,Math.PI,0);X.fill();X.fillRect(x-130,GY-250,14,250);X.fillRect(x+116,GY-250,14,250);X.fillStyle='#1c4f95';X.beginPath();X.arc(x,GY-70,40,Math.PI,0);X.fillRect(x-40,GY-70,80,70);X.fill()}
  else if(st==1){for(let j=0;j<5;j++){X.fillStyle=j%2?'#c4442a':'#e8a24a';X.fillRect(x-110+j*18,GY-40*(j+1),220-j*36,40)}X.fillStyle='#fc2';X.fillRect(x-4,GY-230,8,30)}
  else if(st==2){X.fillStyle='#14143a';X.fillRect(x-80,GY-170,160,170);X.fillRect(x-100,GY-190,200,22);['#f0f','#0ff','#fc0'].forEach((c,j)=>{X.fillStyle=c;X.shadowColor=c;X.shadowBlur=16;X.fillRect(x-60+j*50,GY-130,16,40)});X.shadowBlur=0}
  else{X.fillStyle='#8892a0';X.beginPath();X.arc(x,GY+40,200,Math.PI,0);X.fill();for(let j=0;j<40;j++){X.fillStyle=['#e33','#fc3','#3a7','#fff','#38f'][j%5];X.fillRect(x-170+(j*37)%340,GY-160+((j*53)%120),6,6)}}}
 X.fillStyle=th[3];X.fillRect(-20,GY,W+40,H-GY);X.fillStyle='#0003';for(let i=-1;i<14;i++)X.fillRect(i*80-m*.35%80,GY+30,3,H);X.fillRect(0,GY+30,W,3);
 for(let i=-1;i<5;i++){const x=i*260+130-m*.35;X.fillStyle=st==2?'#222':'#0003';X.fillRect(x-8,GY-60,16,64);if(st==2){X.fillStyle='#ff8';X.beginPath();X.arc(x,GY-66,9,0,7);X.fill()}}}
function hud(){for(let i=0;i<2;i++){const f=P[i],w=330,x=i?W-72-w:72,hw=w*f.hp/100,ew=w*.7*f.en/100;
 X.fillStyle='#000a';X.fillRect(x-3,17,w+6,26);{let fa=typeof SPR!='undefined'&&SPR[f.c].face;if(fa&&Array.isArray(fa[0]))fa=fa[0];const px=i?W-66:10;X.fillStyle=f.c?'#c33':'#27c';X.fillRect(px-3,12,62,62);if(fa&&IMG[f.c].naturalWidth)X.drawImage(IMG[f.c],fa[0],fa[1],fa[2],fa[3],px,15,56,56);X.strokeStyle='#fc2';X.lineWidth=2;X.strokeRect(px-3,12,62,62)}X.fillStyle=f.hp>30?'#3ddc2a':'#e33';X.fillRect(i?x+w-hw:x,20,hw,20);
 X.fillStyle='#000a';X.fillRect(i?x+w-w*.7:x,46,w*.7,10);X.fillStyle=f.en>=100?'#fd3':'#2aa8ff';X.fillRect(i?x+w-ew:x,47,ew,8);
 X.fillStyle='#fff';X.font='bold 16px Tahoma';X.textAlign=i?'right':'left';X.fillText(CH[f.c].n+(S.mode==1&&i?' (AI)':''),i?x+w:x,76);
 for(let k=0;k<2;k++){X.fillStyle=k<f.wins?'#fc2':'#555';X.beginPath();X.arc(i?x+w-k*22-8:x+k*22+8,90,7,0,7);X.fill()}
 if(f.cb>1){X.fillStyle='#fc2';X.font='italic 900 28px Impact';X.fillText('COMBO x'+f.cb,i?x+w:x,128)}}
 X.textAlign='center';X.fillStyle='#fd3';X.font='900 46px Impact';X.fillText(Math.max(0,timer),W/2,52);
 if(mc>0){X.font='italic 900 90px Impact';X.fillStyle='#fc2';X.strokeStyle='#a00';X.lineWidth=8;X.strokeText(msg,W/2,250);X.fillText(msg,W/2,250)}}
function render(){X.save();X.clearRect(0,0,W,H);if(shake>.5)X.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);bg();
 P.forEach(draw);proj.forEach(p=>{const c=CH[p.c].fx,g=X.createRadialGradient(p.x,p.y,2,p.x,p.y,34);g.addColorStop(0,'#fff');g.addColorStop(.4,c);g.addColorStop(1,'#0000');X.fillStyle=g;X.fillRect(p.x-60,p.y-40,120,80);X.fillStyle=c;X.globalAlpha=.4;X.fillRect(p.x-p.vx*5-(p.vx>0?0:-1),p.y-9,p.vx*5,18);X.globalAlpha=1});
 par.forEach(p=>{X.globalAlpha=Math.min(1,p.l/20);X.fillStyle=p.c;X.beginPath();X.arc(p.x,p.y,3,0,7);X.fill()});X.globalAlpha=1;X.restore();if(run)hud()}
let last=0,acc=0;function loop(t){requestAnimationFrame(loop);acc+=Math.min(100,t-last);last=t;while(acc>=16.67){acc-=16.67;T++;if(run)step()}render()}
const OC=o=>o!=null?o:(S.o!=null&&S.o<CH.length?S.o:(S.c+1)%CH.length);
function startMatch(o){P=[mk(S.c,300,1),mk(OC(o),660,-1)];S.mode==1&&(P[1].ai=1);rn=1;par=[];newRound();run=1;scr('');document.body.classList.add('play');save()}
function stop(){run=0;document.body.classList.remove('play')}
const ui=$('ui');function scr(h){ui.innerHTML=h;ui.style.display=h?'flex':'none'}
const b=(t,f)=>`<button onclick="${f}">${t}</button>`;
const hero=()=>typeof BIG=='undefined'?'':`<img class=hero style=left:1% src=${BIG[0]}><img class=hero style="right:1%;transform:scaleX(-1)" src=${BIG[1]}>`;
function quit(){try{const A=window.Capacitor&&Capacitor.Plugins&&Capacitor.Plugins.App;if(A&&A.exitApp){A.exitApp();return}}catch(e){}
 try{window.close()}catch(e){}
 scr('<h1>بازی بسته شد</h1><h2>می‌توانی این صفحه را ببندی</h2>'+b('بازگشت به منو','menu()'))}
const cred=()=>`<div class=cr>${typeof CRIMG!='undefined'?`<img src="${CRIMG}">`:''}<span>سازنده: محمد طاها طاهریان</span></div>`;
function menu(){stop();P=[mk(S.c,300,1),mk(OC(),660,-1)];scr(hero()+`<h1>IRAN VS INDIA</h1><h2>LEGENDS OF FIGHT</h2><div class=menu>`+b('شروع بازی','S.mode=1;startMatch()')+b('🏆 تورنمنت','S.mode=1;selc(2)')+b('مبارزه با هوش مصنوعی','S.mode=1;selc(1)')+b('مبارزه دونفره','S.mode=2;selc(1)')+b('انتخاب شخصیت','selc(0)')+b('انتخاب مرحله','selst(0)')+b('تنظیمات','sets()')+b('راهنمای بازی','help()')+b('خروج از بازی','quit()')+`</div><small>برد: ${S.w} | باخت: ${S.l} | بیشترین کمبو: ${S.best}</small>`+cred())}
function selc(f,o){const t=o?'حریف را انتخاب کن':f==2?'برای تورنمنت مبارز خود را انتخاب کن':'شخصیت خود را انتخاب کن';
 scr(`<h2>${t}</h2><div class=row>`+CH.map((c,i)=>`<div class="card ${i%2?'h':'i'}"><canvas class=cimg id=cv${i} width=150 height=200></canvas><h3>${c.n}</h3><small>${c.d}</small>${b('انتخاب',o?`po(${i},${f})`:`pc2(${i},${f})`)}</div>`).join('')+'</div>'+b('بازگشت','menu()'));
 CH.forEach((c,i)=>{const cv=document.getElementById('cv'+i),x=cv.getContext('2d'),m=IMG[i];const go=()=>{const R=SPR[i],fr=R.idle?R.idle[0]:R[POSE[i].idle[0]],k=Math.min(180/fr[3],140/fr[2]);x.clearRect(0,0,150,200);x.drawImage(m,fr[0],fr[1],fr[2],fr[3],75-fr[4]*k,192-fr[3]*k,fr[2]*k,fr[3]*k)};m.complete&&m.naturalWidth?go():m.addEventListener('load',go)})}
function pc2(i,f){S.c=i;save();f==2?tstart():f?selc(1,1):menu()}
function po(i,f){S.o=i;save();selst(1)}
let TR=null;
function tstart(){const sl=[{c:S.c,p:1}];for(let i=0;i<7;i++)sl.push({c:rnd(CH.length),p:0});
 for(let i=7;i>0;i--){const j=rnd(i+1);[sl[i],sl[j]]=[sl[j],sl[i]]}TR={r:0,R:[sl]};tshow()}
const pidx=()=>TR.R[TR.r].findIndex(s=>s.p);
function tshow(msg){const nm=['ربع نهایی','نیمه‌نهایی','فینال'],col=TR.R.map((rd,k)=>`<div class=tc><b>${['۸ نفر','۴ نفر','فینالیست‌ها','قهرمان'][k]}</b>`+rd.map(s=>`<div class="${s.p?'me':''}">${CH[s.c].n}${s.p?' ⭐':''}</div>`).join('')+'</div>').join(''),opp=TR.R[TR.r][pidx()^1];
 scr(`<h2>🏆 ${msg||nm[TR.r]}</h2><div class=row>${col}</div><p>حریف بعدی: <b>${CH[opp.c].n}</b></p>`+b('شروع مبارزه','tmatch()')+b('خروج از تورنمنت','TR=null;menu()'))}
function tmatch(){S.st=rnd(4);S.mode=1;startMatch(TR.R[TR.r][pidx()^1].c)}
function tourEnd(w){if(w){TR=null;scr(`<h1>حذف شدی!</h1><h2>این بار شانس با تو یار نبود</h2>`+b('تورنمنت جدید','selc(2)')+b('منوی اصلی','menu()'));return}
 const cur=TR.R[TR.r],nx=[];for(let k=0;k<cur.length;k+=2){const a=cur[k],c=cur[k+1];nx.push(a.p?a:c.p?c:Math.random()<.5?a:c)}
 TR.R.push(nx);TR.r++;if(nx.length==1){TR=null;scr(`<h1>🏆 قهرمان تورنمنت!</h1><h2>${CH[S.c].n} همه را شکست داد</h2>`+b('تورنمنت جدید','selc(2)')+b('منوی اصلی','menu()'));return}
 tshow('پیروز شدی! مرحله بعد')}
function selst(f){scr(`<h2>مرحله</h2>`+STG.map((n,i)=>b((S.st==i?'✔ ':'')+n,`S.st=${i};save();${f?'startMatch()':'menu()'}`)).join('')+b('بازگشت','menu()'))}
function sets(){scr(`<h2>تنظیمات</h2>`+b('صدا: '+(S.snd?'روشن':'خاموش'),'S.snd^=1;save();sets()')+b('سطح هوش مصنوعی: '+DF[S.d],'S.d=(S.d+1)%3;save();sets()')+b('پاک کردن رکوردها','S.w=S.l=S.best=0;save();sets()')+b('بازگشت','menu()'))}
function help(){scr(`<h2>راهنما</h2><div dir=rtl style="max-width:560px;font-size:14px;line-height:1.9">بازیکن ۱: A/D حرکت، W پرش، S نشستن و دفاع، J مشت، K لگد، L قدرت ویژه<br>بازیکن ۲: جهت‌ها، NumPad 1 مشت، 2 لگد، 3 قدرت ویژه<br>موبایل: دکمه‌های لمسی پایین صفحه (چند لمسی)<br>نگه‌داشتن جهت عقب = دفاع؛ نشستن از مشت جاخالی می‌دهد و گوی انرژی را رد می‌کند.<br>قدرت ویژه ۳۰ انرژی می‌خواهد؛ با انرژی ۱۰۰ قدرت نهایی اجرا می‌شود.<br>برنده کسی است که دو راند ببرد.</div>`+b('بازگشت','menu()'))}
menu();requestAnimationFrame(loop);if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});

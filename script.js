const screens={intro:document.querySelector("#intro"),birthday:document.querySelector("#birthday"),message:document.querySelector("#message"),final:document.querySelector("#final")};
const introText=document.querySelector("#introText");
const startBtn=document.querySelector("#startBtn");
const messageBtn=document.querySelector("#messageBtn");
const nextBtn=document.querySelector("#nextBtn");
const quote=document.querySelector("#quote");
const progress=document.querySelector("#progress");
const replayBtn=document.querySelector("#replayBtn");

const introLines=[
"Hei Anna...",
"Tein sinulle jotain.",
"Tämän tekemiseen meni melko kauan...",
"Halusin tehdä tästä jotain erityistä.",
"Joten...",
"Tänään on sinun syntymäpäiväsi ❤️"
];

const quotes=[
"Sinä kysyit itseltäsi, miksi kaikki meni pieleen,",
"mutta ehkä mikään ei oikeasti ollut menossa pieleen.",
"Ehkä se oli suojelua, jota et vain vielä nähnyt.",
"Kaikki, mikä tuntuu menetykseltä, ei oikeasti ole menetys.",
"Joskus se, mikä sattuu eniten, suojelee sinua hiljaa joltain vielä pahemmalta.",
"Toivon, että tämä päivä saa sinut hymyilemään.",
"Kiitos, että olet osa elämääni."
];

let lineIndex=0;
let quoteIndex=0;

function show(name){
  Object.values(screens).forEach(s=>s.classList.remove("active"));
  screens[name].classList.add("active");
}

function typeLine(text){
  introText.textContent="";
  let i=0;
  const timer=setInterval(()=>{
    introText.textContent=text.slice(0,++i);
    if(i>=text.length){
      clearInterval(timer);
      setTimeout(()=>{
        if(lineIndex<introLines.length-1){lineIndex++;typeLine(introLines[lineIndex]);}
        else{startBtn.classList.remove("hidden");}
      },850);
    }
  },55);
}

function openBirthday(){
  show("birthday");
}

function openMessage(){
  quoteIndex=0;
  renderQuote();
  show("message");
}

function renderQuote(){
  quote.textContent=quotes[quoteIndex];
  progress.style.width=((quoteIndex+1)/quotes.length*100)+"%";
  nextBtn.textContent=quoteIndex===quotes.length-1?"Lopeta ✨":"Seuraava →";
}

function nextQuote(){
  if(quoteIndex<quotes.length-1){quoteIndex++;renderQuote();}
  else{show("final");confetti();}
}

function confetti(){
  for(let i=0;i<80;i++){
    const el=document.createElement("i");
    el.className="confetti";
    el.style.left=Math.random()*100+"vw";
    el.style.animationDelay=Math.random()*1.5+"s";
    el.style.transform="rotate("+Math.random()*360+"deg)";
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),4200);
  }
}

startBtn.addEventListener("click",openBirthday);
messageBtn.addEventListener("click",openMessage);
nextBtn.addEventListener("click",nextQuote);
replayBtn.addEventListener("click",()=>{lineIndex=0;startBtn.classList.add("hidden");show("intro");typeLine(introLines[0]);});

const style=document.createElement("style");
style.textContent=".confetti{position:fixed;top:-15px;width:8px;height:14px;background:#eee8ff;z-index:20;animation:fall 4s linear forwards;border-radius:2px}@keyframes fall{to{top:110vh;transform:translateY(110vh) rotate(720deg)}}";
document.head.appendChild(style);

typeLine(introLines[0]);
'use strict'
import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";

const canvaChico = document.getElementById("chico")
const switchMode = document.getElementById("botonSwitch")
const canvas = document.getElementById("canvas");
const inputMode = document.getElementById("toggle")
const canvasMotion = document.getElementById("canvasMotion");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const animation = new DotLottie({
  canvas:canvas,
  src: "https://lottie.host/dacc9ab7-cf86-4a3a-824e-e180e44d3d0e/pWza53mfJW.lottie",
  autoplay: true,
  loop: true,
});
let scrollTimeout;

document.addEventListener("scroll", () => {
  animation.pause();
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => animation.play(), 150);
}, { passive: true });

const posterMarkers = [];
let currentPosterIndex = 0;

const motionAnim = new DotLottie({
  canvas: canvasMotion,
  src: "https://lottie.host/628c979a-6eb9-4893-99f0-0790fd583a92/QOXwkfykrz.lottie",
  autoplay: false,
  loop: false,
});

function showPoster(index, play = true) {
  if (posterMarkers.length === 0) return;

  currentPosterIndex = (index + posterMarkers.length) % posterMarkers.length;
  const poster = posterMarkers[currentPosterIndex];

  motionAnim.setMarker(poster.name);
  motionAnim.setFrame(poster.start);
  if (play) {
    motionAnim.play()
    };
}

motionAnim.addEventListener("load", () => {
  posterMarkers.push(...motionAnim.markers().sort((a, b) => a.start - b.start));

  if (posterMarkers.length === 0) {
    console.error("La animación motionAnim no contiene marcadores de póster.");
    return;
  }
  btnPrev.disabled = false;
  btnNext.disabled = false;
  console.log("esta reproduciendose")
  console.log(motionAnim.isPlaying)
  console.log("------- esta cargado")
  console.log(motionAnim.isLoaded)
  console.log("-------actual frame")
  console.log(motionAnim.currentFrame)
  console.log("------total de frames")
  console.log("-------------duracion")
  console.log(motionAnim.duration)
  console.log(motionAnim.mode)
  console.log(motionAnim.mode)
  showPoster(0, false);
});

motionAnim.addEventListener("loadError", ({ error }) => {
  console.error("No se pudo cargar la animación motionAnim:", error);
});

btnPrev.addEventListener("click", () => showPoster(currentPosterIndex - 1));
btnNext.addEventListener("click", () => showPoster(currentPosterIndex + 1));

motionAnim.addEventListener("load",()=>{
  console.log("ya cargo")
})

motionAnim.addEventListener("play",()=>{
  console.log("ya esta reproduciendose")
})
motionAnim.addEventListener("pause",()=>{
  console.log("la animacion esta pausada")
})
// motionAnim.addEventListener("frame",()=>{
//   console.log("un frame acaba de ser disparado")
// })

const zombieAnimation = new DotLottie({
  canvas:canvaChico,
  src:"./assets/chico-zombie-v3-themes.lottie",
  autoplay:false
})
const saveTheme = (modo,isLight) =>{
  localStorage.setItem('tema',modo)
     document.body.classList.toggle('light',isLight)
     if(isLight){
       zombieAnimation.setTheme(modo)
     }else{
      zombieAnimation.resetTheme()
     }
}
let existeModo = localStorage.getItem("tema") !== null
if(existeModo === false){
  localStorage.setItem('tema','dark')
}
zombieAnimation.addEventListener("load",()=>{
  const cargo = zombieAnimation.stateMachineLoad("StateMachine1")
  if(cargo){
    zombieAnimation.stateMachineStart()
    console.log("se inicio la maquina")
    let temaDark = localStorage.getItem('tema') == 'dark' ? true:false; 
console.log(temaDark)
if (temaDark) {
  saveTheme('dark',false)
}else{
  inputMode.removeAttribute("checked")
  saveTheme('light',true)
}

  }else{
    console.log("no se inicio la maquina")
  }
})

zombieAnimation.addEventListener("loadError",(e)=>{
  console.log("hubo un error")
})

switchMode.addEventListener("click",(e)=>{
   e.stopPropagation()
   if (localStorage.getItem('tema') == 'dark'){
    saveTheme('light',true)
   }else{
     if(localStorage.getItem('tema') == 'light'){
      saveTheme('dark',false)
   }
   }
   console.log("click recibido")
})
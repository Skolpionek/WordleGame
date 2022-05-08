import { WORDS } from './words.js'

const keys = document.querySelectorAll("[data-key]")
const cells = document.querySelectorAll("[data-cell]")
const enter = document.getElementById("enter")
const bck = document.getElementById("bck")
let password = randomPasword()
let word = [
   ["","","","",""],
   ["","","","",""],
   ["","","","",""],
   ["","","","",""],
   ["","","","",""],
   ["","","","",""]
]
let wordIndex = 0
let wordNumber = 0

function randomPasword(){
   return WORDS[getRandomIntInclusive(0, WORDS.length)]
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// console.log(password)

keys.forEach(key=>{
   key.addEventListener('click',HandleKeyPress)
})
enter.addEventListener('click',()=>{
      if(wordIndex == 5){
         wordCheck(word[wordNumber], wordNumber)
         wordNumber++
         wordIndex = 0
      }
      if(wordNumber == 6){
         LostAlert()
      } 
      // console.log(wordNumber) 
})
bck.addEventListener('click',()=>{
   if(wordIndex != 0){
      wordIndex--
      word[wordNumber][wordIndex] = ""
      document.getElementById("index"+wordNumber+wordIndex).innerText = ""
      
   }
})

function HandleKeyPress(e){
   const key = e.target
   if(wordIndex != 5 && key.innerText != "ENTER" && key.innerText != "BCK"){
      word[wordNumber][wordIndex] = key.innerText
      document.getElementById("index"+wordNumber+wordIndex).innerText = word[wordNumber][wordIndex]
      wordIndex++
   }
   
   
   
   
}

function wordCheck(wordNumber, numer){
   let points = 0
   for(let i=0;i<5;i++){
      document.getElementById("index"+numer+i).classList.add("incorrect")
   }
   for(let i=0;i<5;i++){
      if(password.split("").includes(wordNumber[i])){
         document.getElementById("index"+numer+i).classList.add("almost")
         document.getElementById("index"+numer+i).classList.remove("incorrect")
      }
   }
   for(let i=0;i<5;i++){
      if(password.split("")[i] == wordNumber[i]){
               document.getElementById("index"+numer+i).classList.add("correct")
               document.getElementById("index"+numer+i).classList.remove("incorrect")
               document.getElementById("index"+numer+i).classList.remove("almost")
               points++
      }
   }
   if(points == 5)WinAllert()
   
}
function WinAllert(){
   // console.log("wygrana")
   document.getElementById("message").innerText = "YOU WON!"
   document.getElementById("password").innerText = 'password was "'+password+'"'
   document.getElementById("alert").classList.remove("disabled")

}
function LostAlert(){
   document.getElementById("message").innerText = "YOU LOST!"
   document.getElementById("password").innerText = 'password was "'+password+'"'
   document.getElementById("alert").classList.remove("disabled")
   // console.log("przegrana")
}

document.getElementById("restart").addEventListener("click",()=>{
   document.getElementById("alert").classList.add("disabled")
   setTimeout(()=>{
      window.location.reload(true)
   }, 500)
   
})
document.getElementById("Qmark").addEventListener("click",()=>{
   document.getElementById("info").classList.remove("info-disabled")
})
document.getElementById("close").addEventListener("click",()=>{
   document.getElementById("info").classList.add("info-disabled")
})



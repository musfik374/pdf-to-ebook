let pdfDoc = null
let pageNum = 1
let canvas = document.getElementById("pdf-render")
let ctx = canvas.getContext("2d")

document.getElementById("upload").addEventListener("change", function(e){

let file = e.target.files[0]
let reader = new FileReader()

reader.onload = function(){
let typedarray = new Uint8Array(this.result)

pdfjsLib.getDocument(typedarray).promise.then(function(pdf){
pdfDoc = pdf
renderPage(pageNum)
})

}

reader.readAsArrayBuffer(file)

})

function renderPage(num){

pdfDoc.getPage(num).then(function(page){

let viewport = page.getViewport({scale:1.5})
canvas.height = viewport.height
canvas.width = viewport.width

page.render({
canvasContext: ctx,
viewport: viewport
})

document.getElementById("page-num").textContent =
num + " / " + pdfDoc.numPages

})

}

function nextPage(){
if(pageNum >= pdfDoc.numPages) return
pageNum++
renderPage(pageNum)
}

function prevPage(){
if(pageNum <= 1) return
pageNum--
renderPage(pageNum)
}

function toggleDark(){
document.body.classList.toggle("dark")
}
let startX = 0

canvas.addEventListener("touchstart", e=>{
startX = e.touches[0].clientX
})

canvas.addEventListener("touchend", e=>{
let endX = e.changedTouches[0].clientX

if(endX < startX){
nextPage()
}

if(endX > startX){
prevPage()
}
})

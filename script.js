var img = ['https://i.postimg.cc/QxYMrK0y/cf5fe4a4515038e081e8db84fea49907.jpg','https://i.postimg.cc/9XHywKPB/f1zq83fosi591.jpg','https://i.postimg.cc/BSXmBrK9/1rp-Zd9-TCEp0-Zkq-Ay-DRvi-QB8ka8-LVsq-Lya-Co1-YJEDYS0.png','https://i.postimg.cc/Z5bcB2SQ/1oo092ju6uh61.jpg','https://i.postimg.cc/FHdMqYfm/0b3da3d1f0198d402423f9e1ff7e08c8.jpg','https://i.postimg.cc/1zv7fQD8/9f981d86747c49b618b48c452e4169e5.jpg']

var old = 5
var clicks = 0
function randomize() {
  let root = document.documentElement
  root.style.setProperty('--image','url('+img[old]+')')
  old++
  if(old > 5) {
    old = 0
  }  
  var ul = document.querySelectorAll('#puzz i');
  for(var i=0;i<ul.length;i++){
    ul[i].style.left = Math.random()*(window.innerWidth-100) + 'px'
    ul[i].style.top = Math.random()*(window.innerHeight-100) + 'px'
  }
  // for (var i = ul.children.length; i >= 0; i--) {
  //   ul.appendChild(ul.children[Math.random() * i | 0]);    
  // }
}
randomize()

function reload() {
  var done = document.querySelectorAll('.done')
  done.forEach(function(e){
    e.classList.toggle('done')
  })
  var dropped = document.querySelectorAll('.dropped')
  dropped.forEach(function(e){
    e.classList.toggle('dropped')
  })
  var allDone = document.querySelector('.allDone')
  allDone.style = ''
  allDone.classList.toggle('allDone')
}


// mobile functionality
var p = document.querySelectorAll('#puzz i')
p.forEach(function(e){
  e.addEventListener('mousedown', function(){
    clicks++
    document.querySelector('#clicks').innerHTML = clicks
  })
  e.addEventListener('click', function(){
    if(document.querySelector('.clicked')){
      document.querySelector('.clicked').classList.toggle('clicked')
      e.classList.toggle('clicked')
    } else {
      e.classList.toggle('clicked')  
    }    
  })
})

var fp = document.querySelectorAll('#puz i')
fp.forEach(function(el){
  el.addEventListener('click', function(){
    if(document.querySelector('.clicked')){
      var c = document.querySelector('.clicked')
      if(c.classList.contains(el.classList)) {
        el.classList.add('dropped')
        c.classList.add('done')
        c.classList.toggle('clicked')

        if(document.querySelectorAll('.dropped').length == 9) {
          document.querySelector('#puz').classList.add('allDone')
          document.querySelector('#puz').style.border = 'none'  
          document.querySelector('#puz').style.animation = 'allDone 1s linear forwards'

          setTimeout(function(){
            reload()
            randomize()            
          },1500)
        } 
      }
    }    
  })
})

// desktop drag and drop
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.className);  
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text")

  if(ev.target.className == data){
    ev.target.classList.add('dropped')
    document.querySelector('.'+data+"[draggable='true']").classList.add('done')

    if(document.querySelectorAll('.dropped').length == 9) {
      document.querySelector('#puz').classList.add('allDone')
      document.querySelector('#puz').style.border = 'none'  
      document.querySelector('#puz').style.animation = 'allDone 1s linear forwards'  

      setTimeout(function(){
        reload()
        randomize()        
      },1500)
    }    
  }  
}

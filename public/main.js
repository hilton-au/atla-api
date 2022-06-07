app.use(express.static('public'))

const search = document.querySelector('#search')

search.addEventListener('click', _ =>{
   console.log(document.querySelector('#charName').value)
})
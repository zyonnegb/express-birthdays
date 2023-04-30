let btn = document.querySelector('button')
let outcome = document.querySelector('#color')
var trash = document.querySelector('#trashCan')

function getValue(){
  
  let month = document.querySelector('#month').value.toLowerCase()
  let day = document.querySelector('#day').value.toString()
  let year = document.querySelector('#year').value.toString()

  if( month === "january"){
    month = "1F" 
  }
  else if( month === "february"){
    month = "2F"
  }
  else if( month === "march"){
    month = "3F"
  }
  else if( month === "april"){
    month = "4F"
  }
  else if( month === "may"){
    month = "5F"
  }
  else if( month === "june"){
    month = "6F"
  }
  else if( month === "july"){
    month = "7F"
  }
  else if( month === "august"){
    month = "8F"
  }
  else if( month === "september"){
    month = "9F"
  }
  else if( month === "october"){
    month = "1F"
  }
  else if( month === "november"){
    month = "6F"
  }
  else if( month === "december"){
    month = "7F"
  }else{
    alert('Error!')
  }
  day = day.split('').reverse().join('')
  year = year.split('').slice(2).reverse().join('')

  // fetch(`/api?month=${month}&day=${day}&year=${year}`)
  // .then(response => response.json())
  // .then((data) => {
  //   console.log(data); 
  //   const hex = this.parentNode.parentNode.childNodes[7].innerText
  //   hex.style.color = data;
  // }); 

}

Array.from(trash).forEach(function(element) {
  console.log('hi')
  
  element.addEventListener('click', function(){
    const month = this.parentNode.parentNode.childNodes[1].innerText
    const day = this.parentNode.parentNode.childNodes[3].innerText
    const year = this.parentNode.parentNode.childNodes[5].innerText
    const hex = this.parentNode.parentNode.childNodes[7].innerText
    fetch('data', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'month': month,
        'day': day,
        'year': year,
        'hex': hex
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});
btn.addEventListener('click', getValue)
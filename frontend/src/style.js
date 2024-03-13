const circle = document.querySelectorAll('.circle')

circle.forEach(element => {
    element.addEventListener('mouseover', () => {
        element.classList.add('hover-effect')  
        element.style.backgroundSize = '120% 120%'
    })               
})            
  
circle.forEach(element => {
    element.addEventListener('mouseout', () => {
        element.classList.remove('hover-effect')
        element.style.backgroundSize = '100% 100%'
    })   
})              


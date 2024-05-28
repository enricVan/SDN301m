const Rectangle = require('./rectangle')

function calcRectangle(length, width) {
  if (length <= 0 || width <= 0) {
    console.log('Please provide a valid length and width')
  } else {
    console.log('Area: ' + Rectangle.area(length, width))
    console.log('Perimeter: ' + Rectangle.perimeter(length, width))
  }
}

calcRectangle(5, 10)
calcRectangle(-5, 10)

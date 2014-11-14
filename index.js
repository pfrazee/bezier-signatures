
draw4('6ecd355b90e81e72c0e37c3b4023325b20fff8c58d4200c69e4fbd550876e6fe', canvas1)
draw4('88c9aa687a076aa530cc18d7921cec1f90f7779ad25915204d272a695072f58a', canvas2)

function toBuffer(v) {
  if (!Buffer.isBuffer(v))
    return new Buffer(v, 'hex')
  return v
}


function draw4(buf, canvas) {
  var DIM = 32
  buf = toBuffer(buf)
  var ctx = canvas.getContext('2d')

  var i=0
  function getSigned() {
    var v = buf.readInt8(i++)
    if (i >= buf.length)
      i = 0
    return v / 128 * DIM / 2
  }

  function drawLine(x1, y1, x2, y2) {
    ctx.moveTo(x1, y1)
    // ctx.bezierCurveTo(x2, y2, x1 + getSigned(), y1 + getSigned(), x2 + getSigned(), y2 + getSigned())
    ctx.quadraticCurveTo(x2, y2, x2 + getSigned(), y2 + getSigned())
    ctx.stroke()
  }

  function drawChar(character, x, y) {
    switch (character.toUpperCase()) {
      case 'A':
        drawLine(x + DIM/2, y, x, y + DIM)
        drawLine(x + DIM/2, y, x + DIM, y + DIM)
        drawLine(x + DIM/4, y + DIM/2, x + DIM * 3/4, y + DIM/2)
        break
      case 'B':
        drawLine(x, y, x, y + DIM)
        drawLine(x, y, x + DIM, y + DIM/4)
        drawLine(x + DIM, y + DIM/4, x, y+DIM/2)
        drawLine(x, y + DIM/2, x + DIM, y + DIM*3/4)
        drawLine(x + DIM, y + DIM*3/4, x, y+DIM)
        break
      case 'C':
        drawLine(x+DIM, y, x, y+DIM/2)
        drawLine(x, y+DIM/2, x+DIM, y+DIM)
        break
      case 'D':
        drawLine(x, y, x, y + DIM)
        drawLine(x, y, x + DIM, y + DIM/2)
        drawLine(x + DIM, y + DIM/2, x, y+DIM)
        break
      case 'E':
        drawLine(x, y, x, y + DIM)
        drawLine(x, y, x + DIM, y)
        drawLine(x, y+DIM/2, x + DIM, y+DIM/2)
        drawLine(x, y+DIM, x + DIM, y+DIM)
        break
    }
  }

  function drawString(str) {
    for (var i=0; i < str.length; i++) {
      drawChar(str[i], 16+(DIM*i), 16)
    }
  }

  drawString('abcdefghijklmnopqrstuvwxyz')
}


function draw3(buf, canvas) {
  buf = toBuffer(buf)
  var ctx = canvas.getContext('2d')

  for (var i=0; i < buf.length; i+=8) {
    var x1 = 128 + buf.readUInt8(0+i)
    var y1 = 128 + buf.readInt8(1+i)
    var x2 = 128 + buf.readUInt8(2+i)
    var y2 = 128 + buf.readInt8(3+i)

    var r = buf.readUInt8(4+i)
    var g = buf.readUInt8(5+i)
    var b = buf.readUInt8(6+i)
    var w = buf.readUInt8(7+i)
    var off = i

    ctx.beginPath()
    ctx.lineCap = 'round'
    ctx.strokeStyle = 'rgb('+r+','+g+','+b+')'
    ctx.lineWidth = w/5+1
    ctx.moveTo(128, 128+off)
    ctx.bezierCurveTo(x1, y1+off, x2, y2+off, 256+128, 128+off)
    ctx.stroke()
  }
}

function draw2(buf, canvas) {
  buf = toBuffer(buf)
  var ctx = canvas.getContext('2d')

  var x1 = 128 + buf.readUInt8(0)
  var y1 = 128 + buf.readInt8(1)
  var x2 = 128 + buf.readUInt8(2)
  var y2 = 128 + buf.readInt8(3)

  for (var i=0; i < 28; i+=4) {
    var r = buf.readUInt8(4+i)
    var g = buf.readUInt8(5+i)
    var b = buf.readUInt8(6+i)
    var w = buf.readUInt8(7+i)
    var off = i

    ctx.beginPath()
    ctx.strokeStyle = 'rgb('+r+','+g+','+b+')'
    ctx.lineWidth = w/10+1
    ctx.moveTo(128, 128+off)
    ctx.bezierCurveTo(x1, y1+off, x2, y2+off, 256+128, 128+off)
    ctx.stroke()
  }
}

function draw1(buf, canvas) {
  buf = toBuffer(buf)
  var ctx = canvas.getContext('2d')
  for (var i = 0; i < buf.length; i += 4) {
    var basey = i * 8 + 64

    var x1 = 128 + buf.readUInt8(i+0)
    var y1 = basey + buf.readInt8(i+1)
    var x2 = 128 + buf.readUInt8(i+2)
    var y2 = basey + buf.readInt8(i+3)

    ctx.beginPath()
    ctx.moveTo(128, basey)
    // ctx.bezierCurveTo(x1, y1, x2, y2, 128, 256)
    ctx.bezierCurveTo(x1, y1, x2, y2, 256+128, basey)
    ctx.stroke()
  }
}
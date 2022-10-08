let draggers = []

Array.from(document.querySelectorAll('.handler')).forEach((el, i) => {

    draggers[i] = new dragHandler({
        area: document.querySelector('svg'),
        handler: el,
        handlerClick: true,
        customCallback: (ev) => {
            let data = bezier.getAttribute('d').matchAll(/(?<mod>M|C)?(?<x>[\d|\.]+),(?<y>[\d|\.]+)/g)
            data = Array.from(data);

            data[1 + i]['groups']['x'] = el.getAttribute('cx')
            data[1 + i]['groups']['y'] = el.getAttribute('cy')

            el.previousElementSibling.setAttribute('x2', el.getAttribute('cx'))
            el.previousElementSibling.setAttribute('y2', el.getAttribute('cy'))

            let string = ''

            data.forEach((el) => {
                string += ` ${el.groups.mod || ''}${el.groups.x},${el.groups.y} `
            })

            bezier.setAttribute('d', string)

            const x1 = (parseInt(data[1]['groups']['x'])) / 200
            const y1 = 1 - (parseInt(data[1]['groups']['y']) - 100) / 400
            const x2 = (parseInt(data[2]['groups']['x'])) / 200
            const y2 = 1 - (parseInt(data[2]['groups']['y']) - 100) / 200

            const cssString = `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`

            output.value = cssString

            let customDisplay = document.querySelector('.customDisplay')
            
            customDisplay.style.transitionTimingFunction = `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`
            customDisplay.setAttribute('style', 'animation-timing-function: ' + cssString)
        }
    })
})

draggers[0].set({
    x: 30,
    y: 130,
    mode: 'relative',
})
draggers[1].set({
    x: 170,
    y: 270,
    mode: 'relative',
})
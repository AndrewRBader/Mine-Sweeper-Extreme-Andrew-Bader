console.log('hello front end')

let $h1El = $('h1')
console.log($h1El)
$h1El.hide();

const $activate = $('.activated')
const $cleared = $('.cleared')

$activate.click(() => {
    $h1El.fadeIn();
    console.log('jQuery activated')
})

$cleared.click(() => {
    $h1El.fadeOut();
})
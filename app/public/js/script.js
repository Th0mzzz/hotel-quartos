
function changeImage(miniatura,alvo) {
    var mainImage = document.getElementById(alvo).querySelector('img');
    mainImage.src = miniatura.src;
    mainImage.alt = miniatura.alt;
}

function newNotify(title,content,type,position,timeout){
    new Notify({
        status: type,
        title:title,
        text:text,
        effect:'fade',
        speed:500,
        showIcon:true,
        showCloseButton:true,
        autoClose:true,
        autoTimeout:duracao,
        gap:20,
        distance:20,
        type:1,
        position:position
    })
}
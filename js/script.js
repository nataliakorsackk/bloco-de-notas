/* ===================== PRINCIPAIS OBJETOS  =================================*/

let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let btnCloseModal =  document.querySelector('#btn-close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseNote = document.querySelector("#btn-close-note"); //icone para fechar modal de edição de nota.


/* ===================== EVENTOS  =================================*/
addNote.addEventListener("click", (evt) =>{
    evt.preventDefault();
    modal.style.display = "block";
    addNote.style.display ="none";
    notes.style.display = "none";
} );
btnCloseModal.addEventListener("click", (evt) =>{
    evt.preventDefault();
    modal.style.display = "none";
    addNote.style.display ="block";
    notes.style.display = "flex";    
});
btnSaveNote.addEventListener("click", (evt) =>{
    evt.preventDefault();
    data = {
    id : document.querySelector("#input-id").value,
    title: document.querySelector("#input-title").value,
    content: document.querySelector("#input-content").value
    }
    saveNote(data);
});

btnCloseNote.addEventListener("click", (evt) =>{
    evt.preventDefault();
    modal.style.display = "none";
    modalView.style.display = "none";
    notes.style.display = "flex";
    addNote.style.display = "block";

})

/* ===================== FUNÇÕES  =================================*/

const saveNote = (note) => {

    let notes = loadNotes();

    if(note.id.trim().length < 1){ //para remover espaços (sujeiras) usa-se o trim().
        note.id = new Date().getTime();
    }else{
    
    } 

    note.lastTime = new Date().getTime();
    console.log(note);
    notes.push(note);

    notes = JSON.stringify(notes); //transformar objeto em texto novamente

    localStorage.setItem('notes', notes); //colocar o texto no local storage

};

const loadNotes = () =>{

    let notes = localStorage.getItem('notes');

    if(!notes){
        notes = [];
    }else{
        notes = JSON.parse(notes);} //uso do parse: transformação do notes em forma de string para objeto
  return notes;  

}

const listNotes = () =>{
    let listNotes = loadNotes();
    listNotes.forEach((note) => { //foreach para percorrer todos os itens do local storage
        let divCard = document.createElement('div');
        divCard.className = 'card';
        divCard.style.width = '25rem';
        let divCardBody = document.createElement('div');
        divCardBody.className = 'cardBody';
        divCard.appendChild(divCardBody);
        let h5 = document.createElement('h5');
        h5.innerText = note.title;
        divCardBody.appendChild(h5);

        let paragrafo = document.createElement('p');
        paragrafo.innerText = note.content;
        divCardBody.appendChild(paragrafo);
        
        let pData = document.createElement('p');
        pData.innerText = "atualizado em: " +dateFormat(note.lasTime);

        divCardBody.appendChild(pData);
        notes.appendChild(divCard);

        divCard.addEventListener('click', (evt) =>{
            showNote(note);
        })
    });

}
const showNote = (note) =>{
    notes.style.display = 'none';
    addNote.style.display = 'none';
    modalView.style.display = 'block';
    document.querySelector('#title-note').innerHTML = "<h1>"+note.title+"</h1>";
    document.querySelector('#content-note').innerHTML = `<p>${note.content}</p> <p>Ultima alteração: 
    ${dateFormat(note.lasTime)}</p>`
};


const dateFormat = (timestamp) =>{
    let date = new Date(timestamp); //converte para data
    date = date.toLocaleDateString("pt-BR");
    return date;
};

listNotes();
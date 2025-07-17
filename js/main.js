import ui from "./ui.js";
import api from "./api.js";

document.addEventListener('DOMContentLoaded', ()=>{ // Quando o conteúdo HTML for carregado
    ui.renderizarPensamentos();

    const formularioPensamento = document.getElementById('pensamento-form');
    formularioPensamento.addEventListener('submit', manipularSubmicaoFormulario);
})

async function manipularSubmicaoFormulario(event) {
    event.preventDefault();
    const id = document.getElementById('pensamento-id').value;
    const conteudo = document.getElementById('pensamento-conteudo').value;
    const autoria = document.getElementById('pensamento-autoria').value;

    try{
        if(id){ // Se exister um id, ou seja, o pensamento já foi criado
            await api.editarPensamento({id, conteudo, autoria});
        }else{
            await api.salvarPensamento({conteudo, autoria}); // Não precisamos colocar id em salvar pois o JSON Server já cria o ID 
        }
        ui.renderizarPensamentos();
    }catch{
        alert('Erro ao salvar pensamento');
    }
}

const btnCancelar = document.getElementById('botao-cancelar');

btnCancelar.addEventListener('click', ()=>{
    document.getElementById('pensamento-conteudo').value = '';
    document.getElementById('pensamento-autoria').value = '';
})
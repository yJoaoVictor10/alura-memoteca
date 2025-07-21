import ui from "./ui.js";
import api from "./api.js";

const pensamentosSet = new Set();

async function adicionarChaveAoPensamento() {
    try {
        const pensamentos = await api.buscarPensamentos();
        pensamentos.forEach(pensamento =>{
            const chavePensamento = `${pensamento.conteudo.trim().toLowerCase()}-${pensamento.autoria.trim().toLowerCase()}`;
            pensamentosSet.add(chavePensamento)
        })
    } catch (error) {
        alert('Erro ao adicionar chave ao pensamento');
        throw error;
    }
}

function removerEspacos(string){
    return string.replaceAll(/\s+/g, '') // O '+' serve para encontrar 1 ou mais espaços, 'g' de global
}

const regexConteudo = /^[A-Za-z\s]{10,}$/; //A até Z, podendo ser letras maiúsculas ou minúsculas, permitido dar espaço ou quebra de linha e no mínimo 10 caracteres, não tendo um máximo 
const regexAutoria = /^[A-Za-z]{3,15}$/

function validarConteudo(conteudo){
    return regexConteudo.test(conteudo);
}

function validarAutoria(autoria){
    return regexAutoria.test(autoria)
}

document.addEventListener('DOMContentLoaded', ()=>{ // Quando o conteúdo HTML for carregado
    ui.renderizarPensamentos();
    adicionarChaveAoPensamento();

    const formularioPensamento = document.getElementById('pensamento-form');
    formularioPensamento.addEventListener('submit', manipularSubmicaoFormulario);
    const inputBusca = document.getElementById('campo-busca');
    inputBusca.addEventListener('input', manipularBusca) // Quando houver modificação no campo de input
})

async function manipularSubmicaoFormulario(event) {
    event.preventDefault();
    const id = document.getElementById('pensamento-id').value;
    const conteudo = document.getElementById('pensamento-conteudo').value;
    const autoria = document.getElementById('pensamento-autoria').value;
    const data = document.getElementById('pensamento-data').value;

    const conteudoSemEspacos = removerEspacos(conteudo);
    const autoriaSemEspacos = removerEspacos(autoria);

    if(!validarConteudo(conteudoSemEspacos)){
        alert('É permitida a inclusão apenas de letras e espaços com no mínimo 10 caracteres')
        return
    } else if(!validarAutoria(autoriaSemEspacos)){
        alert('É permitida a inclusão apenas de letras sem espaço com no mínimo 3 e máximo 15 caracteres')
        return
    }

    const chaveNovoPensamento = `${conteudo.trim().toLowerCase()}-${autoria.trim().toLowerCase()}`;

    if(pensamentosSet.has(chaveNovoPensamento)){
        alert('Esse pensamento já existe');
        return;
    }

    if(!validarData(data)){
        alert('Não é permitido o cadastro de datas futuras. Selecione outra data')
        return
    }

    try{
        if(id){ // Se exister um id, ou seja, o pensamento já foi criado
            await api.editarPensamento({id, conteudo, autoria, data});
        }else{
            await api.salvarPensamento({conteudo, autoria, data}); // Não precisamos colocar id em salvar pois o JSON Server já cria o ID 
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
    document.getElementById('pensamento-data').value = '';
})

async function manipularBusca() {
    const termoBusca = document.getElementById('campo-busca').value;
    try{
        const pensamentosFiltrados = await api.buscarPensamentoPorTermo(termoBusca);
        ui.renderizarPensamentos(pensamentosFiltrados);
        
    }catch(error){
        alert('Erro ao realizar busca')
    }
}

function validarData(data){
    const dataAtual = new Date();
    const dataInserida = new Date(data);
    return dataInserida <= dataAtual
}
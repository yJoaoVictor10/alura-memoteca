import api from "./api.js";

const ui = {

    async preencherFormulario(pensamentoId) {
        const pensamento = await api.buscarPensamentoPorId(pensamentoId);
        document.getElementById('pensamento-id').value = pensamento.id;
        document.getElementById('pensamento-conteudo').value = pensamento.conteudo;
        document.getElementById('pensamento-autoria').value = pensamento.autoria;
    },

    async renderizarPensamentos() {
        const listaPensamentos = document.getElementById('lista-pensamentos');
        listaPensamentos.innerHTML = '';
        try {
            const pensamentos = await api.buscarPensamentos();
            pensamentos.forEach(ui.adicionarPensamentoNaLista);

            ui.verificarSeExistePensamento();
        } catch {
            alert('Erro ao renderizar pensamentos');
        }
    },

    adicionarPensamentoNaLista(pensamento) {
        const listaPensamentos = document.getElementById('lista-pensamentos');
        const li = document.createElement('li');
        li.setAttribute('data-id', pensamento.id);
        li.classList.add('li-pensamento');

        const iconeAspas = document.createElement('img');
        iconeAspas.src = 'assets/imagens/aspas-azuis.png';
        iconeAspas.alt = 'Aspas azuis';
        iconeAspas.classList.add('icone-aspas');

        const pensamentoConteudo = document.createElement('div');
        pensamentoConteudo.textContent = pensamento.conteudo;
        pensamentoConteudo.classList.add('pensamento-conteudo');

        const pensamentoAutoria = document.createElement('div');
        pensamentoAutoria.textContent = pensamento.autoria;
        pensamentoAutoria.classList.add('pensamento-autoria');

        const botaoEditar = document.createElement('button');
        botaoEditar.classList.add('botao-editar');
        botaoEditar.onclick = () => ui.preencherFormulario(pensamento.id);

        const iconeEditar = document.createElement('img');
        iconeEditar.src = 'assets/imagens/icone-editar.png';
        iconeEditar.alt = 'Editar';
        botaoEditar.appendChild(iconeEditar);

        const botaoExcluir = document.createElement('button');
        botaoExcluir.classList.add('botao-excluir');
        botaoExcluir.onclick = async () => {
            try {
                await api.excluirPensamento(pensamento.id);
                ui.renderizarPensamentos();
            } catch (error) {
                alert('Erro ao excluir pensamento');
            }
        }
        const iconeExcluir = document.createElement('img');
        iconeExcluir.src = 'assets/imagens/icone-excluir.png';
        iconeExcluir.alt = 'Excluir'
        botaoExcluir.appendChild(iconeExcluir);

        const icones = document.createElement('div');
        icones.classList.add('icones');
        icones.appendChild(botaoEditar);
        icones.appendChild(botaoExcluir);

        li.appendChild(iconeAspas);
        li.appendChild(pensamentoConteudo);
        li.appendChild(pensamentoAutoria);
        li.appendChild(icones);
        listaPensamentos.appendChild(li);

    },

    async verificarSeExistePensamento() {
        try {
            const pensamentos = await api.buscarPensamentos();
            if (!pensamentos || pensamentos.length === 0) {

                const paragrafo = document.createElement('p');
                paragrafo.classList.add('paragrafo-pensamentoVazio');

                const imagem = document.createElement('img');
                imagem.classList.add('imagem-pensamentoVazio');

                const div = document.createElement('div');
                const secao = document.getElementById('lista-vazia');

                paragrafo.textContent = 'Nada por aqui ainda, que tal compartilhar alguma ideia?';
                imagem.src = 'assets/imagens/lista-vazia.png';
                imagem.alt = 'Lista Vazia';
                div.appendChild(paragrafo);
                div.appendChild(imagem);
                secao.appendChild(div);
            }
        } catch (error) {
            console.log('Erro ao verificarPensamentos');

        }
    }
}

export default ui;
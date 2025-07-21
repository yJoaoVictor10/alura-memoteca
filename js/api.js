/* 
MANUAL:
01 - npm -i -g json-server 
02 - criar pasta backend
    cd backend
03 - npm init -y (crair package.json)
04 - criar db.json (api) e colocar o código json
05 - 'scripts' em package.json, mudar para "start": "json-server --watch db.json --port 3000"
06 - npm start
*/

const URL_BASE = 'http://localhost:3000';

const converterStringparaData = (dataString)=>{
    const [ano, mes, dia] = dataString.split('-');
    return new Date(Date.UTC(ano, mes-1, dia));
}

const api = { // Objeto com várias funções de requisições
    async buscarPensamentos(){
        try{
            const response = await axios.get(`${URL_BASE}/pensamentos`);
            const pensamentos = await response.data;

            return pensamentos.map(pensamento=>{
                return{
                    ...pensamento,
                    data: new Date(pensamento.data)
                }
            })
        }catch{
            alert('Erro ao buscar pensamentos');
            throw error;
        }
    },

    async salvarPensamento(pensamento){
        try{
            const data = converterStringparaData(pensamento.data);
            const response = await axios.post(`${URL_BASE}/pensamentos`, {
                ...pensamento, 
                data: data.toISOString() // Sobreescrevendo a data convertida de string para data
            });
            return await response.data; // Convertendo formato JSON para objeto JS
        }catch{
            alert('Erro ao salvar pensamentos');
            throw error;
        }
    },

    async buscarPensamentoPorId(id){
        try{
            const response = await axios.get(`${URL_BASE}/pensamentos/${id}`);
            const pensamento = await response.data; // Convertendo formato JSON para objeto JS

            return{
                ...pensamento,
                data: new Date(pensamento.data)
            }
        }catch{
            alert('Erro ao buscar pensamento');
            throw error;
        }
    },

    async editarPensamento(pensamento){
        try{
            const response = await axios.put(`${URL_BASE}/pensamentos/${pensamento.id}`, pensamento);
            return await response.data; // Convertendo formato JSON para objeto JS
        }catch{
            alert('Erro ao editar pensamento');
            throw error;
        }
    },

    async excluirPensamento(id){
        try{
            const response = await axios.delete(`${URL_BASE}/pensamentos/${id}`);
        }catch{
            alert('Erro ao excluir pensamento');
            throw error;
        }
    },

    async buscarPensamentoPorTermo(termo){
        try{
            const pensamentos = await this.buscarPensamentos();
            const termoEmMinusculo = termo.toLowerCase();
    
            const pensamentosFiltrados = pensamentos.filter(pensamento => {
                return(pensamento.conteudo.toLowerCase().includes(termoEmMinusculo)) || pensamento.autoria.toLowerCase().includes(termoEmMinusculo); //converter o conteúdo para minúsculo para não ter Case Sensitive e filtrar o conteúdo
            })
            return pensamentosFiltrados;
        }catch(error){
            alert('Erro ao filtrar pensamento');
            throw error;
        }
    },

    async atualizarFavorito(id, favorito){
        try {
            const response = await axios.patch(`${URL_BASE}/pensamentos/${id}`, {favorito}); // Atualiza a propriedade de favorito com base no ID | 
            // Estamos usando patch() pois queremos atualizar apenas uma propriedade, no caso o favorito, o PUT é para atualizar mais propriedades
            return response.data;
        } catch (error) {
            alert('Erro ao atualizar favorito');
            throw error;
        }
    }

}

export default api;

/* 

    USANDO FETCH

const api = { // Objeto com várias funções de requisições
    async buscarPensamentos(){
        try{
            const response = await fetch(`${URL_BASE}/pensamentos`);
            return await response.json() // Convertendo formato JSON para objeto JS
        }catch{
            alert('Erro ao buscar pensamentos')
            throw error;
        }
    },

    async salvarPensamento(pensamento){
        try{
            const response = await fetch(`${URL_BASE}/pensamentos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            });
            return await response.json() // Convertendo formato JSON para objeto JS
        }catch{
            alert('Erro ao salvar pensamentos')
            throw error;
        }
    },

    async buscarPensamentoPorId(id){
        try{
            const response = await fetch(`${URL_BASE}/pensamentos/${id}`);
            return await response.json() // Convertendo formato JSON para objeto JS
        }catch{
            alert('Erro ao buscar pensamento')
            throw error;
        }
    },

    async editarPensamento(pensamento){
        try{
            const response = await fetch(`${URL_BASE}/pensamentos/${pensamento.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            });
            return await response.json() // Convertendo formato JSON para objeto JS
        }catch{
            alert('Erro ao editar pensamento')
            throw error;
        }
    },

    async excluirPensamento(id){
        try{
            const response = await fetch(`${URL_BASE}/pensamentos/${id}`, {
                method: "DELETE"
            });
        }catch{
            alert('Erro ao excluir pensamento')
            throw error;
        }
    }

}
*/
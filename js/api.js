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

const api = { // Objeto com várias funções de requisições
    async buscarPensamentos(){
        try{
            const response = await axios.get(`${URL_BASE}/pensamentos`);
            return await response.data;
        }catch{
            alert('Erro ao buscar pensamentos');
            throw error;
        }
    },

    async salvarPensamento(pensamento){
        try{
            const response = await axios.post(`${URL_BASE}/pensamentos`, pensamento);
            return await response.data; // Convertendo formato JSON para objeto JS
        }catch{
            alert('Erro ao salvar pensamentos');
            throw error;
        }
    },

    async buscarPensamentoPorId(id){
        try{
            const response = await axios.get(`${URL_BASE}/pensamentos/${id}`);
            return await response.data; // Convertendo formato JSON para objeto JS
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
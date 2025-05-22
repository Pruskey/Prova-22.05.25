import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const server = express()
server.use(express.json())

server.options('/', (req, res)=>{
    req.status(200).json({msg: "Funcionando com sucesso."})
})

function adicionarMensagem(mensagem, aluno){
    fs.writeFile('./logs.txt', content, err =>{
        if (err){
            console.error(err);
        } else {
            console.log("arquivo escrito com sucesso");
        }
    })
}

server.listen(8000, () => {
    console.log('Servidor ouvindo na porta 8000')
  })
import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const server = express()
server.use(express.json())

server.options('/', (req, res)=>{
    req.status(200).json({msg: "Funcionando com sucesso."})
})

//Edite as informações aqui
const mensagem = "O loko";
const aluno = "Brunor";
const id = uuidv4().toString();
const horario = Date.now().toString();
const mensagemFinal = `\nID: ${id}, Horário: ${horario}, Aluno: ${aluno} - "${mensagem}"`;

//Ler logs.txt
fs.readFile('logs.txt', 'utf-8', (err, data) =>{
    if (err){
        console.error("Erro ao ler logs", err);
        return;
    }

    console.log("Conteúdo nos Logs:", data);
})

//Escrever no log
fs.writeFile('logs.txt', mensagemFinal, 'utf-8', (err) =>{
    if (err){
        console.error("Erro ao adicionar mensagem.", err);
        return;
    }
    console.log("Mensagem adicionada ao Log!");
})

server.listen(8080, () => {
    console.log('Servidor ouvindo na porta 8080')
  })
import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const server = express()
server.use(express.json())

server.options('/', (req, res)=>{
    req.status(200).json({msg: "Funcionando com sucesso."})
})

//Edite as informações aqui
function atualizarLog(aluno, mensagem){
    const id = uuidv4().toString();
    const horario = new Date();
    return `ID: ${id}, Horário: ${horario}, Aluno: ${aluno} - "${mensagem}"\r\n`
}
//Ler logs.txt
fs.readFile('logs.txt', 'utf-8', (err, data) =>{
    if (err){
        console.error("Erro ao ler logs", err);
        return;
    }

    console.log("Conteúdo nos Logs:", data);
})

/* Crie uma rota /logs que receba o nome do aluno no corpo da requisição, gere o ID e registre a mensagem no arquivo logs.txt usando a função criada.
Retorne o ID gerado e uma mensagem de sucesso.
Faça um commit após implementar essa rota. */

server.get('/logs', (req, res) => {
    const mensagem = atualizarLog(String(req.query.aluno), String(req.query.mensagem))
        res.send(`Log atualizado com sucesso! ID: ${mensagem}`)

        //Escrever no log
    fs.appendFile('logs.txt', mensagem, 'utf-8', (err) =>{
    if (err){
        console.error("Erro ao adicionar mensagem.", err);
        return;
    }
    console.log("Mensagem adicionada ao Log!");
    })
})

server.listen(8080, () => {
    console.log('Servidor ouvindo na porta 8080')
  })
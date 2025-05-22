import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

/*
COMO USAR:
Inicie o servidor com o Code Runner, e entre na página
http://localhost:8080/logs?aluno=(aluno)&mensagem=(mensagem)
*/

const server = express()
server.use(express.json())

server.options('/', (req, res)=>{
    req.status(200).json({msg: "Funcionando com sucesso."})
})

//Função de criar um "log"
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

//Atualizar logs
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

//Server ouvindo
server.listen(8080, () => {
    console.log('Servidor ouvindo na porta 8080')
  })
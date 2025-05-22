import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const server = express()
server.use(express.json())

server.options('/', (req, res)=>{
    req.status(200).json({msg: "Funcionando com sucesso."})
})

server.post('/logs', (req, res) =>{
    const {mensagem, aluno} = req.body
    fs.readFile('logs.txt', 'utf-8', (err, data) => {
        if (err){
            res.status(500).json({erro:err})
        } else {
            const lista = JSON.parse(data)
            const adicionarLog = {
                id: uuidv4(),
                mensagem,
                hora: Date.now().toString(),
                aluno
            }

            lista.push(adicionarLog)

            fs.writeFile('./logs.txt', JSON.stringify(lista, null, 2), (err) =>{
                if (err){
                    res.status(500).json({erro:err})
                } else {
                    res.status(201).json(adicionarLog)
                }
            })
        }
    })
})

server.listen(8080, () => {
    console.log('Servidor ouvindo na porta 8080')
  })
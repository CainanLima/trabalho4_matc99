# Readme

## Como rodar o projeto?

### Instalando bibliotecas

O projeto está separado em duas pastas, web e serve, ambas devem ter suas bibliotecas separadas

npm install ou npm i

### Configurando

Na pasta serve siga a configuração básica do .env copiando o .env.example e tirando o .example . Se houver alguma divergencia, configure as variaveis, para o funcionamento do envio por email seguir instruções em:

[https://www.androidauthority.com/gmail-smtp-settings-801100/](https://www.androidauthority.com/gmail-smtp-settings-801100/)

## Rodando o Backend

Na pasta serve rode no terminal

adonis serve --dev

## Rodando o Frontend

Na pasta web rode no terminal para criação do banco de dados e inicialização do servidor respectivamente

adonis migration:run

npm start
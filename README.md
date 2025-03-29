Aqui está o arquivo `README.md` atualizado com a descrição do projeto, funcionalidades, como executar e outras informações relevantes, conforme sua solicitação:

```markdown
# Spotify Clone

Este projeto é um **clone do Spotify** desenvolvido com **Next.js** (para o frontend), **Node.js** (para o backend), e **Bootstrap**. O objetivo é criar uma versão funcional e simples da plataforma Spotify, com foco em aprender como construir sistemas de música, autenticação e gerenciamento de playlists.

## :book: Sobre o Projeto

Este é um projeto de estudo pessoal, inspirado no Spotify, criado com paixão por música e tecnologia. Devido à limitação de tempo e ao envolvimento em outros projetos, algumas funcionalidades não puderam ser implementadas na versão atual.

O repositório está dividido em duas partes:
- **Frontend**: O cliente (interface do usuário), desenvolvido com Next.js e React.
- **Backend**: A parte do servidor, desenvolvida com Node.js e Express, que gerencia a autenticação de usuários, banco de dados e outras funcionalidades.

## :computer: Tecnologias Utilizadas

### Frontend
- **Next.js**: Framework React para renderização do lado do servidor e melhor performance no frontend.
- **React**: Biblioteca JavaScript para construção da interface de usuário.
- **Bootstrap**: Framework CSS para criar uma interface simples e responsiva.
- **SweetAlert2**: Para exibição de alertas e confirmações de maneira amigável.

### Backend
- **Node.js**: Para gerenciar o backend da aplicação e autenticação de usuários.
- **Express**: Framework para criar rotas e interagir com o banco de dados.
- **MongoDB**: Banco de dados para armazenar informações de usuários, músicas e playlists.
- **JWT (JSON Web Token)**: Para autenticação segura de usuários.
- **bcryptjs**: Para criptografia de senhas.

## :wrench: Funcionalidades

### Frontend
- **Cadastro e Login de Usuário**: Sistema de autenticação baseado em JWT para login seguro.
- **Criação de Playlists**: Permite aos usuários criar suas próprias playlists de músicas.
- **Exibição de Músicas**: Exibição de uma lista de músicas para os usuários explorarem.

### Backend
- **API de Autenticação**: Endpoints para login e registro de usuários.
- **Gestão de Playlists e Músicas**: API para criar, atualizar e listar playlists, bem como adicionar e remover músicas de playlists.

## :warning: Funcionalidades Faltantes

Devido ao tempo limitado e ao trabalho em outros projetos, algumas funcionalidades não foram implementadas:

- **Player Completo**: A funcionalidade de player de música com controles como play, pause, skip, etc.
- **Sistema de Playlists Avançado**: Falta de algumas opções de personalização para playlists, como edição de nome, imagem, etc.
- **Integração com APIs de Música Reais**: A versão atual utiliza dados fictícios em vez de uma integração real com plataformas de música como Spotify.

## :construction_worker: Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) e o [npm](https://www.npmjs.com/) instalados.

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/spotify-clone.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd spotify-clone
   ```

3. Para rodar o **backend**:

   - Acesse a pasta do backend:
     ```bash
     cd backend
     ```

   - Instale as dependências:
     ```bash
     npm install
     ```

   - Execute o servidor do backend:
     ```bash
     npm run dev
     ```

   O backend estará rodando na URL `http://localhost:5000` (ou outra porta configurada).

4. Para rodar o **frontend**:

   - Acesse a pasta do frontend:
     ```bash
     cd frontend
     ```

   - Instale as dependências:
     ```bash
     npm install
     ```

   - Execute o servidor do frontend:
     ```bash
     npm run dev
     ```

   O frontend estará rodando na URL `http://localhost:3000`.

5. Acesse o projeto em seu navegador.

### Configuração do Banco de Dados (Backend)

Certifique-se de configurar o MongoDB corretamente:

1. Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) para obter uma instância de banco de dados.
2. Adicione as variáveis de ambiente necessárias no arquivo `.env` no diretório do backend, como a URI de conexão com o banco de dados.

## :memo: Considerações Finais

Este é um projeto de aprendizado e um exemplo do meu trabalho na construção de um clone simples do Spotify. Mesmo com as limitações de tempo, procurei focar na qualidade do código e na criação de uma estrutura que permita fácil expansão no futuro. 

Se eu tivesse mais tempo, teria dado mais atenção ao design e funcionalidade do player e integrado com APIs reais de música. No entanto, esse projeto mostra minha capacidade de construir uma aplicação do início ao fim, com as principais funcionalidades de um serviço de streaming de música.

## :link: Links Úteis

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Node.js](https://nodejs.org/en/docs/)
- [Documentação do Express](https://expressjs.com/)
- [Documentação do MongoDB](https://www.mongodb.com/docs/)
- [Documentação do Bootstrap](https://getbootstrap.com/)

## :handshake: Contribuições

Se você quiser contribuir para este projeto, fique à vontade para abrir uma *pull request* ou enviar uma *issue* com sugestões.

---
```

Agora você tem um arquivo `README.md` completo e organizado para o seu projeto de clone do Spotify. Ele descreve o projeto, tecnologias utilizadas, funcionalidades implementadas e como executar o projeto, bem como informações sobre funcionalidades faltantes e contribuições.
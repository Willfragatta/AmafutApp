# AMAFUT App - Sistema de Gestão de Futebol

## 📋 Descrição

O AMAFUT App é uma plataforma web completa para gestão de times de futebol, desenvolvida para facilitar a administração de treinamentos, participações, evolução física, agenda de jogos, escalações, estatísticas e cobranças.

## 🎯 Objetivos

- Facilitar a tomada de decisão da equipe técnica
- Auxiliar atletas com evoluções, agendas, escalações e pagamentos
- Centralizar informações sobre treinos, jogos e estatísticas
- Fornecer ferramentas de comunicação entre dirigentes e atletas

## 🏗️ Arquitetura

### Backend
- **Framework**: Node.js com Express
- **Banco de Dados**: MongoDB
- **Autenticação**: JWT (JSON Web Tokens)
- **Criptografia**: bcryptjs
- **CORS**: Habilitado para comunicação com frontend

### Frontend
- **Framework**: Angular 20
- **UI Framework**: Angular Material
- **Estado**: RxJS BehaviorSubject
- **Roteamento**: Angular Router com Guards
- **Formulários**: Reactive Forms com validações

## 🚀 Funcionalidades Implementadas

### ✅ Autenticação e Autorização
- [x] Login de usuários (atletas e administradores)
- [x] Registro de novos usuários
- [x] Proteção de rotas com Guards
- [x] Interceptor HTTP para tokens automáticos
- [x] Logout automático em caso de token expirado

### ✅ Interface de Usuário
- [x] Design responsivo e moderno
- [x] Componentes Material Design
- [x] Validações de formulário em tempo real
- [x] Feedback visual com SnackBars
- [x] Animações e transições suaves

### ✅ Estrutura de Dados
- [x] Modelo de usuário com roles
- [x] APIs RESTful para autenticação
- [x] Validação de dados no backend
- [x] Criptografia de senhas

## 📁 Estrutura do Projeto

```
amafut-app/
├── backend/
│   ├── config/
│   │   └── db.js                 # Configuração do MongoDB
│   ├── controllers/
│   │   ├── authController.js     # Controle de autenticação
│   │   └── athleteController.js  # Controle de atletas
│   ├── middleware/
│   │   └── authMiddleware.js     # Middleware de autenticação
│   ├── models/
│   │   └── User.js              # Modelo de usuário
│   ├── routes/
│   │   ├── authRoutes.js        # Rotas de autenticação
│   │   └── athleteRoutes.js     # Rotas de atletas
│   ├── server.js                # Servidor principal
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/      # Componentes reutilizáveis
│   │   │   ├── guards/          # Guards de proteção de rotas
│   │   │   ├── interceptors/    # Interceptors HTTP
│   │   │   ├── models/          # Interfaces TypeScript
│   │   │   ├── pages/           # Páginas da aplicação
│   │   │   │   ├── login/       # Página de login
│   │   │   │   └── register/    # Página de registro
│   │   │   ├── services/        # Serviços da aplicação
│   │   │   ├── app.config.ts    # Configuração da aplicação
│   │   │   ├── app.routes.ts    # Rotas da aplicação
│   │   │   └── app.html         # Template principal
│   │   ├── styles.scss          # Estilos globais
│   │   └── main.ts              # Ponto de entrada
│   └── package.json
└── README.md
```

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação baseada em tokens
- **bcryptjs** - Criptografia de senhas
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Variáveis de ambiente

### Frontend
- **Angular 20** - Framework frontend
- **Angular Material** - Componentes UI
- **TypeScript** - Linguagem de programação
- **RxJS** - Programação reativa
- **Angular Router** - Roteamento
- **Reactive Forms** - Formulários reativos
- **SCSS** - Pré-processador CSS

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- MongoDB (local ou Atlas)
- npm ou yarn

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
ng serve
```

### Variáveis de Ambiente (Backend)
Crie um arquivo `.env` na pasta `backend`:
```env
PORT=5000
MONGODB_URI=sua_uri_do_mongodb
JWT_SECRET=seu_jwt_secret_super_seguro
```

## 📱 Funcionalidades Planejadas

### Fase 6: Dashboard e Navegação
- [ ] Dashboard para atletas
- [ ] Dashboard para administradores
- [ ] Menu de navegação responsivo
- [ ] Perfil do usuário

### Fase 7: Gestão de Atletas
- [ ] CRUD completo de atletas
- [ ] Upload de fotos
- [ ] Histórico de performance
- [ ] Avaliações físicas

### Fase 8: Gestão de Treinos
- [ ] Criação de treinos
- [ ] Controle de presença
- [ ] Avaliações de treino
- [ ] Estatísticas de participação

### Fase 9: Gestão de Jogos
- [ ] Calendário de jogos
- [ ] Escalações
- [ ] Estatísticas de jogo
- [ ] Resultados e classificações

### Fase 10: Sistema de Pagamentos
- [ ] Controle de mensalidades
- [ ] Histórico de pagamentos
- [ ] Relatórios financeiros
- [ ] Notificações de vencimento

### Fase 11: Comunicação
- [ ] Chat interno
- [ ] Notificações push
- [ ] Anúncios e comunicados
- [ ] Envio de emails

## 🔒 Segurança

- Senhas criptografadas com bcryptjs
- Autenticação JWT com expiração
- Validação de dados no backend
- Proteção de rotas com Guards
- Interceptor HTTP para tokens automáticos
- CORS configurado adequadamente

## 📊 Status do Projeto

**Progresso Geral**: 25% concluído

### ✅ Concluído
- [x] Estrutura básica do backend
- [x] Autenticação e autorização
- [x] Interface de login e registro
- [x] Configuração de rotas e guards
- [x] Integração com MongoDB

### 🔄 Em Desenvolvimento
- [ ] Dashboard principal
- [ ] Gestão de atletas
- [ ] Sistema de treinos

### 📋 Próximos Passos
1. Implementar dashboard para atletas e administradores
2. Criar sistema de gestão de atletas
3. Desenvolver módulo de treinos
4. Implementar sistema de jogos e escalações

## 🤝 Contribuição

Este projeto está sendo desenvolvido como parte de um trabalho escolar. Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto é desenvolvido para fins educacionais.

## 👨‍💻 Desenvolvedor

- **Nome**: [Seu Nome]
- **Email**: [seu.email@exemplo.com]
- **GitHub**: [@seu-usuario]

---

**AMA**FUT - Transformando a gestão do futebol! ⚽ 
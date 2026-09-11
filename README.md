# 🚀 Fullstack Task Manager — Projeto de Aprendizado & Treino

<div align="center">

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![H2 Database](https://img.shields.io/badge/H2_Database-003545?style=for-the-badge&logo=database&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

<p align="center">
  <b>Um aplicativo completo de Gerenciamento de Tarefas (CRUD) criado com o propósito de praticar, evoluir e dominar o desenvolvimento Fullstack integrando Java (Spring Boot) no backend e Angular no frontend.</b>
</p>

</div>

---

## 🎯 Objetivo do Projeto

Este repositório serve como um **laboratório prático de estudos** para aprimorar habilidades em:
- **Backend com Java & Spring Boot**: Construção de APIs RESTful limpas, arquitetura em camadas (Controller, Service, Repository, Entity), persistência com Spring Data JPA, validação de DTOs e banco de dados em memória (H2).
- **Frontend com Angular**: Criação de interfaces modernas e reativas usando Componentes Standalone, integração via `HttpClient` (RxJS), formulários reativos/reativos com `FormsModule`, filtros dinâmicos e métricas de desempenho em tempo real.
- **Integração Fullstack & CORS**: Comunicação HTTP fluida entre cliente e servidor com tratamento robusto de erros.

---

## ✨ Funcionalidades

- 📝 **CRUD Completo de Tarefas**: Criar, visualizar, editar e excluir tarefas.
- ✅ **Alternância Rápida de Status**: Marcar/desmarcar tarefas como concluídas com 1 clique (Patch).
- 🏷️ **Níveis de Prioridade**: Suporte a prioridades (`BAIXA`, `MÉDIA`, `ALTA`) com identificação visual.
- 📅 **Datas de Vencimento**: Agendamento e acompanhamento de prazos de entrega.
- 🔍 **Filtros e Busca em Tempo Real**: Filtrar por palavra-chave no título/descrição, por status (Todas, Pendentes, Concluídas) e por prioridade.
- 📊 **Dashboard de Métricas**: Painel estatístico que exibe total de tarefas, pendentes, concluídas e barra de progresso em porcentagem.
- 🔔 **Notificações Toast**: Feedback visual instantâneo para todas as ações do usuário.

---

## 🛠️ Tecnologias Utilizadas

### **Backend (Spring Boot)**
* **Linguagem**: Java
* **Framework**: Spring Boot 3
* **Persistência**: Spring Data JPA / Hibernate
* **Banco de Dados**: H2 Database (em memória)
* **Validação**: Jakarta Validation
* **Ferramenta de Build**: Maven

### **Frontend (Angular)**
* **Framework**: Angular 17+ (Standalone Components)
* **Linguagem**: TypeScript
* **Estilização**: CSS3 Moderno (CSS Variables, Flexbox, Glassmorphism design)
* **Comunicação HTTP**: Angular HttpClient & RxJS

---

## 📁 Estrutura do Repositório

```text
crud/
├── backend/                  # API REST em Spring Boot
│   ├── src/main/java/        # Código fonte Java (Controllers, Services, Models, Repositories)
│   ├── src/main/resources/   # Configurações do Spring (application.properties)
│   └── pom.xml               # Dependências do Maven
│
├── frontend/                 # Aplicação Angular
│   ├── src/app/              # Componentes, Modelos e Serviços
│   ├── angular.json          # Configurações do Angular
│   └── package.json          # Dependências do Node.js
│
└── README.md                 # Documentação do projeto
```

---

## 🚦 Como Executar o Projeto

### Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:
- **Java JDK 17+**
- **Node.js 18+** e **npm**
- **Angular CLI** (`npm install -g @angular/cli`)
- **Git**

---

### 1. Clonar o Repositório
```bash
git clone https://github.com/lisboainformatica/crud.git
cd crud
```

---

### 2. Executar o Backend (Spring Boot)

```bash
# Entre na pasta do backend
cd backend

# Execute a aplicação usando Maven Wrapper
# No Windows PowerShell / CMD:
.\mvnw.cmd spring-boot:run

# No Linux / macOS:
./mvnw spring-boot:run
```
O servidor backend iniciará na porta **8080**:
- **API Base**: `http://localhost:8080/api/tasks`
- **Console do Banco H2**: `http://localhost:8080/h2-console` *(JDBC URL: `jdbc:h2:mem:tododb`, Usuário: `sa`, Senha: em branco)*

---

### 3. Executar o Frontend (Angular)

Abra um novo terminal e execute:

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências do Node.js
npm install

# Inicie o servidor de desenvolvimento do Angular
ng serve --open
```
A aplicação abrirá automaticamente no seu navegador em `http://localhost:4200`.

---

## 🌐 Endpoints da API REST

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/tasks` | Lista todas as tarefas (suporta query params `completed` e `priority`) |
| `GET` | `/api/tasks/{id}` | Busca uma tarefa específica por ID |
| `POST` | `/api/tasks` | Cria uma nova tarefa |
| `PUT` | `/api/tasks/{id}` | Atualiza uma tarefa existente |
| `PATCH` | `/api/tasks/{id}/toggle` | Alterna o status da tarefa (Concluída/Pendente) |
| `DELETE` | `/api/tasks/{id}` | Remove uma tarefa |

---

## 💡 Aprendizados & Evolução

Construir este projeto possibilitou colocar em prática conceitos fundamentais de desenvolvimento de software:

1. **Separação de Responsabilidades**: Arquitetura desacoplada onde o backend cuida puramente das regras de negócio e dados, e o frontend entrega uma experiência fluida ao usuário.
2. **Reatividade no Angular**: Uso de RxJS Observables para lidar com requisições assíncronas e atualização reativa de estados.
3. **Qualidade e Estilização**: Criação de interfaces elegantes com UI intuitiva, responsiva e acessível.

---

<div align="center">
  <p>Desenvolvido com 💙 como parte da jornada de aprendizado em <b>Java</b> & <b>Angular</b>.</p>
</div>

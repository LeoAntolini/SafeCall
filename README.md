# SafeCall

Sistema web desenvolvido para registro, monitoramento e análise de denúncias relacionadas a golpes telefônicos e fraudes digitais.

O objetivo do projeto é permitir que usuários possam denunciar números suspeitos, consultar informações sobre golpes recorrentes e acompanhar o status das denúncias realizadas.

---

# 📌 Objetivo do Projeto

O SafeCall foi criado com foco em:

- combate a golpes telefônicos
- denúncias de números suspeitos
- conscientização digital
- análise de padrões de fraude
- centralização de denúncias da comunidade

O sistema permite que usuários registrem denúncias envolvendo:

- falso banco
- golpe do PIX
- falsa central
- clonagem de WhatsApp
- falso suporte técnico
- entre outros

---

# 🚀 Tecnologias Utilizadas

## Frontend

- React
- React Router DOM
- Tailwind CSS
- Axios
- Recharts
- React Hot Toast
- React Icons
- Vite

---

## Backend

- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- Maven

---

## Banco de Dados

- MySQL

---

# 🔐 Funcionalidades

## Autenticação

✅ Cadastro de usuários  
✅ Login com JWT  
✅ Rotas protegidas  
✅ Logout  

---

## Denúncias

✅ Registro de denúncias  
✅ Seleção de tipos de golpe  
✅ Máscara de telefone  
✅ Validação de formulário  
✅ Alteração de status da denúncia  
✅ Proteção para que apenas o dono altere sua denúncia  

---

## Analytics

✅ Total de denúncias  
✅ Níveis de risco  
✅ Gráfico de distribuição  
✅ Números mais denunciados  
✅ Análise de reincidência  

---

## Perfil

✅ Dados do usuário  
✅ Histórico de denúncias  
✅ Alteração de status  

---

## UX/UI

✅ Toast notifications  
✅ Loading states  
✅ Responsividade  
✅ Sidebar responsiva  
✅ Interface moderna  

---

# 📊 Tipos de Golpe Disponíveis

- Falso Banco
- Falsa Central de Atendimento
- Golpe do PIX
- Clonagem de WhatsApp
- Prêmio Falso
- Falso Suporte Técnico
- Outros

---

# 📁 Estrutura do Projeto

```txt
SafeCall/
│
├── frontend/
│   ├── src/
│   ├── pages/
│   ├── components/
│   ├── context/
│   └── services/
│
├── backend/
│   ├── src/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   └── security/
│
└── README.md
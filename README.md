# 🎁 Swags Manager Pro

**Sistema inteligente para controle de estoque de swags e camisetas em eventos de segurança e bug bounty.**

## ✨ **Funcionalidades Principais**

### 👕 **Gestão de Camisetas**
- **Controle por Tamanho + Sponsor**: Cada camiseta tem tamanho (PP, P, M, L, XL, XXL) e empresa sponsor
- **Sponsors Suportados**: Bugcrowd, Intigriti, HackerOne, BugHunt, PortSwigger
- **Adicionar Quantidade**: Soma ao estoque existente de combinações específicas
- **Registrar Distribuição**: Controle de saída de camisetas para eventos
- **Alertas Inteligentes**: 
  - 🚫 **Estoque acabou** (quantidade = 0)
  - ⚠️ **Estoque baixo** (quantidade < 10)

### 🎁 **Controle de Swags**
- **Tipos Suportados**: Licenças, Canecas, Outros itens
- **Swags Padrão**: Licença Caido, PentesterLab, HackTheBox, Caneca BBV, Coin BBV
- **Gestão de Licenças**: Registro obrigatório de nome e email do ganhador
- **Histórico Completo**: Rastreamento de todas as distribuições
- **Exportação CSV**: Relatórios para análise e auditoria

## 🚀 **Tecnologias**

- **Frontend**: React 18 + TypeScript
- **Estado**: Context API + useReducer
- **Estilo**: CSS Custom Properties + Flexbox/Grid
- **PWA**: Progressive Web App para mobile
- **Database**: Firebase/Firestore para persistência em tempo real
- **Icons**: Lucide React
- **Build**: Create React App

## 📱 **Design Responsivo**

- **Mobile-First**: Otimizado para uso em eventos
- **Sidebar Adaptativa**: Menu lateral que se ajusta ao tamanho da tela
- **Interface Intuitiva**: Cards organizados e formulários claros
- **Cores Semânticas**: Sistema de cores para diferentes estados

## 🎯 **Casos de Uso**

### **Eventos de Segurança**
- Controle de camisetas por empresa sponsor
- Gestão de swags para participantes
- Rastreamento de distribuições
- Relatórios de uso

### **Bug Bounty Programs**
- Controle de licenças premium
- Gestão de itens promocionais
- Histórico de ganhadores
- Auditoria de distribuições

## 🛠️ **Instalação e Uso**

### **Requisitos**
- Node.js 16+
- npm ou yarn

### **Setup**
```bash
# Clone o repositório
git clone [url-do-repo]

# Instale as dependências
npm install

# Configure Firebase (veja FIRESTORE_SETUP.md)
cp env.template .env
# Edite .env com suas credenciais Firebase

# Execute em desenvolvimento
npm start

# Build para produção
npm run build
```

### **Uso Rápido**
1. **Configure** Firebase (veja FIRESTORE_SETUP.md)
2. **Acesse** o app no navegador
3. **Clique** em "Init Firestore" para inicializar dados padrão
4. **Navegue** entre as abas "Camisetas" e "Swags"
5. **Gerencie** estoque e distribuições em tempo real

## 📊 **Estrutura do Projeto**

```
src/
├── components/          # Componentes React
│   ├── CamisetasTab.tsx    # Gestão de camisetas
│   ├── SwagsTab.tsx        # Controle de swags
│   └── Sidebar.tsx         # Menu lateral
├── context/            # Estado global
│   └── AppContext.tsx      # Context API
├── services/           # Serviços Firebase
│   └── firestore.ts        # Operações Firestore
├── config/             # Configuração Firebase
│   └── firebase.ts         # Inicialização Firebase
├── utils/              # Utilitários
│   └── firestore.ts        # Helpers Firestore
├── types/              # Definições TypeScript
│   └── index.ts            # Interfaces e tipos
└── index.css           # Sistema de design
```

## 🔧 **Configuração**

### **Firebase Setup**
1. **Crie** um projeto no [Firebase Console](https://console.firebase.google.com/)
2. **Configure** Firestore Database
3. **Copie** as credenciais para `.env`
4. **Execute** "Init Firestore" no app

### **Sponsors Personalizados**
Edite `src/services/firestore.ts`:
```typescript
const defaultSponsors = [
  'Bugcrowd', 'Intigriti', 'HackerOne', 
  'BugHunt', 'PortSwigger'
];
```

### **Novos Swags**
Use o botão "Adicionar Swag" no app ou edite diretamente no Firestore.

## 📈 **Roadmap**

- [x] **Firebase Integration**: Firestore para persistência em tempo real
- [ ] **Authentication**: Login de usuários
- [ ] **Real-time Updates**: Sincronização automática entre dispositivos
- [ ] **Offline Support**: Funcionamento sem conexão
- [ ] **Advanced Analytics**: Relatórios e métricas
- [ ] **Multi-User**: Sistema de usuários e permissões
- [ ] **Analytics**: Dashboards e relatórios avançados
- [ ] **QR Code**: Sistema de distribuição por QR
- [ ] **Notifications**: Alertas em tempo real
- [ ] **Backup**: Exportação/importação de dados

## 🤝 **Contribuição**

1. **Fork** o projeto
2. **Crie** uma branch para sua feature
3. **Commit** suas mudanças
4. **Push** para a branch
5. **Abra** um Pull Request

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!**

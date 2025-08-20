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
- **Storage**: LocalStorage para persistência offline
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

# Execute em desenvolvimento
npm start

# Build para produção
npm run build
```

### **Uso Rápido**
1. **Acesse** o app no navegador
2. **Clique** em "Demo Data" para carregar dados de exemplo
3. **Navegue** entre as abas "Camisetas" e "Swags"
4. **Gerencie** estoque e distribuições

## 📊 **Estrutura do Projeto**

```
src/
├── components/          # Componentes React
│   ├── CamisetasTab.tsx    # Gestão de camisetas
│   ├── SwagsTab.tsx        # Controle de swags
│   └── Sidebar.tsx         # Menu lateral
├── context/            # Estado global
│   └── AppContext.tsx      # Context API
├── data/               # Dados de exemplo
│   └── sampleData.ts       # Swags e camisetas padrão
├── types/              # Definições TypeScript
│   └── index.ts            # Interfaces e tipos
└── index.css           # Sistema de design
```

## 🔧 **Configuração**

### **Sponsors Personalizados**
Edite `src/components/CamisetasTab.tsx`:
```typescript
const sponsorsDisponiveis = [
  'Bugcrowd', 'Intigriti', 'HackerOne', 
  'BugHunt', 'PortSwigger'
];
```

### **Novos Swags**
Adicione em `src/data/sampleData.ts`:
```typescript
export const sampleSwags: Swag[] = [
  // Seus novos swags aqui
];
```

## 📈 **Roadmap**

- [ ] **Backend Integration**: API REST para persistência
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

## 👨‍💻 **Autor**

**Felipe Caon** - Desenvolvedor de Segurança

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!**

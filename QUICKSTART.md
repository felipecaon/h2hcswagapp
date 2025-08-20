# 🚀 Início Rápido - Swags Manager Pro

**Guia rápido para começar a usar o sistema de controle de swags e camisetas em 5 minutos!**

## ⚡ **Setup Super Rápido**

### 1. **Instalação**
```bash
# Clone e instale
git clone [url-do-repo]
cd h2hc
npm install

# Execute
npm start
```

### 2. **Primeiro Acesso**
1. **Abra** `http://localhost:3000`
2. **Clique** em "Demo Data" ✨
3. **Pronto!** Dados de exemplo carregados

## 🎯 **Funcionalidades Principais**

### 👕 **Gestão de Camisetas**
- **Adicionar Quantidade**: Soma ao estoque existente
- **Registrar Distribuição**: Controle de saída para eventos
- **Alertas Inteligentes**: 
  - 🚫 Estoque acabou (0)
  - ⚠️ Estoque baixo (<10)

### 🎁 **Controle de Swags**
- **Adicionar Swag**: Nome, tipo e quantidade inicial
- **Distribuir**: Controle de saída com histórico
- **Licenças**: Nome + email obrigatórios
- **Exportar CSV**: Relatórios completos

## 📱 **Interface Mobile-First**

- **Sidebar**: Menu lateral que se adapta
- **Cards**: Interface organizada e intuitiva
- **Formulários**: Campos com validação
- **Responsivo**: Funciona em qualquer dispositivo

## 🔄 **Fluxo de Trabalho Típico**

### **Evento de Segurança**
1. **Setup**: Carregue dados de exemplo
2. **Camisetas**: Configure quantidades por sponsor
3. **Swags**: Adicione itens promocionais
4. **Distribuição**: Registre saídas durante o evento
5. **Relatórios**: Exporte histórico ao final

### **Bug Bounty Program**
1. **Licenças**: Cadastre licenças premium
2. **Participantes**: Registre ganhadores
3. **Controle**: Acompanhe distribuições
4. **Auditoria**: Exporte relatórios

## ⚙️ **Configurações Rápidas**

### **Adicionar Novo Sponsor**
```typescript
// src/components/CamisetasTab.tsx
const sponsorsDisponiveis = [
  'Bugcrowd', 'Intigriti', 'HackerOne', 
  'BugHunt', 'PortSwigger', 'SeuSponsor'
];
```

### **Novo Tipo de Swag**
```typescript
// src/types/index.ts
export interface Swag {
  tipo: 'LICENCA' | 'CANECA' | 'OUTRO' | 'SEU_TIPO';
}
```

### **Novos Tamanhos**
```typescript
// src/types/index.ts
export type TamanhoCamiseta = 'PP' | 'P' | 'M' | 'L' | 'XL' | 'XXL' | 'SEU_TAMANHO';
```

## 🎨 **Personalização Visual**

### **Cores do Sistema**
```css
/* src/index.css */
:root {
  --primary: #3b82f6;      /* Azul principal */
  --success: #10b981;      /* Verde sucesso */
  --warning: #f59e0b;      /* Amarelo aviso */
  --danger: #ef4444;       /* Vermelho erro */
  --surface: #ffffff;      /* Fundo cards */
  --border: #e5e7eb;      /* Bordas */
}
```

### **Layout Responsivo**
- **Desktop**: Sidebar sempre visível
- **Mobile**: Sidebar colapsável
- **Breakpoint**: 768px

## 🚨 **Solução de Problemas**

### **Dados não aparecem**
- Clique em "Demo Data"
- Verifique localStorage no DevTools

### **Interface quebrada**
- Recarregue a página
- Verifique console para erros

### **Mobile não funciona**
- Verifique viewport
- Teste em modo responsivo

## 📊 **Estrutura de Dados**

### **Camiseta**
```typescript
{
  id: 'M-bugcrowd',
  tamanho: 'M',
  sponsor: 'Bugcrowd',
  quantidadeInicial: 50,
  quantidadeAtual: 42,
  quantidadeDistribuida: 8
}
```

### **Swag**
```typescript
{
  id: '1',
  nome: 'Licença Caido',
  tipo: 'LICENCA',
  quantidadeInicial: 25,
  quantidadeAtual: 20,
  quantidadeDistribuida: 5
}
```

### **Distribuição**
```typescript
{
  id: '1',
  swagId: '1',
  swagNome: 'Licença Caido',
  swagTipo: 'LICENCA',
  quantidade: 1,
  nomeGanhador: 'João Silva',
  emailGanhador: 'joao@email.com',
  data: new Date()
}
```

## 🔗 **Comandos Úteis**

```bash
# Desenvolvimento
npm start          # Inicia servidor dev
npm run build      # Build para produção
npm test           # Executa testes

# Git
git add .          # Adiciona mudanças
git commit -m "feat: nova funcionalidade"
git push           # Envia para repositório
```

## 📱 **PWA Features**

- **Instalável**: Adicione à tela inicial
- **Offline**: Funciona sem internet
- **Cache**: Dados salvos localmente
- **Mobile**: Experiência nativa

## 🎉 **Próximos Passos**

1. **Explore** todas as funcionalidades
2. **Personalize** sponsors e swags
3. **Teste** em diferentes dispositivos
4. **Contribua** com melhorias
5. **Compartilhe** com a comunidade

---

**🎯 Agora você está pronto para gerenciar swags como um profissional!**

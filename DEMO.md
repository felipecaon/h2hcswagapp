# 🎬 Demonstração da Aplicação

## 🎯 Visão Geral

Esta é uma aplicação web completa para controle de swags e camisetas em eventos. A aplicação é totalmente responsiva e funciona perfeitamente em dispositivos móveis (iOS e Android).

## ✨ Funcionalidades Demonstradas

### 1. 🎽 Controle de Camisetas
- **8 tamanhos**: PP, P, M, G, GG, XL, XXL e SPONSOR
- **Controle de estoque** em tempo real
- **Distribuição diária** com subtração automática
- **Histórico** de todas as distribuições

### 2. 🎁 Controle de Swags
- **4 tipos**: Licenças, Canecas, Canetas e Outros
- **Distribuição inteligente**:
  - Licenças: obrigatório nome e email
  - Outros: controle de quantidade
- **Atualização automática** do estoque

### 3. 📊 Histórico e Relatórios
- **Filtros** por tipo e data
- **Exportação CSV** para análise externa
- **Estatísticas visuais** de distribuição

## 🚀 Como Testar

### Passo 1: Instalação
```bash
./setup.sh
npm start
```

### Passo 2: Carregar Dados de Exemplo
1. Abra a aplicação em http://localhost:3000
2. Clique em **"📊 Carregar Dados de Exemplo"**
3. Explore as funcionalidades com dados reais

### Passo 3: Testar Funcionalidades

#### 🎽 Teste de Camisetas
1. Vá para aba **Camisetas**
2. Veja o estoque atual (dados de exemplo)
3. Teste a distribuição diária
4. Observe a atualização automática do estoque

#### 🎁 Teste de Swags
1. Vá para aba **Swags**
2. Veja os swags cadastrados
3. Teste a distribuição de uma licença (com nome/email)
4. Teste a distribuição de outros itens

#### 📊 Teste de Histórico
1. Vá para aba **Histórico**
2. Aplique filtros por tipo e data
3. Teste a exportação para CSV
4. Veja as estatísticas visuais

## 📱 Teste de Responsividade

### Desktop
- ✅ Layout em grid responsivo
- ✅ Navegação por abas
- ✅ Modais para formulários

### Tablet
- ✅ Grid adaptativo
- ✅ Botões otimizados para touch
- ✅ Modais responsivos

### Smartphone
- ✅ Layout em coluna única
- ✅ Botões grandes para touch
- ✅ Navegação otimizada para mobile

## 🎨 Interface e UX

### Design System
- **Cores**: Azul (#007bff) como cor principal
- **Tipografia**: Sistema de fontes do sistema
- **Espaçamento**: Grid de 8px para consistência
- **Sombras**: Subtis para profundidade

### Componentes
- **Cards**: Para agrupamento de conteúdo
- **Botões**: Com estados hover e disabled
- **Formulários**: Com validação e feedback
- **Tabelas**: Responsivas com scroll horizontal

### Estados
- **Loading**: Para operações assíncronas
- **Success**: Confirmações de ações
- **Error**: Validações e mensagens de erro
- **Empty**: Estados vazios com ilustrações

## 🔧 Arquitetura Técnica

### Frontend
- **React 18** com TypeScript
- **Context API** para estado global
- **Hooks** para lógica de componentes
- **CSS Modules** para estilos

### Estado
- **Reducer pattern** para lógica complexa
- **LocalStorage** para persistência
- **Sincronização** automática de dados

### Performance
- **Lazy loading** de componentes
- **Memoização** de cálculos pesados
- **Otimização** de re-renders

## 📊 Dados de Exemplo

### Camisetas
- **Total inicial**: 800 unidades
- **Distribuído**: 135 unidades
- **Em estoque**: 665 unidades

### Swags
- **5 tipos diferentes** de swag
- **Licenças**: JetBrains e GitHub Pro
- **Físicos**: Canecas, canetas e stickers

### Distribuições
- **5 registros** de exemplo
- **Diferentes tipos** de swag
- **Ganhadores** para licenças

## 🎯 Casos de Uso Reais

### Evento de Sábado
1. **Manhã**: Configure 100 camisetas para levar
2. **Durante**: Registre distribuições conforme necessário
3. **Se faltar**: Suba, busque mais e registre
4. **Swags**: Distribua e capture dados dos ganhadores

### Relatórios
1. **Durante o evento**: Controle em tempo real
2. **Ao final**: Exporte histórico completo
3. **Análise**: Use dados para próximos eventos

## 🚨 Solução de Problemas

### Erros Comuns
- **Dados não persistem**: Verifique localStorage
- **Aplicação não carrega**: Execute `npm install`
- **Problemas mobile**: Teste em diferentes dispositivos

### Debug
- **Console**: Logs detalhados de operações
- **LocalStorage**: Dados salvos automaticamente
- **Estado**: Visualização do estado atual

## 🔮 Próximos Passos

### Funcionalidades Futuras
- **Backend**: API REST para persistência
- **Usuários**: Sistema de autenticação
- **Notificações**: Push notifications
- **Offline**: Funcionamento sem internet

### Melhorias
- **Temas**: Modo escuro/claro
- **Idiomas**: Suporte multi-idioma
- **Relatórios**: Gráficos e dashboards
- **Integração**: APIs externas

---

**🎉 Aplicação pronta para uso em produção!**

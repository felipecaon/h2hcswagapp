# 🎁 App de Controle de Swags

Uma aplicação web responsiva para gerenciar o controle de camisetas e swags em eventos, com funcionalidades específicas para distribuição e rastreamento.

## ✨ Funcionalidades

### 1. Controle de Camisetas
- **Cadastro de quantidade inicial** por tamanho: PP, P, M, G, GG, XL, XXL e SPONSOR
- **Interface para baixar manualmente** a quantidade diária distribuída
- **Visualização rápida** do estoque restante por tamanho
- **Controle de distribuições** com histórico automático

### 2. Controle de Swags
- **Cadastro de diferentes tipos** de swag (licenças, canecas, canetas, etc.)
- **Distribuição inteligente**:
  - Para **licenças**: obrigatório nome e email do ganhador
  - Para outros itens: controle de quantidade
- **Atualização automática** do estoque

### 3. Histórico de Distribuições
- **Rastreamento completo** de quem recebeu qual swag e quando
- **Filtros por tipo e data**
- **Exportação para CSV** para análise externa
- **Estatísticas visuais** de distribuição

## 🚀 Como Usar

### Instalação

1. **Clone o repositório**:
```bash
git clone <url-do-repositorio>
cd swags-app
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Inicie a aplicação**:
```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`

### Uso Diário

#### Configuração Inicial de Camisetas
1. Vá para a aba **Camisetas**
2. Configure as quantidades iniciais para cada tamanho
3. Clique em **"Salvar Quantidades"**

#### Distribuição Diária de Camisetas
1. Na aba **Camisetas**, use a seção "Registrar Distribuição Diária"
2. Digite a quantidade que será levada para a sala
3. Clique em **"Registrar Distribuição"**
4. O sistema automaticamente subtrai do estoque

#### Gerenciamento de Swags
1. Vá para a aba **Swags**
2. Clique em **"Novo Swag"** para adicionar itens
3. Para distribuir, clique em **"Distribuir"** no item desejado
4. Para licenças, preencha nome e email do ganhador

#### Consulta de Histórico
1. Use a aba **Histórico** para ver todas as distribuições
2. Aplique filtros por tipo ou data
3. Exporte dados para CSV quando necessário

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona perfeitamente em:
- ✅ Desktop
- ✅ Tablet
- ✅ Smartphone (iOS e Android)
- ✅ Navegadores web móveis

## 💾 Armazenamento

Os dados são salvos automaticamente no **localStorage** do navegador, garantindo:
- Persistência entre sessões
- Funcionamento offline
- Backup automático dos dados

## 🎯 Casos de Uso

### Cenário Típico de Evento
1. **Sábado de manhã**: Configure quantidades de camisetas para levar
2. **Durante o evento**: Registre distribuições conforme necessário
3. **Se faltar camisetas**: Suba, busque mais e registre no app
4. **Para swags**: Distribua e registre ganhadores (especialmente licenças)
5. **Ao final**: Consulte histórico e exporte relatórios

### Vantagens do Sistema
- **Controle em tempo real** do estoque
- **Rastreabilidade completa** de distribuições
- **Interface intuitiva** para uso rápido
- **Relatórios automáticos** para análise

## 🛠️ Tecnologias Utilizadas

- **React 18** com TypeScript
- **Context API** para gerenciamento de estado
- **CSS responsivo** com grid e flexbox
- **Lucide React** para ícones
- **Date-fns** para formatação de datas
- **LocalStorage** para persistência de dados

## 📋 Estrutura do Projeto

```
src/
├── components/
│   ├── CamisetasTab.tsx      # Controle de camisetas
│   ├── SwagsTab.tsx          # Controle de swags
│   ├── HistoricoTab.tsx      # Histórico e relatórios
│   └── ui/
│       └── Tabs.tsx          # Componente de abas
├── context/
│   └── AppContext.tsx        # Estado global da aplicação
├── types/
│   └── index.ts              # Definições TypeScript
├── App.tsx                   # Componente principal
└── index.tsx                 # Ponto de entrada
```

## 🔧 Personalização

### Adicionar Novos Tipos de Swag
Edite o arquivo `src/types/index.ts` e adicione novos tipos na interface `Swag`.

### Modificar Tamanhos de Camiseta
Edite o array de tamanhos no `AppContext.tsx` para incluir novos tamanhos.

### Alterar Estilos
Modifique o arquivo `src/index.css` para personalizar cores, fontes e layout.

## 🚨 Solução de Problemas

### Dados não persistem
- Verifique se o localStorage está habilitado no navegador
- Limpe o cache do navegador se necessário

### Aplicação não carrega
- Verifique se todas as dependências foram instaladas
- Execute `npm install` novamente

### Problemas de responsividade
- Teste em diferentes dispositivos
- Verifique se o viewport está configurado corretamente

## 📞 Suporte

Para dúvidas ou sugestões:
1. Abra uma issue no repositório
2. Descreva o problema ou funcionalidade desejada
3. Inclua screenshots se relevante

## 📄 Licença

Este projeto é de uso livre para fins educacionais e comerciais.

---

**Desenvolvido com ❤️ para facilitar o controle de swags em eventos**

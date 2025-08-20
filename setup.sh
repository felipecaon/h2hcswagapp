#!/bin/bash

echo "🎁 Configurando App de Controle de Swags..."
echo ""

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale o Node.js primeiro:"
    echo "   https://nodejs.org/"
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado. Por favor, instale o npm primeiro."
    exit 1
fi

echo "✅ Node.js e npm encontrados"
echo "📦 Instalando dependências..."

# Instalar dependências
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependências instaladas com sucesso!"
    echo ""
    echo "🚀 Para iniciar a aplicação, execute:"
    echo "   npm start"
    echo ""
    echo "📱 A aplicação estará disponível em: http://localhost:3000"
    echo ""
    echo "💡 Dicas de uso:"
    echo "   - Use a aba 'Camisetas' para controlar estoque de camisetas"
    echo "   - Use a aba 'Swags' para gerenciar outros itens"
    echo "   - Use a aba 'Histórico' para ver distribuições e exportar relatórios"
    echo ""
    echo "🎯 A aplicação é totalmente responsiva e funciona em dispositivos móveis!"
else
    echo "❌ Erro ao instalar dependências. Verifique se há problemas de conexão."
    exit 1
fi

# 🔧 Firebase Debug Guide

## Passos para resolver "Erro ao adicionar quantidade"

### 1. **Verificar Console do Navegador**
Abra o DevTools (F12) e vá para a aba Console. Procure por:
- Mensagens de erro detalhadas
- Logs de inicialização do Firebase
- Erros de configuração

### 2. **Verificar .env**
Certifique-se que seu arquivo `.env` tem valores reais (não placeholders):

```env
# ❌ ERRADO - valores placeholder
REACT_APP_FIREBASE_API_KEY=your_api_key_here

# ✅ CORRETO - valores reais
REACT_APP_FIREBASE_API_KEY=AIzaSyC...sua_chave_real
REACT_APP_FIREBASE_PROJECT_ID=seu-projeto-id
```

### 3. **Verificar Regras do Firestore**
No Firebase Console → Firestore Database → Rules:

```javascript
// Para desenvolvimento/teste
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 4. **Verificar se o Firestore está habilitado**
1. Firebase Console → Firestore Database
2. Se não existir, clique "Create database"
3. Escolha "Start in test mode"

### 5. **Verificar Network no DevTools**
1. Abra DevTools → Network
2. Tente adicionar uma camiseta
3. Procure por requisições para `firestore.googleapis.com`
4. Verifique se há erros 403, 401, etc.

### 6. **Testar Conexão**
Execute no console do navegador:
```javascript
// Verificar se as variáveis estão carregadas
console.log(process.env.REACT_APP_FIREBASE_PROJECT_ID);
```

### 7. **Erros Comuns**

#### **"Missing or insufficient permissions"**
- Regras do Firestore muito restritivas
- Solução: Usar regras de teste (allow read, write: if true)

#### **"Firebase configuration is incomplete"**
- Arquivo .env não encontrado ou com valores placeholder
- Solução: Verificar .env com valores reais

#### **"Network error"**
- Problemas de conectividade
- Projeto Firebase não existe ou foi deletado
- Solução: Verificar se o projeto existe no Firebase Console

### 8. **Logs Úteis**
O app agora mostra logs detalhados no console:
- "Initializing Firebase..."
- "Firebase initialized successfully"
- "Firestore database connection established"
- "Adding camiseta: ..."
- "Camiseta added with ID: ..."

Verifique estes logs para identificar onde o processo está falhando.

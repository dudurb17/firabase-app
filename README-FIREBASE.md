# Organização dos Arquivos do Firebase

Este projeto está organizado seguindo as melhores práticas para projetos React Native/Expo com Firebase.

## Estrutura de Pastas

```
src/
├── config/
│   └── firebase.ts          # Configuração principal do Firebase
├── services/
│   ├── auth.ts              # Serviços de autenticação
│   ├── firestore.ts         # Serviços do Firestore (banco de dados)
│   └── storage.ts           # Serviços de armazenamento de arquivos
├── hooks/
│   └── useAuth.ts           # Hook personalizado para autenticação
├── types/
│   └── firebase.ts          # Tipos TypeScript para o Firebase
├── utils/
│   └── firebase-helpers.ts  # Funções utilitárias
├── constants/
│   └── firebase.ts          # Constantes e configurações
└── index.ts                 # Arquivo de índice para exportações
```

## Como Usar

### 1. Configuração Inicial

Primeiro, atualize o arquivo `src/config/firebase.ts` com suas configurações reais do Firebase:

```typescript
const firebaseConfig = {
  apiKey: "sua-api-key-real",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "seu-app-id"
};
```

### 2. Importando Serviços

```typescript
// Importar tudo de uma vez
import { auth, db, storage, signIn, createDocument } from '../src';

// Ou importar individualmente
import { auth } from '../src/config/firebase';
import { signIn } from '../src/services/auth';
```

### 3. Exemplo de Uso

#### Autenticação
```typescript
import { signIn, signUp, logout } from '../src';

// Login
try {
  const user = await signIn('email@exemplo.com', 'senha123');
  console.log('Usuário logado:', user);
} catch (error) {
  console.error('Erro no login:', error);
}

// Cadastro
try {
  const user = await signUp('novo@exemplo.com', 'senha123');
  console.log('Usuário criado:', user);
} catch (error) {
  console.error('Erro no cadastro:', error);
}
```

#### Firestore
```typescript
import { createDocument, getDocument, getAllDocuments } from '../src';

// Criar documento
const postId = await createDocument('posts', {
  title: 'Meu Post',
  content: 'Conteúdo do post',
  author: 'user123',
  createdAt: new Date()
});

// Buscar documento
const post = await getDocument('posts', postId);

// Buscar todos os documentos
const allPosts = await getAllDocuments('posts');
```

#### Storage
```typescript
import { uploadImage, getFileURL } from '../src';

// Upload de imagem
const result = await uploadImage(imageFile, 'post-images');
console.log('URL da imagem:', result.url);

// Download de arquivo
const fileURL = await getFileURL('post-images/image.jpg');
```

### 4. Hook de Autenticação

```typescript
import { useAuth } from '../src/hooks/useAuth';

function MyComponent() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return <Text>Carregando...</Text>;
  
  if (!isAuthenticated) return <Text>Faça login</Text>;
  
  return <Text>Bem-vindo, {user?.email}!</Text>;
}
```

## Funcionalidades Incluídas

- ✅ **Autenticação**: Login, cadastro, logout, estado do usuário
- ✅ **Firestore**: CRUD completo, consultas com filtros, paginação
- ✅ **Storage**: Upload/download de arquivos, gerenciamento de pastas
- ✅ **TypeScript**: Tipos completos para todas as operações
- ✅ **Hooks**: Hook personalizado para autenticação
- ✅ **Utilitários**: Funções auxiliares para validação e formatação
- ✅ **Constantes**: Configurações centralizadas
- ✅ **Tratamento de Erros**: Try/catch em todas as operações

## Próximos Passos

1. Configure suas credenciais do Firebase no arquivo de configuração
2. Teste as funcionalidades básicas
3. Personalize os tipos e serviços conforme suas necessidades
4. Implemente regras de segurança no Firebase Console
5. Adicione validações específicas do seu projeto

## Segurança

⚠️ **Importante**: Nunca commite suas credenciais reais do Firebase no Git. Use variáveis de ambiente ou arquivos de configuração locais que não sejam versionados.

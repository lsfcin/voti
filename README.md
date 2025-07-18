# Vôti 🗳️

**Descubra sua afinidade política com deputados e senadores brasileiros**

Vôti é uma aplicação web que permite aos cidadãos brasileiros descobrirem quais políticos mais se alinham com suas opiniões, baseado em votações reais do Congresso Nacional.

## ✨ Funcionalidades

- 📊 **Questionário Interativo**: Responda perguntas simples baseadas em votações reais
- 🤖 **IA para Simplificação**: Textos complexos transformados em perguntas claras
- 📈 **Análise de Afinidade**: Veja sua compatibilidade com políticos e partidos
- 🎯 **Dados Oficiais**: Informações coletadas dos portais oficiais do Congresso
- 🔍 **Transparência Total**: Acesse detalhes de cada votação e perfil dos políticos
- 📱 **Interface Moderna**: Design responsivo e intuitivo

## 🚀 Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **API**: Next.js API Routes
- **Data Collection**: Cheerio para web scraping
- **AI**: Hugging Face (modelos gratuitos)
- **Visualização**: Recharts
- **Icons**: Lucide React

## 🛠️ Instalação

### Pré-requisitos

- Node.js 18+ 
- npm, yarn, pnpm ou bun

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/voti.git
   cd voti
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env.local
   ```
   
   Adicione sua chave da API do Hugging Face (opcional):
   ```
   HUGGINGFACE_API_KEY=sua_chave_aqui
   ```

4. **Execute o projeto**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

5. **Acesse o app**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   ├── scrape-congress/     # Coleta de dados do Congresso
│   │   └── simplify-text/       # Simplificação com IA
│   ├── questionario/            # Página do questionário
│   ├── globals.css              # Estilos globais
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página inicial
└── components/
    ├── Header.tsx               # Cabeçalho
    ├── Hero.tsx                 # Seção principal
    ├── Features.tsx             # Funcionalidades
    ├── VotingQuestion.tsx       # Componente de pergunta
    ├── ProgressBar.tsx          # Barra de progresso
    ├── QuestionnaireResults.tsx # Resultados do questionário
    ├── PoliticianCard.tsx       # Card do político
    └── PartyAffinity.tsx        # Afinidade com partidos
```

## 🎨 Design System

### Cores de Afinidade

- **Perfeita** (80-100%): Verde (#059669)
- **Alta** (60-79%): Verde claro (#10b981)  
- **Média** (40-59%): Amarelo (#f59e0b)
- **Baixa** (20-39%): Laranja (#dc2626)
- **Nenhuma** (0-19%): Vermelho (#7f1d1d)

## 📊 Fontes de Dados

- **Câmara dos Deputados**: www.camara.leg.br
- **Senado Federal**: www25.senado.leg.br
- **TSE**: Portal da Transparência
- **CNJ**: Registros de justiça

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🎯 Roadmap

- [ ] ✅ Interface básica e questionário
- [ ] 🔄 Implementar web scraping real
- [ ] 🤖 Integração completa com IA
- [ ] 👤 Perfis detalhados dos políticos
- [ ] 📱 App mobile
- [ ] 🔔 Notificações de novas votações
- [ ] 📊 Analytics e estatísticas
- [ ] 🌐 Dados de âmbito estadual e municipal

## 🆘 Suporte

Se você tiver dúvidas ou problemas:

1. Verifique as [Issues](https://github.com/seu-usuario/voti/issues) existentes
2. Crie uma nova issue se necessário
3. Entre em contato: contato@voti.app

---

**Vôti** - Democratizando o acesso à informação política brasileira 🇧🇷

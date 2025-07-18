import { promises as fs } from 'fs';
import path from 'path';

export interface VotingRecord {
  deputy: string;
  votes: Record<string, string>;
}

export interface DeputyAffinity {
  deputy: string;
  party: string;
  state: string;
  affinity: number;
  agreements: number;
  disagreements: number;
  matches: Record<string, boolean>;
}

export interface QuestionData {
  id: string;
  originalProject: ProjectDetails;
  simplifiedQuestion: string;
  options: {
    favor: string;
    contra: string;
    abstencao: string;
  };
  votingKey: string;
}

export interface ProjectDetails {
  id: string;
  title: string;
  description: string;
  author: string;
  party: string;
  state: string;
  date: string;
  status: string;
  link: string;
}

export class VotingAnalyzer {
  private votingData: VotingRecord[] = [];
  private projectsData: any[] = [];
  
  // Carrega dados de votações do CSV
  async loadVotingData(): Promise<void> {
    try {
      const csvPath = path.join(process.cwd(), 'public', 'images', 'politicians', 'deputies', 'votacoes deputados - 2022 a 2025.csv');
      const csvContent = await fs.readFile(csvPath, 'utf-8');
      
      const lines = csvContent.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      
      // Mapear dados
      this.votingData = [];
      
      for (let i = 1; i < lines.length; i++) {
        const columns = this.parseCSVLine(lines[i]);
        if (columns.length < 2) continue;
        
        const deputy = columns[0]?.replace(/"/g, '') || '';
        if (!deputy) continue;
        
        const votes: Record<string, string> = {};
        
        // Mapear votos para cada questão
        for (let j = 1; j < Math.min(columns.length, headers.length); j++) {
          const questionKey = headers[j];
          const vote = columns[j]?.replace(/"/g, '') || '';
          if (questionKey && vote) {
            votes[questionKey] = vote;
          }
        }
        
        this.votingData.push({
          deputy,
          votes
        });
      }
      
      console.log(`Dados carregados: ${this.votingData.length} deputados`);
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      this.votingData = [];
    }
  }

  // Parse manual de linha CSV (considerando vírgulas dentro de aspas)
  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let insideQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }

  // Obtém questões disponíveis para o questionário
  getAvailableQuestions(): string[] {
    if (this.votingData.length === 0) return [];
    
    const allQuestions = new Set<string>();
    
    for (const record of this.votingData) {
      Object.keys(record.votes).forEach(question => {
        if (question && question.trim()) {
          allQuestions.add(question);
        }
      });
    }
    
    return Array.from(allQuestions).filter(q => 
      q.length > 10 && // Filtra questões muito curtas
      !q.toLowerCase().includes('total') // Remove colunas de totais
    ).slice(0, 20); // Limita a 20 questões
  }

  // Gera uma questão dinâmica baseada em dados reais
  async generateDynamicQuestion(): Promise<QuestionData | null> {
    const availableQuestions = this.getAvailableQuestions();
    if (availableQuestions.length === 0) return null;
    
    // Seleciona uma questão aleatória
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const projectKey = availableQuestions[randomIndex];
    
    // Busca detalhes do projeto
    const projectDetails = await this.getProjectDetails(projectKey);
    
    if (!projectDetails) return null;

    try {
      // Usa API de LLM para simplificar
      const simplifiedData = await this.callLLMForSimplification(projectDetails);
      
      return {
        id: projectDetails.id,
        originalProject: projectDetails,
        simplifiedQuestion: simplifiedData.question,
        options: simplifiedData.options,
        votingKey: projectKey
      };
    } catch (error) {
      console.error('Erro ao simplificar projeto:', error);
      
      // Fallback: simplificação básica
      return {
        id: projectDetails.id,
        originalProject: projectDetails,
        simplifiedQuestion: this.createBasicQuestion(projectDetails),
        options: {
          favor: '👍 Sou a favor desta proposta',
          contra: '👎 Sou contra esta proposta',
          abstencao: '🤷‍♂️ Não tenho certeza sobre esta questão'
        },
        votingKey: projectKey
      };
    }
  }

  // Chama API de LLM para simplificação
  private async callLLMForSimplification(project: ProjectDetails): Promise<{
    question: string;
    options: { favor: string; contra: string; abstencao: string };
  }> {
    const prompt = `
Você é um assistente que simplifica projetos de lei brasileiros para o público geral.

PROJETO:
Título: ${project.title}
Descrição: ${project.description}
Autor: ${project.author} (${project.party}/${project.state})

TAREFA:
1. Transforme este projeto em uma pergunta simples e clara que qualquer cidadão entenda
2. Crie 3 opções de resposta: a favor, contra e abstenção

REGRAS:
- Use linguagem coloquial e acessível
- Foque no impacto real na vida das pessoas
- Mantenha neutralidade política
- Seja objetivo e direto

FORMATO DE RESPOSTA (JSON):
{
  "question": "pergunta clara e simples",
  "options": {
    "favor": "descrição da opção a favor",
    "contra": "descrição da opção contra", 
    "abstencao": "descrição da opção de abstenção"
  }
}
`;

    const apis = [
      () => this.callDeepSeekAPI(prompt),
      () => this.callHuggingFaceAPI(prompt),
      () => this.callOpenAIAPI(prompt),
      () => this.callGeminiAPI(prompt)
    ];

    for (const apiCall of apis) {
      try {
        console.log('Tentando API de simplificação...');
        const result = await apiCall();
        return result;
      } catch (error) {
        console.log('API call failed, trying next:', error);
        continue;
      }
    }

    throw new Error('Todas as APIs de LLM falharam');
  }

  // API DeepSeek
  private async callDeepSeekAPI(prompt: string): Promise<{
    question: string;
    options: { favor: string; contra: string; abstencao: string };
  }> {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error('DeepSeek API not configured');
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      return JSON.parse(content);
    } catch {
      // Se não for JSON válido, extrair informações
      return {
        question: content.split('\n')[0] || 'Pergunta sobre projeto de lei',
        options: {
          favor: 'Sou a favor desta proposta',
          contra: 'Sou contra esta proposta',
          abstencao: 'Não tenho certeza sobre esta questão'
        }
      };
    }
  }

  // API do Hugging Face (gratuita)
  private async callHuggingFaceAPI(prompt: string): Promise<{
    question: string;
    options: { favor: string; contra: string; abstencao: string };
  }> {
    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-large', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer hf_demo', // Token demo - substitua por um real em produção
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        options: { wait_for_model: true }
      })
    });

    if (!response.ok) throw new Error('Hugging Face API failed');
    
    const data = await response.json();
    
    // Parse da resposta e extração do JSON
    try {
      const text = data[0]?.generated_text || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      throw new Error('Failed to parse Hugging Face response');
    }

    throw new Error('No valid response from Hugging Face');
  }

  // API do OpenAI (tem tier gratuito)
  private async callOpenAIAPI(prompt: string): Promise<any> {
    // Implementar quando tiver chave da API
    throw new Error('OpenAI API not configured');
  }

  // API do Google Gemini (gratuita)
  private async callGeminiAPI(prompt: string): Promise<any> {
    // Implementar quando tiver chave da API
    throw new Error('Gemini API not configured');
  }

  // Busca detalhes de um projeto (mockado por enquanto)
  private async getProjectDetails(projectKey: string): Promise<ProjectDetails | null> {
    // Por enquanto, gera detalhes básicos baseados na chave
    return {
      id: this.extractProjectId(projectKey),
      title: this.extractProjectTitle(projectKey),
      description: `Projeto de lei: ${projectKey}`,
      author: 'Deputado(a)',
      party: 'Partido',
      state: 'Estado',
      date: new Date().toISOString().split('T')[0],
      status: 'Em tramitação',
      link: ''
    };
  }

  // Extrai ID do projeto da chave de votação
  private extractProjectId(votingKey: string): string {
    const match = votingKey.match(/(?:PL|PLP|PEC|MPV|PDL)\s*[NºN°]\s*(\d+\/\d+)/i);
    return match ? match[0] : votingKey.substring(0, 50);
  }

  // Extrai título do projeto da chave de votação
  private extractProjectTitle(votingKey: string): string {
    // Remove data e timestamps
    let title = votingKey.replace(/^\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}:\d{2}\s+-\s+/, '');
    
    // Limita tamanho
    if (title.length > 100) {
      title = title.substring(0, 97) + '...';
    }
    
    return title;
  }

  // Cria pergunta básica sem LLM
  private createBasicQuestion(project: ProjectDetails): string {
    const title = project.title || project.id;
    
    if (title.toLowerCase().includes('salário')) {
      return 'Você é a favor de aumentar o salário mínimo?';
    } else if (title.toLowerCase().includes('educação')) {
      return 'Você apoia investimentos em educação?';
    } else if (title.toLowerCase().includes('saúde')) {
      return 'Você é a favor de mais recursos para a saúde?';
    } else if (title.toLowerCase().includes('imposto')) {
      return 'Você concorda com mudanças nos impostos?';
    } else {
      return `Você é a favor da proposta: ${title.substring(0, 80)}${title.length > 80 ? '...' : ''}?`;
    }
  }

  // Calcula afinidade do usuário com deputados
  calculateAffinity(userAnswers: Record<string, 'favor' | 'contra' | 'abstencao'>): DeputyAffinity[] {
    const results: DeputyAffinity[] = [];
    
    for (const deputyRecord of this.votingData) {
      let agreements = 0;
      let disagreements = 0;
      let totalComparisons = 0;
      const matches: Record<string, boolean> = {};
      
      for (const [questionId, userAnswer] of Object.entries(userAnswers)) {
        const deputyVote = deputyRecord.votes[questionId];
        
        if (!deputyVote || deputyVote === 'Não votou') continue;
        
        totalComparisons++;
        
        let isAgreement = false;
        
        if (userAnswer === 'favor' && deputyVote === 'Sim') {
          isAgreement = true;
        } else if (userAnswer === 'contra' && deputyVote === 'Não') {
          isAgreement = true;
        } else if (userAnswer === 'abstencao' && (deputyVote === 'Abstenção' || deputyVote === 'Obstrução')) {
          isAgreement = true;
        }
        
        if (isAgreement) {
          agreements++;
        } else {
          disagreements++;
        }
        
        matches[questionId] = isAgreement;
      }
      
      const affinity = totalComparisons > 0 ? (agreements / totalComparisons) * 100 : 0;
      
      // Busca informações do deputado
      const deputyInfo = this.getDeputyInfo(deputyRecord.deputy);
      
      results.push({
        deputy: deputyRecord.deputy,
        party: deputyInfo?.party || '',
        state: deputyInfo?.state || '',
        affinity: Math.round(affinity),
        agreements,
        disagreements,
        matches
      });
    }
    
    return results.sort((a, b) => b.affinity - a.affinity);
  }

  // Busca informações do deputado
  private getDeputyInfo(deputyName: string): { party: string; state: string } | null {
    // Implementar busca nos dados dos deputados
    // Por enquanto retorna vazio
    return null;
  }
}

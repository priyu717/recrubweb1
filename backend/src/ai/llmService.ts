export interface ILLMService {
  analyzeTranscript(transcript: string): Promise<AIAnalysisResult>;
  matchCandidate(jobRequirements: string, candidateProfile: string): Promise<MatchResult>;
}

export interface AIAnalysisResult {
  summary: string;
  intent: string;
  sentiment: string;
  candidateInterest: string;
  skillsMentioned: string[];
  experienceYears: number | null;
  location: string | null;
  noticePeriod: string | null;
  nextAction: string;
}

export interface MatchResult {
  score: number; // 0–100
  breakdown: { skills: number; experience: number; location: number };
  recommendation: string;
}

/**
 * SimulatorLLMService generates realistic AI analysis results for Demo Mode.
 * Replace with a local Ollama / LM Studio model call for production.
 */
export class SimulatorLLMService implements ILLMService {
  async analyzeTranscript(_transcript: string): Promise<AIAnalysisResult> {
    console.log('[AI] Simulating LLM transcript analysis...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
      summary: 'The candidate expressed strong interest in the Python Developer role. They have 2.5 years of experience with Python, Django, and SQL. Currently located in Noida with a 30-day notice period. The conversation was positive and productive.',
      intent: 'INTERESTED',
      sentiment: 'POSITIVE',
      candidateInterest: 'HIGH',
      skillsMentioned: ['Python', 'Django', 'SQL'],
      experienceYears: 2.5,
      location: 'Noida',
      noticePeriod: '30 days',
      nextAction: 'Schedule Technical Interview'
    };
  }

  async matchCandidate(jobRequirements: string, candidateProfile: string): Promise<MatchResult> {
    console.log('[AI] Simulating candidate-job match scoring...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple keyword intersection simulation
    const jobWords = jobRequirements.toLowerCase().split(/[\s,]+/);
    const profileWords = candidateProfile.toLowerCase().split(/[\s,]+/);
    const intersection = jobWords.filter(w => profileWords.includes(w) && w.length > 2);
    const score = Math.min(100, Math.round((intersection.length / jobWords.length) * 100 + 30));

    return {
      score,
      breakdown: {
        skills: Math.min(100, score + 5),
        experience: Math.max(0, score - 5),
        location: 90,
      },
      recommendation: score >= 75 ? 'Strong Match' : score >= 50 ? 'Moderate Match' : 'Weak Match'
    };
  }
}

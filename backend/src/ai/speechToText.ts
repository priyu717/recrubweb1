export interface ISpeechToTextService {
  transcribeAudio(audioPath: string): Promise<TranscriptResult>;
}

export interface TranscriptResult {
  text: string;
  segments: TranscriptSegment[];
}

export interface TranscriptSegment {
  speaker: 'AGENT' | 'CANDIDATE';
  text: string;
  timestamp: number;
}

/**
 * SimulatorSpeechToTextService generates a realistic mock transcript
 * for Demo Mode. Replace with Whisper / Deepgram / AssemblyAI adapter for production.
 */
export class SimulatorSpeechToTextService implements ISpeechToTextService {
  async transcribeAudio(_audioPath: string): Promise<TranscriptResult> {
    console.log('[AI] Simulating speech-to-text transcription...');
    await new Promise(resolve => setTimeout(resolve, 1500));

    const segments: TranscriptSegment[] = [
      { speaker: 'AGENT', text: 'Hi, am I speaking with the candidate? This is a call from our recruitment team.', timestamp: 0 },
      { speaker: 'CANDIDATE', text: 'Yes, speaking. Thanks for calling!', timestamp: 4 },
      { speaker: 'AGENT', text: 'We have an exciting Python Developer role. Are you currently open to opportunities?', timestamp: 7 },
      { speaker: 'CANDIDATE', text: 'Yes, absolutely. I have around 2.5 years of experience with Python, Django, and SQL.', timestamp: 12 },
      { speaker: 'AGENT', text: 'That sounds great. What is your current location and notice period?', timestamp: 20 },
      { speaker: 'CANDIDATE', text: 'I am based in Noida. My notice period is 30 days.', timestamp: 25 },
      { speaker: 'AGENT', text: 'Wonderful. We will schedule a technical interview shortly. Thanks for your time.', timestamp: 30 },
      { speaker: 'CANDIDATE', text: 'Sure, looking forward to it!', timestamp: 36 },
    ];

    return {
      text: segments.map(s => `${s.speaker}: ${s.text}`).join('\n'),
      segments,
    };
  }
}

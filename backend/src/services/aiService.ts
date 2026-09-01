import { PrismaClient } from '@prisma/client';
import { SimulatorSpeechToTextService } from '../ai/speechToText';
import { SimulatorLLMService } from '../ai/llmService';

const prisma = new PrismaClient();
const sttService = new SimulatorSpeechToTextService();
const llmService = new SimulatorLLMService();

export const aiService = {
  /**
   * Full AI pipeline: STT → LLM Analysis → Save to DB
   */
  async analyzeCall(callId: string) {
    const call = await prisma.call.findUnique({ where: { id: callId } });
    if (!call) throw new Error('Call not found');

    // Step 1: Transcribe (simulator)
    const transcript = await sttService.transcribeAudio(call.recordingUrl || '');

    // Step 2: Save transcript
    await prisma.callTranscript.create({
      data: {
        callId,
        content: JSON.stringify(transcript.segments),
      }
    });

    // Step 3: LLM Analysis
    const analysis = await llmService.analyzeTranscript(transcript.text);

    // Step 4: Save analysis as CallAiAnalysis (store as a new model or in a JSON column for now)
    // For the MVP we update the call with the disposition and store analysis in a structured way
    await prisma.call.update({
      where: { id: callId },
      data: {
        disposition: analysis.intent === 'INTERESTED' ? 'INTERESTED' : 'NOT_INTERESTED'
      }
    });

    return { transcript, analysis };
  },

  /**
   * Match a candidate to a job requirement
   */
  async matchCandidate(candidateId: string, jobRequirements: string) {
    const candidate = await prisma.candidate.findUnique({ where: { id: candidateId } });
    if (!candidate) throw new Error('Candidate not found');

    const candidateProfile = `${candidate.skills.join(', ')}, ${candidate.experience} years`;
    const result = await llmService.matchCandidate(jobRequirements, candidateProfile);

    return result;
  }
};

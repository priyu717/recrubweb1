export interface ICallingAdapter {
  initiateCall(to: string): Promise<{ callId: string, status: string }>;
  endCall(callId: string): Promise<boolean>;
  getCallStatus(callId: string): Promise<string>;
}

export class SimulatorCallingAdapter implements ICallingAdapter {
  async initiateCall(to: string): Promise<{ callId: string, status: string }> {
    console.log(`[Simulator] Initiating call to ${to}`);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { callId: `sim_${Date.now()}`, status: 'RINGING' };
  }

  async endCall(callId: string): Promise<boolean> {
    console.log(`[Simulator] Ending call ${callId}`);
    return true;
  }

  async getCallStatus(callId: string): Promise<string> {
    // In a real adapter, this would query Twilio/Asterisk
    return 'CONNECTED';
  }
}

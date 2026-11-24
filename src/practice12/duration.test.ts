import { describe,it,expect } from 'vitest';
import { checkDuration } from './duration';
import { DEFAULT_ROOM } from '@/fixtures';

describe('Practice 12 common acceptance cases',()=>{
  it.each([
    ['T1','12:00',30,false,true,'AVAILABLE'],['T2','10:30',30,false,false,'OVERLAP'],
    ['T3','12:00',30,true,false,'BLOCKED'],['T4','12:00',0,false,false,'INVALID_DURATION'],
    ['T5','12:00',121,false,false,'INVALID_DURATION'],['T6','08:00',30,false,false,'PAST_TIME'],
    ['T7','11:00',60,false,true,'AVAILABLE'],['T8','11:00',60,false,true,'AVAILABLE'],
  ] as const)('%s: same contract',(id,startTime,duration,blocked,available,reasonCode)=>{
    const before=JSON.stringify(DEFAULT_ROOM);
    const result=checkDuration({startTime,duration,blocked});
    expect(result.available).toBe(available);expect(result.reasonCode).toBe(reasonCode);
    expect(JSON.stringify(DEFAULT_ROOM)).toBe(before);
    expect(result.existingBookings).toEqual([[600,660]]);
  });
  it.each(['','abc','<script>alert(1)</script>','x'.repeat(10000)])('rejects unsafe/malformed start %#',startTime=>{
    expect(checkDuration({startTime,duration:30,blocked:false}).reasonCode).toBe('INVALID_INPUT');
  });
  it.each(['',-1,1.5,NaN,Infinity])('rejects invalid duration %#',duration=>{
    expect(checkDuration({startTime:'12:00',duration,blocked:false}).reasonCode).toBe('INVALID_DURATION');
  });
  it('keeps the end-of-day bound',()=>expect(checkDuration({startTime:'23:30',duration:60,blocked:false}).reasonCode).toBe('INVALID_TIME'));
  it('allows exactly 120 minutes',()=>expect(checkDuration({startTime:'11:00',duration:120,blocked:false}).available).toBe(true));
});

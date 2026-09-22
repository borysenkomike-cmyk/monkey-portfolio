import { describe, expect, it } from 'vitest';
import { developers, getDeveloperById } from './developers';

describe('developer catalog', () => {
  it('contains three developers with unique ids', () => {
    expect(developers).toHaveLength(3);
    expect(new Set(developers.map(({ id }) => id)).size).toBe(3);
  });

  it('returns the matching developer by id', () => {
    expect(getDeveloperById('kikazaru').role).toBe('Backend Developer');
  });
});

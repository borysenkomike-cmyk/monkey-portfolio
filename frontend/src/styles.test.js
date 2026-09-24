import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const styles = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8');

describe('responsive profile styles', () => {
  it('centers the profile columns at tablet widths', () => {
    expect(styles).toMatch(
      /@media \(max-width: 930px\)[\s\S]*?\.profile__visual,\s*\.profile__content\s*\{[^}]*margin-inline: auto/,
    );
  });
});

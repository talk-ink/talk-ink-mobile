import {KontenbaseClient} from '@kontenbase/sdk';
// import {KONTENBASE_API_KEY} from '@env';

const apiKey: string = `${'d289610c-ebf7-4fbb-8576-31a568f184fd'}`;

export const kontenbase = new KontenbaseClient({
  apiKey,
});

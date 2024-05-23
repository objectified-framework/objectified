export class SecurityStore {
  constructor(private readonly segment: any) {
    console.log(`[SecurityStore] segment=${JSON.stringify(segment, null, 2)}`);

    // throw new Error('SecurityStore not yet implemented');
  }
}
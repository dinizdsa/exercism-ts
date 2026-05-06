export function toRna(dna: string): string {
  let arr = dna.split('');
  for (let i = 0; i < arr.length; i++) {
    if (!(arr[i] in DnaToRna)) {
      throw new Error('Invalid input DNA.');
    }
    arr[i] = DnaToRna[arr[i]];
  }
  return arr.join('');
}

// export function toRna(dna: string): string {
//   return dna.split('').map(nucleotide => {
//     if (!(nucleotide in DnaToRna)) {
//       throw new Error('Invalid input DNA.');
//     }
//     const rnaNucleotide = DnaToRna[nucleotide];
//     return rnaNucleotide;
//   }).join('');
// }


const DnaToRna: Record<string, string> = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U'
};

console.log(toRna('ACGTGGTCTTAA'));
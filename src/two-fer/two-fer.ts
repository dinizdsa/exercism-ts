export function twoFer(name: string | null = null): string {
    if (name === null) {
      return "One for you, one for me.";
    }
  
    return `One for ${name}, one for me.`;
}

console.log(twoFer());
console.log(twoFer("Alice"));
console.log(twoFer("Bob"));
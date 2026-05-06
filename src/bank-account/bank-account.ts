//
// This is only a SKELETON file for the 'Bank Account' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class ValueError extends Error {
    constructor() {
      super('Bank account error')
    }
  }
  
export class BankAccount {
    private _balance: number;
    private isOpen: boolean;
    constructor() {
      this._balance = 0;
      this.isOpen = false;
    }  

    open(): void {
      if (this.isOpen) {
        throw new ValueError();
      }
      this.isOpen = true;
      this._balance = 0;
    }
  
    close(): void {
      if (!this.isOpen) {
        throw new ValueError();
      }
      this.isOpen = false;
    }
  
    deposit(value: number): this {
      if (value < 0 || !this.isOpen) {
        throw new ValueError();
      }
      this._balance += value;
      return this;
    }
  
    withdraw(value: number): this {
      if (value > this._balance || value < 0 || !this.isOpen) {
        throw new ValueError();
      }
      this._balance -= value;
      return this;
    }
  
    get balance(): number {
      if (!this.isOpen) {
        throw new ValueError();
      }
      return this._balance;
    }
  }
  
import { describe, it, expect } from '@jest/globals'
import { calculateMonthlyTax, TradeOperation } from './tax-calculator'

describe('calculateMonthlyTax', () => {
    it('should return zero tax when total sells are under R$20k', () => {
      const ops: TradeOperation[] = [
        { type: 'buy', ticker: 'PETR4', quantity: 100, price: 30 },
        { type: 'sell', ticker: 'PETR4', quantity: 50, price: 35 },
      ];
      // total sell = 50 * 35 = R$1,750 → exempt
      const result = calculateMonthlyTax(ops, 0);
      expect(result.taxOwed).toBe(0);
    });
  
    it('should calculate tax correctly on net gain above threshold', () => {
      const ops: TradeOperation[] = [
        { type: 'buy', ticker: 'VALE3', quantity: 1000, price: 20 },
        { type: 'sell', ticker: 'VALE3', quantity: 1000, price: 25 },
      ];
      // total sell = R$25,000 → taxable
      // gross gain = (25 - 20) * 1000 = R$5,000
      // tax = 5000 * 0.15 = R$750
      const result = calculateMonthlyTax(ops, 0);
      expect(result.taxOwed).toBe(750);
    });
  
    it('should offset previous losses against current gain', () => {
      const ops: TradeOperation[] = [
        { type: 'buy', ticker: 'ITUB4', quantity: 500, price: 40 },
        { type: 'sell', ticker: 'ITUB4', quantity: 500, price: 50 },
      ];
      // gross gain = R$5,000, previous loss = R$3,000
      // taxable = 5000 - 3000 = R$2,000
      // tax = 2000 * 0.15 = R$300
      const result = calculateMonthlyTax(ops, 3000);
      expect(result.taxOwed).toBe(300);
      expect(result.carryForwardLoss).toBe(0);
    });
  });
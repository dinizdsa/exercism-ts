type OperationType = 'buy' | 'sell';

export interface TradeOperation {
  type: OperationType;
  ticker: string;
  quantity: number;
  price: number; // price per share
}

export interface TaxResult {
  grossGain: number;
  taxableGain: number;
  taxOwed: number;
  carryForwardLoss: number;
}

const TAX_EXEMPTION_THRESHOLD = 20_000;
const TAX_RATE = 0.15;

export function calculateMonthlyTax(
    operations: TradeOperation[],
    previousLoss: number = 0
  ): TaxResult {
    let averageCost = 0;
    let totalShares = 0;
    let grossGain = 0;
    let totalSellValue = 0;
  
    for (const op of operations) {
      if (op.type === 'buy') {
        // Recalculate weighted average cost
        const currentTotal = averageCost * totalShares;
        const newTotal = op.price * op.quantity;
        totalShares += op.quantity;
        averageCost = (currentTotal + newTotal) / totalShares;
      } else {
        // sell
        const gain = (op.price - averageCost) * op.quantity;
        grossGain += gain;
        totalSellValue += op.price * op.quantity;
        totalShares -= op.quantity;
      }
    }
  
    // Apply exemption: if total sells ≤ R$20k, no tax
    if (totalSellValue <= TAX_EXEMPTION_THRESHOLD) {
      return {
        grossGain,
        taxableGain: 0,
        taxOwed: 0,
        carryForwardLoss: previousLoss + (grossGain < 0 ? Math.abs(grossGain) : 0),
      };
    }
  
    // Offset previous losses against current gain
    const netGain = grossGain - previousLoss;
    const taxableGain = Math.max(0, netGain);
    const taxOwed = taxableGain * TAX_RATE;
  
    // Carry forward remaining loss if gain didn't absorb it all
    const carryForwardLoss = netGain < 0 ? Math.abs(netGain) : 0;
  
    return {
      grossGain,
      taxableGain,
      taxOwed: parseFloat(taxOwed.toFixed(2)),
      carryForwardLoss,
    };
  }
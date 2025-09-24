export namespace Finance {
  export class LoanCalculator {
    private principal: number; // Основная сумма кредита
    private annualInterestRate: number; // Годовая процентная ставка
    private loanTermInYears: number; // Срок кредита в годах

    constructor(
      principal: number,
      annualInterestRate: number,
      loanTermInYears: number
    ) {
      if (principal <= 0 || annualInterestRate < 0 || loanTermInYears <= 0) {
        throw new Error("Invalid input parameters for loan calculation.");
      }
      this.principal = principal;
      this.annualInterestRate = annualInterestRate;
      this.loanTermInYears = loanTermInYears;
    }

    /**
     * Расчет ежемесячного аннуитетного платежа.
     * @returns {number} Сумма ежемесячного платежа.
     */
    calculateMonthlyPayment(): number {
      const monthlyInterestRate = this.annualInterestRate / 12;
      const numberOfMonths = this.loanTermInYears * 12;

      // Формула аннуитетного платежа: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
      // где:
      // P - основная сумма кредита (principal)
      // i - ежемесячная процентная ставка (monthlyInterestRate)
      // n - общее количество месяцев (numberOfMonths)

      if (monthlyInterestRate === 0) {
        return this.principal / numberOfMonths; // Если процентная ставка равна 0, платеж равен основной сумме, деленной на количество месяцев
      }

      const numerator =
        monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths);
      const denominator = Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1;

      return this.principal * (numerator / denominator);
    }

    /**
     * Расчет общей переплаты по кредиту.
     * @returns {number} Сумма переплаты.
     */
    calculateTotalInterestPaid(): number {
      const monthlyPayment = this.calculateMonthlyPayment();
      const totalAmountPaid = monthlyPayment * (this.loanTermInYears * 12);
      return totalAmountPaid - this.principal;
    }

    /**
     * Получение срока кредита в месяцах.
     * @returns {number} Срок кредита в месяцах.
     */
    getLoanTermInMonths(): number {
      return this.loanTermInYears * 12;
    }
  }

  export class TaxCalculator {
    private static readonly HIGH_INCOME_THRESHOLD = 5000000; // Порог дохода для повышенной ставки
    private static readonly BASE_TAX_RATE = 0.13; // Базовая ставка (13%)
    private static readonly HIGH_TAX_RATE = 0.15; // Повышенная ставка (15%)

    /**
     * Определяет ставку налога в зависимости от дохода.
     * @param income - Сумма дохода.
     * @returns Ставка налога (в виде десятичной дроби).
     */
    public getTaxRate(income: number): number {
        if (income > TaxCalculator.HIGH_INCOME_THRESHOLD) {
            return TaxCalculator.HIGH_TAX_RATE;
        }
        return TaxCalculator.BASE_TAX_RATE;
    }

    /**
     * Рассчитывает сумму налога на доход.
     * @param income - Сумма дохода.
     * @returns Сумма налога.
     */
    public calculateTax(income: number): number {
        if (income < 0) {
            throw new Error("Доход не может быть отрицательным.");
        }
        const taxRate = this.getTaxRate(income);
        return income * taxRate;
    }
  }
}

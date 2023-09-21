class ContaBancaria {
    constructor(agencia, numero, tipo, saldo) {
      this.agencia = agencia;
      this.numero = numero;
      this.tipo = tipo;
      this._saldo = saldo; 
    }
  
   
    get saldo() {
      return this._saldo;
    }
  
    set saldo(novoSaldo) {
      if (novoSaldo >= 0) {
        this._saldo = novoSaldo;
      } else {
        console.log("Saldo não pode ser negativo.");
      }
    }
  
   
    sacar(valor) {
      if (valor <= this._saldo) {
        this._saldo -= valor;
        console.log(`Saque de R$${valor} realizado com sucesso.`);
      } else {
        console.log("Saldo insuficiente.");
      }
    }
  
    depositar(valor) {
      if (valor > 0) {
        this._saldo += valor;
        console.log(`Depósito de R$${valor} realizado com sucesso.`);
      } else {
        console.log("Valor de depósito inválido.");
      }
    }
  }
  
  class ContaCorrente extends ContaBancaria {
    constructor(agencia, numero, saldo, cartaoCredito) {
      super(agencia, numero, "conta corrente", saldo);
      this.cartaoCredito = cartaoCredito;
    }
  }
  
  class ContaPoupanca extends ContaBancaria {
    constructor(agencia, numero, saldo) {
      super(agencia, numero, "conta poupança", saldo);
    }
  }
  
  class ContaUniversitaria extends ContaBancaria {
    constructor(agencia, numero, saldo) {
      super(agencia, numero, "conta universitária", saldo);
    }
  
    sacar(valor) {
      if (valor <= 500 && valor <= this._saldo) {
        this._saldo -= valor;
        console.log(`Saque de R$${valor} realizado com sucesso.`);
      } else {
        console.log("Limite de saque para conta universitária excedido ou saldo insuficiente.");
      }
    }
  }
  
  const contaCorrente = new ContaCorrente("001", "12345", 1000, 500);
  const contaPoupanca = new ContaPoupanca("002", "67890", 2000);
  const contaUniversitaria = new ContaUniversitaria("003", "54321", 300);
  
  contaCorrente.depositar(200);
  contaCorrente.sacar(800);
  console.log("Saldo da conta corrente:", contaCorrente.saldo);
  
  contaPoupanca.depositar(300);
  contaPoupanca.sacar(500);
  console.log("Saldo da conta poupança:", contaPoupanca.saldo);
  
  contaUniversitaria.depositar(100);
  contaUniversitaria.sacar(400);
  console.log("Saldo da conta universitária:", contaUniversitaria.saldo);
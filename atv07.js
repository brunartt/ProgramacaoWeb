let saldo = 1000;
const historicoTransacoes = [];

function depositar(valor) {
  if (valor > 0) {
    saldo += valor;
    registrarTransacao("Depósito", valor);
    console.log(`Depósito de $${valor} realizado com sucesso.`);
  } else {
    console.log("Valor de depósito inválido.");
  }
}

function sacar(valor) {
  if (valor > 0 && valor <= saldo) {
    saldo -= valor;
    registrarTransacao("Saque", valor);
    console.log(`Saque de $${valor} realizado com sucesso.`);
  } else {
    console.log("Saque inválido. Verifique o saldo disponível ou o valor digitado.");
  }
}

function registrarTransacao(tipo, valor) {
  const data = new Date();
  historicoTransacoes.push({ tipo, valor, data });
}

function verSaldo() {
  console.log(`Saldo atual: $${saldo}`);
}

function verHistorico() {
  console.log("Histórico de Transações:");
  historicoTransacoes.forEach((transacao, index) => {
    console.log(`${index + 1}. Tipo: ${transacao.tipo}, Valor: $${transacao.valor}, Data: ${transacao.data}`);
  });
}

function mostrarMenu() {
  console.log("Bem-vindo ao Sistema de Conta Bancária!");
  console.log("1. Depositar");
  console.log("2. Sacar");
  console.log("3. Ver Saldo");
  console.log("4. Ver Histórico de Transações");
  console.log("5. Sair");

  const escolha = parseInt(prompt("Digite o número da opção desejada:"));
  switch (escolha) {
    case 1:
      const valorDeposito = parseFloat(prompt("Digite o valor a ser depositado:"));
      depositar(valorDeposito);
      break;
    case 2:
      const valorSaque = parseFloat(prompt("Digite o valor a ser sacado:"));
      sacar(valorSaque);
      break;
    case 3:
      verSaldo();
      break;
    case 4:
      verHistorico();
      break;
    case 5:
      console.log("Obrigado por usar o Sistema de Conta Bancária!");
      return;
    default:
      console.log("Opção inválida. Tente novamente.");
  }
  mostrarMenu();
}

mostrarMenu();
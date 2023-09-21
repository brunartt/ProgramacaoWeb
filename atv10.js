function verificaQuadradoMagico(matriz) {
    const n = matriz.length;
  
   
    const somaEsperada = (n * (n ** 2 + 1)) / 2;
  
   
    for (let i = 0; i < n; i++) {
      if (matriz[i].reduce((acc, val) => acc + val) !== somaEsperada) {
        return false;
      }
    }
  
   
    for (let j = 0; j < n; j++) {
      let somaColuna = 0;
      for (let i = 0; i < n; i++) {
        somaColuna += matriz[i][j];
      }
      if (somaColuna !== somaEsperada) {
        return false;
      }
    }
  
  
    let somaDiagonalPrincipal = 0;
    for (let i = 0; i < n; i++) {
      somaDiagonalPrincipal += matriz[i][i];
    }
    if (somaDiagonalPrincipal !== somaEsperada) {
      return false;
    }
  
   
    let somaDiagonalSecundaria = 0;
    for (let i = 0; i < n; i++) {
      somaDiagonalSecundaria += matriz[i][n - 1 - i];
    }
    if (somaDiagonalSecundaria !== somaEsperada) {
      return false;
    }
  
    return true;
  }
  
 
  const matrizQuadradoMagico = [
    [2, 7, 6],
    [9, 5, 1],
    [4, 3, 8]
  ];
  
  const matrizNaoQuadradoMagico = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  
  console.log(verificaQuadradoMagico(matrizQuadradoMagico)); 
  console.log(verificaQuadradoMagico(matrizNaoQuadradoMagico));
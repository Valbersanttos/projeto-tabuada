var botoes = document.querySelector('#botões');
var btnIniciar = document.createElement('button');
btnIniciar.textContent = 'Iniciar';
var btnProx = document.createElement('button');
btnProx.textContent = 'Próximo';
btnProx.style.float = 'right';
botoes.appendChild(btnIniciar);

btnIniciar.onclick = function(){
    var contador = document.querySelector('.contador');
    var circuloFinal = document.querySelector('circle:nth-child(2)');
    var count = 10;
    var porcent = 0
    var load
    //Animação
    function start(){
        load = setInterval(animate, 1000);
    }
    start()
    function animate(){
        if(count > 5){
            circuloFinal.style.stroke = 'rgb(3, 255, 3)';
        }
        if(count === 5){
            circuloFinal.style.stroke = 'rgb(255, 102, 0)';
        }
        if(count === 3){
            circuloFinal.style.stroke = 'rgb(255, 64, 0)';
        }
        if(count === 1 || btnIniciar.textContent == 'Iniciar'){
            clearInterval(load);
            if(btnIniciar.textContent == 'Iniciar'){
                contador.textContent = '10';
                circuloFinal.style.strokeDashoffset = '0';
                circuloFinal.style.stroke = 'rgb(3, 255, 3)';
            }else{
                circuloFinal.style.stroke = 'rgb(255, 3, 3)';
                contador.textContent = '0'
                circuloFinal.style.strokeDashoffset = '439';
            }
            
        }else{
            count--;
            contador.textContent = count;
            porcent += 43.9
            circuloFinal.style.strokeDashoffset = porcent;
        }
    }
    
    var para = document.querySelectorAll('.texto');
    var pergunta = document.querySelector('h3');

    if(btnIniciar.textContent == 'Iniciar'){
        btnIniciar.textContent = 'Parar';
        //sorteando numeros
        function sorteia(min, max){
            return Math.floor(Math.random()* (max - min + 1)) + min;
        }

        //Tabuada
        for(var i = 0; i < 4; i++){
            para[i].style.backgroundColor = ''
            para[i].textContent = para[i].textContent.slice(0,3);
        }

        var multiplicador = sorteia(1, 10);
        var multiplicado = sorteia(1, 10);
        function estrutura(){
            pergunta.textContent = multiplicador+' x '+multiplicado+' = '+'?'; 
            pergunta.style.textAlign = 'center';
            var res = multiplicador * multiplicado;
            var num = [];
            //resposta correta
            num[sorteia(0, 3)] = res;
            //Sorteando as opções
            for(var n = 0; n < 4; n++){
                var numSorteado = sorteia(res - 5, res + 5);
                while(num.indexOf(numSorteado) !== -1 || numSorteado < 1 || numSorteado > 100){
                    var numSorteado = sorteia(res - 5, res + 5);
                }
                if(num[n] == null){
                    num[n] = numSorteado;
                }
            }
            escolhaResposta(num, res, pergunta, count); 
        }

        estrutura()

        function escolhaResposta(opcoes, rescorreta, mostrar){
            var mos = mostrar.textContent.replace('?', rescorreta);
            for(var i = 0; i < para.length; i++){
                para[i].textContent += opcoes[i];
                
                para[i].addEventListener("click", e =>{
                    var opCorreta = e.target.textContent.slice(3)
                    
                    if(Number(opCorreta) === rescorreta){
                        
                        e.target.style.backgroundColor = 'rgb(3, 255, 3)';
                        mostrar.textContent = mos; 
                    }else if(Number(opCorreta) !== rescorreta){
                        e.target.style.backgroundColor = 'rgb(255, 3, 3)';
                    }
                    
                    fimJogo()
                });
            }
            proximo() 
        }

        function proximo(){
            botoes.appendChild(btnProx)
            btnProx.onclick = function(){
                clearInterval(load)
                contador.textContent = '10';
                circuloFinal.style.strokeDashoffset = '0';
                circuloFinal.style.stroke = 'rgb(3, 255, 3)';
                count = 10;
                porcent = 0;
                start()

                for(var i = 0; i < 4; i++){
                    para[i].style.backgroundColor = ''
                    
                    para[i].textContent = para[i].textContent.slice(0,3);
                }

                multiplicador = sorteia(1, 10)
                multiplicado = sorteia(1, 10)
                estrutura()
            }
        }

        function fimJogo(){
            clearInterval(load)
            contador.textContent = count;
        }
    }
    else if(btnIniciar.textContent == 'Parar'){
        btnIniciar.textContent = 'Iniciar'
        
        pergunta.textContent = ''
        for(var i = 0; i < 4; i++){
            para[i].style.backgroundColor = '';
            para[i].textContent = para[i].textContent.slice(0,3);
        }
        btnProx.parentNode.removeChild(btnProx);
        for(var i = 0; i < para.length; i++){
            para[i].addEventListener('click', e =>{
                e.target.style.backgroundColor = ''
                contador.textContent = '10';
            })
        }
    }  
}
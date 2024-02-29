// script.js

function destacarTarefas() {
    // Obter a hora atual (apenas horas, sem minutos)
    var agora = new Date();
    var horaAtual = agora.getHours();
    var diaSemanaAtual = agora.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

    console.log("Hora Atual:", horaAtual);
    console.log("Dia da Semana Atual:", diaSemanaAtual);

    // Selecionar todas as tarefas
    var tarefas = document.querySelectorAll('.tarefa');

    // Remover destaque de todas as tarefas
    tarefas.forEach(function(tarefa) {
        tarefa.classList.remove('destacada');
    });

    // Destacar a linha correspondente ao horário atual
    var linhas = document.querySelectorAll('.linha');
    var linhaDestacada = null;

    for (var i = 0; i < linhas.length; i++) {
        var horarioDiv = linhas[i].querySelector('.horario');
        if (horarioDiv) {
            var horarioTexto = horarioDiv.textContent.trim();
            var horario = parseInt(horarioTexto.split(':')[0], 10);

            console.log("Horário Div:", horario);

            if (horaAtual === horario) {
                linhaDestacada = linhas[i];
                break;
            }
        }
    }

    if (!linhaDestacada) {
        // Se não encontrar o horário atual, tenta o horário anterior
        var horarioAnterior = horaAtual - 1;
        for (var j = 0; j < linhas.length; j++) {
            var horarioDivAnterior = linhas[j].querySelector('.horario');
            if (horarioDivAnterior) {
                var horarioTextoAnterior = horarioDivAnterior.textContent.trim();
                var horarioAnteriorDiv = parseInt(horarioTextoAnterior.split(':')[0], 10);

                if (horarioAnterior === horarioAnteriorDiv) {
                    linhaDestacada = linhas[j];
                    break;
                }
            }
        }
    }

    // Remover destaque da linha anterior (se existir)
    linhas.forEach(function(linha) {
        linha.classList.remove('destacada');
        linha.querySelectorAll('.tarefa').forEach(function(tarefa) {
            tarefa.classList.remove('destacada');
        });
    });

    // Destacar a linha encontrada e sua tarefa correspondente ao dia da semana
    if (linhaDestacada) {
        linhaDestacada.classList.add('destacada');
        var tarefaDiaAtual = linhaDestacada.querySelector('.tarefa.' + obterClasseDia(diaSemanaAtual));
        if (tarefaDiaAtual) {
            tarefaDiaAtual.classList.add('destacada');
        }
    }
}

function obterClasseDia(diaSemana) {
    switch (diaSemana) {
        case 0:
            return 'domingo';
        case 1:
            return 'segunda';
        case 2:
            return 'terca';
        case 3:
            return 'quarta';
        case 4:
            return 'quinta';
        case 5:
            return 'sexta';
        case 6:
            return 'sabado';
        default:
            return '';
    }
}

// Chamar a função quando a página carrega
window.onload = function() {
    destacarTarefas();
};

// Chamar a função a cada minuto
setInterval(function() {
    destacarTarefas();
}, 60000); // 60000 milissegundos = 1 minuto
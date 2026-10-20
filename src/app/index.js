// =====================================
// index.js - Qual é a boa?
// =====================================

// ETAPA INICIAL - TRAZER A FERRAMENTAS (import)
import {useState, useEffect } from "react";
// View -> uma caixa, serve para agrupar e organizar as coisas
// Text -> Todo texto precisa estar dentro de um <text>
// TextInput -> um campo para digitar
// pressable -> qualquer coisa que dá pra tocar: nosso botão
// StyleSheet -> ferramenta pra escrever os estilos.
import {View, Text, TextInput, Pressable, ScrollView, StyleSheet } from "react-native";
import { cores } from "../data/tema"
import { Accelerometer } from "expo-sensors";
import * as Haptics from "expo-haptics";

const LIMITE_DE_FORCA = 1.8;
const TEMPO_ENTRE_SORTEIOS = 1000; //milissegundos: 1000 = 1 segundo

// ETAPA 01 - CRIAR A TELA 

export default function Home(){
    //começa com 3 opçoes para já ter o que sortear
    const [opcoes, setOpcoes] = useState(["Pizza", "Hambúrger", "Sushi"]);    
    // A opção que foi sorteada. Começa vazia ("")porque ainda não sorteou
    const [resultado, setResultado] = useState("");
    // O que a pessoa está digitando no campo. neste caso começa vazio.
    const [textoDigitado, setTextoDigitado] = useState("")

    // FUNÇÃO SORTEAR
    function sortear(){
        if (opcoes.length < 2){
            setResultado("Adcione pelo menos 2 opções!");
            return;
        }

        // Como sortear uma posição da lista:
        // 1) Math.random() - número aleatórios entre 0 e 1
        // 2) x opcoes.length - multiplica pelo tamanho da lista
        // 3) Math.floor() - arredonda para Baixo
        const posicao = Math.floor(Math.random() * opcoes.length);

        //opcoes[2] pega o item que está na posição 2 da lista
        const opcaoSorteada = opcoes[posicao];
        setResultado(opcaoSorteada) //aqui ele guarda no useState a tela atualizada!

        //aqui faz o celular vibrar avisando que saiu o resultado
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }

    //FUNÇÃO DE ADCIONAR UMA OPÇÃO
    function adicionar(){
        //trim: retira os espaços do fim e do começo
        const nome = textoDigitado.trim();

        if (nome === "") {
            return; //campo vazio? ----> Não adiciona NADA!
        }

        // Aqui criamos uma nova lista, com tudo o que já tinha + o nome novo
        const listaNova = [...opcoes, nome];
        setOpcoes(listaNova);
        setTextoDigitado("");// limpa o campo para digitar a próxima.
    }

    // FUNÇÃO DE REMOVER UMA OPÇÃO
    function remover(nomeParaRemover){
        
        const listaNova = opcoes.filter((opcao) => opcao !== nomeParaRemover);
        setOpcoes(listaNova);
    }

    // SORTEAR AO CHACOALHAR 
    // Nós vamos usar aqui o useEffect, e o sensor
    // useEffect = "faça isto DEPOIS que a tela aparecer"
    // usamos para LIGAR o sensor, e para DELIGAR quando a tela sair
    useEffect(() =>{
        //aqui pede ao sensor para medir a cada 100 milisegundos (10x por segundo)
        Accelerometer.setUpdateInterval(100);

        // Guarda a hora do ultimo sorteio, para não sortear 10 vezes
        // Começa com zero (numca sorteou)
        // let (e não const) porque este valor vai mudar
        let horaDoUltimoSorteio = 0;

        //addlistener = "Me avise toda vez que o sensor medir algo novo"
        //"dados" chega com as medidas: dados.x, dados.y e dados.z
        const sensor = Accelerometer.addListener((dados) => {
            //math.hypot junta x, y e z num número só: a FORÇA TOTAL
            const forca = Math.hypot(dados.x, dados.y, dados.z);
            const agora = Date.now();
            const tempoPassado = agora - horaDoUltimoSorteio;

            //1 - chacoalhou forte (forca maior que o limite)
            //2 - ja passou tempo suficiente desde o ultimo sorteio
            if (forca > LIMITE_DE_FORCA && tempoPassado > TEMPO_ENTRE_SORTEIOS){
                horaDoUltimoSorteio = agora;
                sortear();
            }

        });
        // a função é devolvida aqui é a "LIMPEZA": roda quando a tela sai.
        // Desliga o sensor (como apagar a luz ao sair do quarto)
        return () => sensor.remove();
        //[opcoes] diz: "religue o sensor sempre que a lista mudar"
    }, [opcoes]);

    // PARA REALIZAÇÃO DO TESTE npx expo start, depois pressione "a"
    // https://dontpad.com.br/senai-dsii2sesi

    //AGORA VAMOS COMEÇAR A DESENHA A TELA --> JSX
    //

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
        <Text style={styles.titulo}>Qual é a boa? 🎲</Text>
        <Text style={styles.subtitulo}>Monte a lista e chacoalhe o celular</Text>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: cores.fundo },
    conteudo: { padding: 20, paddingTop: 60, paddingBottom: 40 },

    titulo: { fontSize: 30, fontWeight: "bold", color: cores.textoPrincipal },
    subtitulo: { fontSize: 15, color: cores.textoSecundario, marginTop: 4, marginBottom: 24 },
});
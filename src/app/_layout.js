//==============================================      
// A "MOLDURA" que envolve todas as telas do app
//===============================================


//conceito: IMPORT 
//"import" trazpara ca uma ferramenta que outra pessoa ja criou 

//stack:"pilha de telas". Quando o app tem varias telas, uma abre por cima da outra, comocartas empilhadas. Vem do pacote expo-router 
import{stack} from "expo-router";

//Statusbar = barra la em cima do celular (relogio, bateria, sinal)
import { StatusBar } from "expo-status-bar";

// CONCEITO
// NO React native, cada pedaço de tela é um componente.
// Um componente é só uma FUNÇÃO que devolve (return) o que aparece.

// essa função default é a função principal deste arquivo, é assim que o Expo Router encontra o layout
export default function layout() {
    return (
        <>
            {/* StatusBar: style="light" deixa o relógio e bateria brancos */}
            <StatusBar style="light"/>
            {/* Stack: a pilha de telas */}
            {/* ScreenOptions: opções que valem para todas telas */}
            {/* headerShown: esconde a barra de titulo que o expo coloca no topo por padrão */}
            <Stack screenOptions={{ headerShown: false}}/>
        </>
    );
}
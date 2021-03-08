import React from 'react';

import db from '../../db.json';
import QuizLogo from '../../src/components/QuizLogo/index'
import Widget from '../../src/components/Widget/index'
import QuizBackground from '../../src/components/QuizBackground/index'
import QuizContainer from '../../src/components/QuizContainer/index'
import AlternativesForm from '../../src/components/AlternativesForm/index'
import Button from '../../src/components/Button/index'

function ResultWidget({ results }) {
    return (
     <Widget>
     <Widget.Header>
       Tela de Resultado:
     </Widget.Header>
 
     <Widget.Content>
       <p> 
            Você acertou 
           {' '}
           {results.reduce((somatoriaAtual, resultAtual) => {
               const isAcerto =  resultAtual === true;
               if (isAcerto) {
                   return somatoriaAtual + 1
               }

               return somatoriaAtual;
           }, 0)} {/* 0 é de onde começamos à contar*/}
           {/* Outra maneira de fazer, substituindo o reduce:
                {results.filter((x) => x).length}
           */}
            {' '}
            perguntas 
        </p>
       <ul>
            {results.map((result, index) => (
                    <li key={`result__${result}`}>
                        #{index + 1} {' '} Resultado: {' '}
                        {result === true
                        ? 'Acertou'
                        : 'Errou'}
                    </li>
            ))}
       </ul>
     </Widget.Content>
   </Widget>
    );
 }

function LoadingWidget() {
   return (
    <Widget>
    <Widget.Header>
      Carregando...
    </Widget.Header>

    <Widget.Content>
      [Desafio do Loading]
    </Widget.Content>
  </Widget>
   );
}
                            // Não importa a ordem dos argumentos
function QuestionWidget( {question,  questionIndex, totalQuestions, onSubmit, addResult,}) {

    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
    const questionId = `question__${questionIndex}`;
    const isCorrect = selectedAlternative === question.answer;
    const hasAlternativeSelected = selectedAlternative !== undefined;
    
    return (
        <Widget>
        <Widget.Header>
              {/* <BackLinkArrow href="/" /> */}
              <h3>
                  {`Pergunta ${questionIndex + 1}  de ${totalQuestions}`}
              </h3>
        </Widget.Header>
         
         <img 
             alt="Descrição"
             style={{
               width: '100%',
               height: '150px',
               objectFit: 'cover',
             }}
              src={question.image}
         />
        <Widget.Content>
              <h2>
                  {question.title}
              </h2>

              <p>
                  {question.description}
              </p>

             <AlternativesForm onSubmit={(infosDoEvento) => {
                       infosDoEvento.preventDefault();
                       setIsQuestionSubmited(true);
                       setTimeout(() => {
                            addResult(isCorrect);
                            onSubmit();
                            setIsQuestionSubmited(false);
                            setSelectedAlternative(undefined);
                       }, 3 * 1000);
             }}>

                  {question.alternatives.map( (alternative, alternativeIndex) => {
                            const alternativeId = `alternative__${alternativeIndex}`;
                            const alternativeStatus =  isCorrect ? 'SUCCESS' : 'ERROR';
                            const isSelected = selectedAlternative === alternativeIndex;
                            return (
                                    <Widget.Topic as="label" 
                                                  key={alternativeId}
                                                  htmlFor={alternativeId}
                                                  data-selected={isSelected}
                                                  data-status={isQuestionSubmited && alternativeStatus}
                                    >

                                        <input style={{display: 'none'}}
                                               id={alternativeId}
                                               name={questionId}
                                               onChange={() => setSelectedAlternative(alternativeIndex)}
                                               type="radio"/>

                                        {alternative}
                                    </Widget.Topic>
                            );
                        })}

                    <Button type="submit" disabled={!hasAlternativeSelected}>
                        Confirmar
                    </Button>
                     { isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
                     { isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
              </ AlternativesForm>
        </Widget.Content>
    </Widget>
  
    );
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT'
};

export default function QuizPage(){
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const [results, setResults] = React.useState([]); 
    const totalQuestions =  db.questions.length;
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];

    // Para não sobrescrever o total de respostas
    function addResult(result) {
        // A linha de código abaixo é o mesmo que fazer --> results.push(result); e depis armazenar o results no setResults()
        // O problema é que o React não reconhece essa atualização feita pelo push no ciclo de vida do componente
        setResults([...results, result]);
    }

    // Efeitos do ciclo de vida da atualização de um componente.
    // O setTimeoute vai mudar depois de um segundo o Hook de LOADING para QUIZ.
    // Com o useEffect só executa 1 vez, diferente do setTimeout que sozinho executaria em loop infinito,
    // renderizando a mesma página de QUIZ.
    React.useEffect(() => {
        // fetch()...
            setTimeout(() => {  
                setScreenState(screenStates.QUIZ); 
            }, 1 * 1000);
    }, []);
   
    function handleSubmitQuiz() {
        const nextQuestion = questionIndex + 1;
        if ( nextQuestion < totalQuestions){
            setCurrentQuestion(nextQuestion);
        }else {
            setScreenState(screenStates.RESULT);
        }
    }

    return (
        <QuizBackground backgroundImage={db.bg}>
          <QuizContainer>
            <QuizLogo />
            {screenState ===  screenStates.QUIZ && (
                     <QuestionWidget 
                     question={question}
                     questionIndex={questionIndex}
                     totalQuestions={totalQuestions}
                     onSubmit={handleSubmitQuiz} 
                     addResult={addResult}
                     />
            )}
            
            {screenState === screenStates.LOADING  &&  <LoadingWidget />}

            {screenState === screenStates.RESULT &&  <ResultWidget results={results}/>}
             
          </QuizContainer>
        </QuizBackground>
      );
    }
    

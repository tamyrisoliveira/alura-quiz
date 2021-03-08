import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import db from '../db.json';

import QuizLogo from '../src/components/QuizLogo/index'
import Widget from '../src/components/Widget/index'
import Link from '../src/components/Link/index'
import QuizBackground from '../src/components/QuizBackground/index'
import Footer from '../src/components/Footer/index'
import GitHubCorner from '../src/components/GitHubCorner/index'
import Input from '../src/components/Input/index'
import Button from '../src/components/Button/index'

//  const BackgroundImage = styled.div`
//      background-image: url(${db.bg});
//      flex: 1;
//      background-size: cover;
//      background-repeat: no-repeat;
//      background-position: center;
//  `;

const QuizContainer = styled.div`
    width: 100%;
    max-width: 350px;
    padding-top: 45px;
    margin: auto 10%;
    @media screen and (max-width: 500px) {
      margin: auto;
      padding: 15px;
    }
`;


        // Essa função representa a página
export default function Home() {
  const router = useRouter(); // todos os hooks precisam estar no começo
  const [name, setName] = React.useState('');// Definindo o estado inicial do input
// desestruturando o useState --> [name, setName], name é igual ao valor passado nos () do useState
// o valor do setName é uma função que vai fazer a mudança de estado

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>AluraQuiz</title>
      </Head>
      <QuizContainer>
          <QuizLogo />
          <Widget
            as={motion.section}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' },
            }}
            initial="hidden"
            animate="show"
          >
              <Widget.Header>
                  <h1>Ice Skating Quiz</h1>
              </Widget.Header>
               
              <Widget.Content>
                <form onSubmit={(infosDoEvento) => {
                        infosDoEvento.preventDefault();
                        
                        // const router = useRouter();
                        router.push(`/quiz?name=${name}`);
                        console.log('Fez uma submissão pelo React');

                        // router manda para próxima página
                      }}>

                    <p> Teste o quanto você sabe sobre a patinação artística no gelo. Go!</p>
                    
                    <Input  name="nomeDoUsuario"
                            onChange={(infosDoEvento) => {
                                // console.log(infosDoEvento.target.value);
                                // State
                                // name = infosDoEvento.target.value; // target se refere á própria tag
                                setName(infosDoEvento.target.value);
                            }} 
                            placeholder="Diz aí seu nome :)"
                            value={name} />

                    <Button type="submit" disabled={name.length === 0}>
                      {`Jogar ${name}`}
                    </Button>
                </form> 
              </Widget.Content>
          </Widget>

          <Widget
               as={motion.section}
               transition={{ delay: 0.5, duration: 0.5 }}
               variants={{
                 show: { opacity: 1 },
                 hidden: { opacity: 0 },
               }}
               initial="hidden"
               animate="show"
          >
            <Widget.Content>
               <h1> Quizes da Galera</h1>
                
                <ul>
                {db.external.map((linkExterno) => {
                        const [projectName, githubUser] = linkExterno
                            .replace(/\//g, '')
                            .replace('https:', '')
                            .replace('.vercel.app', '')
                            .split('.');

                      return (
                        <li key={linkExterno}>
                          <Widget.Topic 
                            as={Link}
                            href={`/quiz/${projectName}___${githubUser}`}
                          >
                            {` ${githubUser}/${projectName} `}
                          </ Widget.Topic>
                        </li>
                      );
                })}
                </ul>
            </Widget.Content>
          </Widget>
          <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/tamyrisoliveira"/>
    </QuizBackground>
  );
}

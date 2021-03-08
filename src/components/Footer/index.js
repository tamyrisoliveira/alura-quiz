import styled from 'styled-components'

// src/components/Footer/index.js
const FooterWrapper = styled.footer`
  background-color: #00000070;
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 4px 4px 0 0; 
  img {
    width: 58px;
    margin-right: 23px;
  }
  a {
    color: white;
    text-decoration: none;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
    span {
      text-decoration: underline;
    }
  }
`;

const FairUse = styled.div`
      background-color: #00000070;
      border-radius: 0 0 4px 4px ; 
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      font-size: 14px;

      small {
        text-align: center;
        margin: auto;
      }

      a {
        color: white;
      }
`;

export default function Footer(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div>
    <FooterWrapper {...props}>
      <a href="https://www.alura.com.br/">
        <img src="https://www.alura.com.br/assets/img/alura-logo-white.1570550707.svg" alt="Logo Alura" />
      </a>
      <p>
        Orgulhosamente criado durante
        {' '}
        a
        {' '}
        <a href="https://www.alura.com.br/">
          <span>Imersão React da Alura</span>
        </a>
      </p>
    </FooterWrapper>
      
    <FairUse>
      <small> Projeto apenas para fins educacionais sem fins lucrativos, todos os direitos de imagem estão reservadas aos autores.</small>
      
      <small> 
           Photo:
        {' '}
         <a href="https://www.usfigureskating.org/sites/default/files/media-library/Privacy%20Policy%20Page%20Header%20Image.jpg"
            target="_blank"
         > 
            U.S Figure Skating
         </a>
      </small>
    </FairUse>  
    </div>
  );
}
import db from '../../db.json';

// Essa é uma API para exportar os dados do nosso quiz em json para quem quiser acessar
export default function dbHandler(request, response) {
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  response.json(db);
}



// Esse arquivo é um Lambida Server, que serve para exportar uma função.
// O Next.js é quem permite criar esse tipo de arquivo servidor no nosso projet.

// As linhas 5 a 12 antes do db, é uma configuração de segurança para tornar a API pública.
// Essa configuração (passando esses cabeçalhos na requisição) serve para avisar ao browser que 
// permitimos essa requisição sair do nosso endereço(url) e também acessar outras urls , ou seja,
//  um caminho que não está dentro da nossa url.

//Agora qualquer pessoa pode pegar a url do end point desse projeto.
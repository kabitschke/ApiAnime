'use client'
import { ApiNaruto } from '@/app/api/apiAnime';
import styles from '@/app/page.module.css';
import React from 'react';

type Naruto = {
  id: number;
  name: string;
  images: string[];
  debut: object[];
  family: object[];
  jutsu: string[];
  natureType: string[];
  personal: object[];
  rank: object[];
  tools: string[];
  voiceActors: object[];
  uniqueTraits: string[];
};

type Characters = {
  characters: Naruto[];
  pageSize: number;
  totalCharacters: number;
  currentPage: number;
}


export default function ListaNaruto() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [characters, setCharacters] = React.useState<Naruto[]>([]);
  const [pageSize, setPageSize] = React.useState(20);
  const [totalCharacters, setTotalCharacters] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const totalPages = Math.ceil(totalCharacters / pageSize);

async function gridAnime(){
  try{
    setLoading(true);
    const data:Characters = await ApiNaruto(currentPage);
    setCharacters(data.characters);
    setPageSize(data.pageSize);
    setTotalCharacters(data.totalCharacters);
  }catch(error){
    console.error('Erro ao buscar os dados', error);
  }finally{
    setLoading(false);
  }  
  
}


  React.useEffect(() => {
    gridAnime();// Busca os personagens da página atual
  }, [currentPage]);


function handlePreviousPage() {
  if(currentPage === 1)return;
  setCurrentPage(currentPage -1);
}

function handleNextPage(){
  if(currentPage === totalPages)return;
    setCurrentPage(currentPage +1);
}


  return (
    <div className={styles.narutoContainer}>
      <div className={styles.narutoArea}>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          characters.map((el) => (
            <div key={el.id} className={styles.characterCard}>
              <h3>{el.name}</h3>
              {el.images.length > 0 ? (
                <img src={el.images[0]} alt={el.name} />
              ) : (
                <p>Imagem não disponível</p>
              )}
            </div>
          ))
        )}
      </div>

      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage} de {Math.ceil(totalCharacters / pageSize)}</span>

        <div className={styles.squareArea}>

          
        </div>

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Próximo</button>
      </div>

  

    </div>

  );
}

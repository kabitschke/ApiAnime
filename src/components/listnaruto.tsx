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

  async function gridAnime() {
    try {
      setLoading(true);
      const data: Characters = await ApiNaruto(currentPage);
      setCharacters(data.characters);
      setPageSize(data.pageSize);
      setTotalCharacters(data.totalCharacters);
    } catch (error) {
      console.error('Erro ao buscar os dados', error);
    } finally {
      setLoading(false);
    }

  }


  React.useEffect(() => {
    gridAnime();// Busca os personagens da página atual
  }, [currentPage]);


  // function handlePreviousPage() {
  //   if (currentPage === 1) return;
  //   setCurrentPage(currentPage - 1);
  // }

  // function handleNextPage() {
  //   if (currentPage === totalPages) return;
  //   setCurrentPage(currentPage + 1);
  // }

  function Pagination() {
    const pages = [];
    const margem = 5;  // Define as margens de 5 páginas
  
    let start = 1;
    let end = 1;
  
    // Se o currentPage for maior que 4, começa a calcular para exibir as 5 páginas anteriores e 5 páginas posteriores
    if (currentPage >= margem) {
      start = Math.max(1, currentPage - margem);  // 5 páginas anteriores
      end = Math.min(totalPages, currentPage + margem);  // 5 páginas posteriores
    }    
    // Para as páginas 1 a 4, exibe até a página 10
    if (currentPage < margem) {
      end = Math.min(totalPages, margem * 2);  // Exibe até a página 10 ou o total de páginas
    }
    // Para as páginas maiores que totalPages - margem * 2, ajusta o start para mostrar as últimas páginas
    if (currentPage >= totalPages - margem) {
      start = Math.max(1, totalPages - margem * 2); // Exibe as últimas páginas, até 5 páginas antes da última
      end = totalPages;  // Até a última página
    }
  
    for (let i = start; i <= end; i++) {
      pages.push(
        <div
          key={i}
          className={styles.square}
          style={{
            backgroundColor: i === currentPage ? '#007bff' : '#fff',
            color: i === currentPage ? '#fff' : '#000',
          }}
          onClick={() => onPageChange(i)}
        >
          {i}
        </div>
      );
    }
  
    return pages;
  }
  
  function onPageChange(i: number) {
    setCurrentPage(i);
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
        {/* <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button> */}
        {/* <span>Página {currentPage} de {Math.ceil(totalCharacters / pageSize)}</span> */}

        <div className={styles.squareArea}>
          {Pagination()}

        </div>

        {/* <button onClick={handleNextPage} disabled={currentPage === totalPages}>Próximo</button> */}
      </div>



    </div>

  );
}

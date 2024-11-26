'use client'
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
  currentPage: number;
  pageSize: number;
  totalCharacters: number;
};

export default function ListaNaruto() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [characters, setCharacters] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(20);
  const [totalCharacters, setTotalCharacters] = React.useState(1);
  const [loading, setLoading] = React.useState(false);



  async function ApiNaruto(page: number) {
    try {
      setLoading(true);
      const response = await fetch(`https://narutodb.xyz/api/character/?page=${page}`);
      const data = (await response.json());
      setCharacters(data.characters);
      setCurrentPage(data.currentPage);
      setPageSize(data.pageSize);
      setTotalCharacters(data.totalCharacters);
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    ApiNaruto(currentPage);// Busca os personagens da página atual
  }, [currentPage]);





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

    </div>

  );
}

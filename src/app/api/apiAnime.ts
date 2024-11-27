export async function ApiNaruto(page: number) {       
      const response = await fetch(`https://narutodb.xyz/api/character?page=${page}`);      
      return (await response.json());
  };
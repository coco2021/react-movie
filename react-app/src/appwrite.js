import { Client, Databases, ID, Query } from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;


// test
// export const updateSearchCount = async () => {
//   console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID); 
// }

const client = new Client()
  .setEndpoint('https://sfo.cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);


const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {

  
  try {
    //1. use Appwrite sdk (api) to check if the search term exists in the database
    const queries =[Query.equal('searchTerm', searchTerm)];
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, queries);

    if(result.documents.length > 0){
      //2. if it doesn, update the count
      const doc = result.documents[0];

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {count:doc.count+1});

    }else{
      //3. if it doesn't, create a new document with the search term and count as 1
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id:movie.id,

        //https://developer.themoviedb.org/docs/image-basics?utm_source=chatgpt.com
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    });
    
    }

  } catch (error) {
  
    //  
  }




  

}

export const getTrendingMovies = async () => {

  try{

    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('count'),
    ]);

    return result.documents;

  } catch(error){
    console.error(error);
  }
}

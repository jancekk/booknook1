export interface Book {
    id: string;
    author: string;
    text: string;
    genre: Genre;
    description: string;
    imageUrl: string;
    userId: string;
    review: string;
    stars: string;
    
}

export enum Genre {
    Fiction = 'Fiction',
    NonFiction = 'Non-Fiction',
    Fantasy = 'Fantasy',
    ScienceFiction = 'Science Fiction',
    Mystery = 'Mystery',
    Romance = 'Romance',
    Thriller = 'Thriller',
    Biography = 'Biography',
    History = 'History',
    SelfHelp = 'Self-Help',
    Philosophy = 'Philosophy',
    Drama = 'Drama',
    AllBooks = 'All Books'
}


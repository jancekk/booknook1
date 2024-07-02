import { Book } from "./book.model";


export class BooksService {
    books: Book[] = [new Book('The Bell Jar', 'Sylvia Plath', '"The Bell Jar" by Sylvia Plath is a semi-autobiographical novel that explores the mental unraveling of Esther Greenwood, a talented young woman navigating the pressures of 1950s society. As Esther pursues her dreams in New York City, she grapples with the expectations of femininity, ambition, and mental health. Plath\'s vivid prose delves into Esther\'s descent into depression and her journey through various forms of treatment, ultimately painting a poignant portrait of a mind at odds with its surroundings. The novel remains a powerful reflection on the complexities of identity and the challenges faced by women in a patriarchal world.', 'fiction'), 
    new Book('Kitchen', 'Banana Yoshimoto', '"Kitchen" by Banana Yoshimoto is a novella that delicately intertwines themes of grief, love, and transformation. Following the lives of two young protagonists, Mikage and Yuichi, it explores their personal journeys through loss and the solace found in food and companionship. Yoshimoto\'s poignant narrative evokes a sense of emotional resonance and quiet resilience, making "Kitchen" a touching exploration of human connection and healing.', 'fiction')];
    
    addBook(book: Book): void {
        this.books.push(book);
      }

}
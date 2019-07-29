package book.server.model;

import book.server.entity.Book;
import lombok.Data;

@Data
public class BookModel extends Book {

    private String tagName;


}

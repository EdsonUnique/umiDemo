package book.server.model;

import book.server.entity.Book;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookModel extends Book {

    private String tagName;

    private LocalDateTime viewBookDate;
}

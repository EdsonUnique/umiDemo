package book.serverMobile.model;

import book.entity.Book;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookModel extends Book {

    private String tagName;

    private LocalDateTime viewBookDate;
}

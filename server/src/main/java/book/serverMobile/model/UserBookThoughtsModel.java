package book.serverMobile.model;

import book.entity.UserBookThoughts;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserBookThoughtsModel extends UserBookThoughts {

    private String nickname;

}

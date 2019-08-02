package book.server.model;

import book.server.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserModel extends User {

    private String genderStr;

    private String age;

    public String getGenderStr() {

        return super.getGender().equals(0)?"女":"男";
    }

    public String getAge() {

        return Integer.valueOf(LocalDate.now().getYear()-super.getBirth().getYear()).toString();
    }
}

package book;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@SpringBootApplication
@ServletComponentScan
@MapperScan({
        "book.serverMobile.modelMapper",
        "book.entityMapper",
        "book.serverAdmin.modelMapper",
        "book.serverAdmin.entityMapper"
})
public class ServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    //前端String转LocalDateTime
//        @Bean
//        public ObjectMapper serializingObjectMapper() {
//
//            JavaTimeModule module = new JavaTimeModule();
//        LocalDateTimeDeserializer localDateTimeDeserializer = new LocalDateTimeDeserializer(
//                DateTimeFormatter.ofPattern("yyyy - MM - dd"));
//        module.addDeserializer(LocalDateTime.class, localDateTimeDeserializer);
//        ObjectMapper objectMapper = Jackson2ObjectMapperBuilder.json()
//                .modules(module)
//                .featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
//                .build();
//        return objectMapper;
//    }

}

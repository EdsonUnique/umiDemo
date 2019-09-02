package book.utils;

import book.exceptions.MyException;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

public class UploadFileToDisk {

    public static String writeToUploadFiles(MultipartFile data,String storeLocation) throws Exception{

        BufferedInputStream bis=null;
        BufferedOutputStream bos=null;
        String filePath=null;

        try{
            bis=new BufferedInputStream(data.getInputStream());

            File file=new File(storeLocation);
            if(!file.exists()){
                file.mkdirs();
            }

            byte[] buffer=new byte[1024];
            int len=0;

            filePath=file+"/"+ UUID.randomUUID().toString()+data.getOriginalFilename();//存储路径
            bos=new BufferedOutputStream(new FileOutputStream(filePath));

            while((len=bis.read(buffer))!=-1){
                bos.write(buffer);
                bos.flush();
            }


        }catch (Exception e){
            e.printStackTrace();
            throw new MyException("文件存储失败！");
        }finally {
            try{
                bis.close();
                bos.close();
            }catch (Exception e){
                e.printStackTrace();
                System.err.println("流关闭失败");
                throw new MyException("文件存储失败");
            }

        }

        return filePath;
    }

}

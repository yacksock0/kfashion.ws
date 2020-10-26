package io.aetherit.kfashion.ws.controller.kTagging;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;

import javax.imageio.ImageIO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@CrossOrigin(origins = "*", maxAge = 1)
@RestController
@RequestMapping("/dnd")
public class KimageController {

    /**
     * 단일 파일 업로드
     *
     * @param file
     * @return UploadFileResponse
     * @throws IOException
     */

    @PostMapping("/uploadFile")
    public ResponseEntity<Object> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        HashMap<String, Object> boundaryList = new HashMap<String, Object>();
        HashMap<String, Object> exportMap = new HashMap<String, Object>();
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        int pos = file.getOriginalFilename().lastIndexOf(".");
        String fileType = file.getOriginalFilename().substring(pos + 1);
        String fileName = file.getOriginalFilename();
        long fileSize = file.getSize();
        try {
            String mainPosition = "W";
            int newWidth = 800;
            double ratio;// 변경 할 넓이
            int width = 0;
            int height = 0;
            BufferedImage image = ImageIO.read(file.getInputStream());
            // 원본 이미지 사이즈 가져오기
            int imageWidth = image.getWidth(null);
            int imageHeight = image.getHeight(null);
            if (mainPosition.equals("W")) {    // 넓이기준
                ratio = (double) newWidth / (double) imageWidth;
                width = (int) (imageWidth * ratio);
                height = (int) (imageHeight * ratio);
            }
            Image resizeImage = image.getScaledInstance(width, height, Image.SCALE_FAST);

            // 새 이미지  저장하기
            BufferedImage newImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            Graphics g = newImage.getGraphics();
            g.drawImage(resizeImage, 0, 0, null);
            g.dispose();

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(newImage, fileType, baos);
            byte[] imageInByte = baos.toByteArray();

            //  {fileName=holidayColor-blue.jpg, imgData=[B@6f2121ff, boundaryList=(this Map)}
            boundaryList.put("fileName", fileName);
            boundaryList.put("imgData", imageInByte);
            exportMap.put("fileName", fileName);
            exportMap.put("fileType", fileType);
            exportMap.put("fileSize", fileSize);
            resultMap.put("boundaryList", boundaryList);
            resultMap.put("exportMap", exportMap);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

}
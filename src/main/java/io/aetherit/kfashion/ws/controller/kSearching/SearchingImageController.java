package io.aetherit.kfashion.ws.controller.kSearching;

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
@RequestMapping("/api/v1/kSearching/img")
public class SearchingImageController {

    /**
     * 단일 파일 업로드
     * 
     * @param file
     * @return UploadFileResponse
     * @throws IOException 
     *
     */

    @PostMapping("/uploadFile")
    public ResponseEntity<Object> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
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
             resultMap.put("imgData", imageInByte);
             resultMap.put("fileName", fileName);
             resultMap.put("fileType", fileType);
             resultMap.put("fileSize", fileSize);
             System.out.println(resultMap);
         } catch (IOException e) {
             e.printStackTrace();
         }
         return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
     }

}










//package io.aetherit.kfashion.ws.controller.kSearching;
//
//
//import io.aetherit.kfashion.ws.service.KfashionCommentService;
//import io.aetherit.kfashion.ws.service.KfashionImageService;
//import io.aetherit.kfashion.ws.service.KfashionWorkHistoryService;
//import io.aetherit.kfashion.ws.service.KfashionWorkService;
//import io.aetherit.kfashion.ws.util.CommonUtil;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import javax.imageio.ImageIO;
//import java.awt.*;
//import java.awt.image.BufferedImage;
//import java.io.ByteArrayOutputStream;
//import java.io.IOException;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/v1/kSearching/img")
//public class SearchingImageController {
//
//    private static final Logger logger = LoggerFactory.getLogger(SearchingImageController.class);
//
//    private KfashionImageService kfashionImageService;
//    private KfashionWorkService kfashionWorkService;
//    private KfashionWorkHistoryService kfashionWorkHistoryService;
//    private KfashionCommentService kfashionCommentService;
//
//
//    @Autowired
//    private CommonUtil commonUtil;
//
//    @Autowired
//    public SearchingImageController(KfashionImageService kfashionImageService,
//                                    KfashionWorkService kfashionWorkService,
//                                    KfashionWorkHistoryService kfashionWorkHistoryService,
//                                    KfashionCommentService kfashionCommentService) {
//
//        this.kfashionImageService = kfashionImageService;
//        this.kfashionWorkService = kfashionWorkService;
//        this.kfashionWorkHistoryService = kfashionWorkHistoryService;
//        this.kfashionCommentService = kfashionCommentService;
//
//    }
//
//    @PostMapping("/uploadFile")
//    public ResponseEntity<Object> uploadFileAll(@RequestParam("files") MultipartFile[] files) {
//        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
//        System.out.println("files.length"+ files.length);
//
//        if(files.length > 0) {
//            for(int i=0; i<files.length; i++) {
//                System.out.println("@@@ "+ i +" : " +files[i]);
//
//                int pos = files[i].getOriginalFilename().lastIndexOf(".");
//                String fileType = files[i].getOriginalFilename().substring(pos + 1);
//                String workName = files[i].getOriginalFilename();
//
//                try {
//                    String mainPosition = "W";
//                    int newWidth = 800;
//                    double ratio;// 변경 할 넓이
//                    int width = 0;
//                    int height = 0;
//                    BufferedImage image = ImageIO.read(files[i].getInputStream());
//                    // 원본 이미지 사이즈 가져오기
//                    int imageWidth = image.getWidth(null);
//                    int imageHeight = image.getHeight(null);
//
//                    if (mainPosition.equals("W")) {    // 넓이기준
//                        ratio = (double) newWidth / (double) imageWidth;
//                        width = (int) (imageWidth * ratio);
//                        height = (int) (imageHeight * ratio);
//                    }
//                    Image resizeImage = image.getScaledInstance(width, height, Image.SCALE_SMOOTH);
//                    // 새 이미지  저장하기
//                    BufferedImage newImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
//                    Graphics g = newImage.getGraphics();
//                    g.drawImage(resizeImage, 0, 0, null);
//                    g.dispose();
//
//                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
//                    ImageIO.write(newImage, fileType, baos);
//                    byte[] imageInByte = baos.toByteArray();
//
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
//        }
//        return new ResponseEntity<Object>(HttpStatus.OK);
//    }
//
//
//
//    @RequestMapping(value = "/getByteImage")
//    public ResponseEntity<byte[]> getByteImage(@RequestParam(value = "workNo") Long workNo) {
//        Map<String, Object> map = kfashionImageService.getByteImage(workNo);
//        byte[] imageContent = (byte[]) map.get("img_data");
//
//        final HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.IMAGE_JPEG);
//        return new ResponseEntity<byte[]>(imageContent, headers, HttpStatus.OK);
//    }
//
//
//
//
//}

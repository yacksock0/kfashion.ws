package io.aetherit.kfashion.ws.controller;


import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionWork;
import io.aetherit.kfashion.ws.model.KfashionWorkHistory;
import io.aetherit.kfashion.ws.model.UploadFileResponse;
import io.aetherit.kfashion.ws.service.FileStorageService;
import io.aetherit.kfashion.ws.service.KfashionImageService;
import io.aetherit.kfashion.ws.service.KfashionWorkHistoryService;
import io.aetherit.kfashion.ws.service.KfashionWorkService;
import io.aetherit.kfashion.ws.util.CommonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/kfashion/img")
public class KfashionImageController {

    private static final Logger logger = LoggerFactory.getLogger(KfashionImageController.class);

    private KfashionImageService kfashionImageService;
    private KfashionWorkService kfashionWorkService;
    private FileStorageService fileStorageService;
    private KfashionWorkHistoryService kfashionWorkHistoryService;

    @Autowired
    private CommonUtil commonUtil;

    @Autowired
    public KfashionImageController(KfashionImageService kfashionImageService,
                                   KfashionWorkService kfashionWorkService,
                                   FileStorageService fileStorageService,
                                   KfashionWorkHistoryService kfashionWorkHistoryService) {
        this.kfashionImageService = kfashionImageService;
        this.kfashionWorkService = kfashionWorkService;
        this.fileStorageService = fileStorageService;
        this.kfashionWorkHistoryService = kfashionWorkHistoryService;
    }

    /**
     * 단일 파일 업로드
     * @param userId
     * @param file
     * @return UploadFileResponse
     * @throws IOException
     */

    @PostMapping("/uploadFile")
    public ResponseEntity<Object> uploadFile(@RequestParam(value="userId", required = true) String userId,
                                         @RequestParam("file") MultipartFile file) {
        String workName = file.getOriginalFilename();
        KfashionWork work = new KfashionWork();
        work.setWorkName(workName);
        kfashionWorkService.insertWork(work);
        Long no = work.getNo();
        try {
            KfashionImage kfashionImage = new KfashionImage();
            kfashionImage.setWorkNo(no);
            kfashionImage.setImgData(file.getBytes());
            kfashionImageService.insertImgUpload(kfashionImage);
            KfashionWorkHistory workHistory= new KfashionWorkHistory();
            workHistory.setCreatedId(userId);
            workHistory.setWorkNo(no);
            workHistory.setWorkStep(1);
            kfashionWorkHistoryService.insertWorkHistory(workHistory);
        }catch (IOException e) {
            e.printStackTrace();
        }

        String fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        return new ResponseEntity<Object>(HttpStatus.OK);
    }

    /**
     * 다중 파일 업로드
     * @param userId
     * @param files
     * @return uploadFile
     * @throws IOException
     */

    @PostMapping("/uploadMultipleFiles")
    public List<ResponseEntity<Object>> uploadMultipleFiles(@RequestParam(value="userId", required = true) String userId,
                                                        @RequestParam(value ="files", required = false) MultipartFile[] files)  throws IOException {
        System.out.println("files"+files.length);
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(userId,file))
                .collect(Collectors.toList());
    }

    /**
     * 다운로드 파일
     * @param fileName
     * @return ResponseEntity
     * @throws IOException
     */
    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName,
                                                 HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile()
                    .getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""
                        + resource.getFilename() + "\"")
                .body(resource);
    }

    /**
     * 이미지업로드 리스트
     * @param
     * @return ResponseEntity
     * @throws
     */

    @GetMapping(value="/boundaryList")
    public ResponseEntity<Object> boundaryList(HttpServletRequest httpRequest) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        List<KfashionImage> boundaryList = kfashionImageService.selectBoundaryList();
        resultMap.put("boundaryList", boundaryList);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    /**
     * 이미지 화면
     * @param workNo
     * @return ResponseEntity
     * @throws
     */
    @RequestMapping(value="/getByteImage")
    public ResponseEntity<byte[]> getByteImage(@RequestParam(value="workNo")int workNo) {
        Map<String, Object> map = kfashionImageService.getByteImage(workNo);
        byte[] imageContent = (byte[]) map.get("img_data");

        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<byte[]>(imageContent, headers, HttpStatus.OK);
    }

    /**
     * 이미지 삭제
     * @param workImage
     * @return ResponseEntity
     * @throws
     */

    @DeleteMapping(value="/deleteImage/{workNo}")
    public ResponseEntity<Void> deleteImage(@RequestBody KfashionImage workImage) {
        kfashionWorkHistoryService.deleteWorkHistory(workImage);
        kfashionImageService.deleteImage(workImage);
        kfashionWorkService.deleteWork(workImage);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 전문가 작업리스트
     * @param createdId
     * @return ResponseEntity
     * @throws
     */

    @GetMapping(value="/professionalList")
    public ResponseEntity<Object> professionalList(HttpServletRequest httpRequest,
                                                   @RequestParam(value="createdId")String createdId) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        List<KfashionImage> professionalList = kfashionImageService.selectProfessionalList(createdId);
        resultMap.put("professionalList", professionalList);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    /**
     * 최종검수 리스트
     * @return ResponseEntity
     * @throws
     */

    @GetMapping(value="inspectionList")
    public ResponseEntity<Object> inspectionList(HttpServletRequest httpRequest) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        List<KfashionImage> inspectionList = kfashionImageService.selectInspectionList();
        resultMap.put("inspectionList", inspectionList);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }
}
package io.aetherit.kfashion.ws.controller;


import io.aetherit.kfashion.ws.model.*;
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
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;
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
    public UploadFileResponse uploadFile(@RequestParam(value="userId", required = true) String userId,
                                         @RequestParam("file") MultipartFile file) {
        UUID uuid = UUID.randomUUID();
        String workName = StringUtils.cleanPath(uuid.toString()+"_"+file.getOriginalFilename());
        KfashionWork work = new KfashionWork();
        work.setWorkName(workName);
        kfashionWorkService.insertWork(work);
        try {
            Long work_no = kfashionWorkService.selectWorkNo(workName);
            KfashionImage kfashionImage = new KfashionImage();
            kfashionImage.setWorkNo(work_no);
            kfashionImage.setImgData(file.getBytes());
            kfashionImageService.insertImgUpload(kfashionImage);
            KfashionWorkHistory workHistory= new KfashionWorkHistory();
            workHistory.setCreatedId(userId);
            workHistory.setWorkNo(work_no);
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

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    /**
     * 다중 파일 업로드
     * @param userId
     * @param files
     * @return uploadFile
     * @throws IOException
     */

    @PostMapping("/uploadMultipleFiles")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam(value="userId", required = true) String userId,
                                                        @RequestParam(value ="files", required = false) MultipartFile[] files)  throws IOException {
            System.out.println(files.length);

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

    @GetMapping(value="/boundaryList")
    public ResponseEntity<Object> boundaryList(HttpServletRequest httpRequest) { //, @RequestParam(value="createdId")String createdId
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            System.out.println("asdasdasqqqqqd");

            List<KfashionImage> boundaryList = kfashionImageService.selectBoundaryList("admin");
            resultMap.put("boundaryList", boundaryList);

            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

    @RequestMapping(value="/getByteImage")
    public ResponseEntity<byte[]> getByteImage(@RequestParam(value="workNo")int workNo) {
        Map<String, Object> map = kfashionImageService.getByteImage(workNo);
        byte[] imageContent = (byte[]) map.get("img_data");

        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<byte[]>(imageContent, headers, HttpStatus.OK);
    }

}

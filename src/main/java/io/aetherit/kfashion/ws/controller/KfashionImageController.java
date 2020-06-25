package io.aetherit.kfashion.ws.controller;


import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionWork;
import io.aetherit.kfashion.ws.model.UploadFileResponse;
import io.aetherit.kfashion.ws.service.FileStorageService;
import io.aetherit.kfashion.ws.service.KfashionImageService;
import io.aetherit.kfashion.ws.service.KfashionWorkService;
import io.aetherit.kfashion.ws.util.CommonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.commons.io.FilenameUtils;

@RestController
@RequestMapping("/api/v1/img")
public class KfashionImageController {

    private static final Logger logger = LoggerFactory.getLogger(KfashionImageController.class);

        private KfashionImageService kfashionImageService;
        private KfashionWorkService kfashionWorkService;
        private FileStorageService fileStorageService;

         @Autowired
         private CommonUtil commonUtil;

        @Autowired
        public KfashionImageController(KfashionImageService kfashionImageService,
                                       KfashionWorkService kfashionWorkService,
                                       FileStorageService fileStorageService) {
            this.kfashionImageService = kfashionImageService;
            this.kfashionWorkService = kfashionWorkService;
            this.fileStorageService = fileStorageService;
        }

    @PostMapping("/uploadFile")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
        String workName = StringUtils.cleanPath(file.getOriginalFilename());
        KfashionWork work = new KfashionWork();
        work.setWorkName(workName);
        kfashionWorkService.insertWork(work);
        try {
            KfashionImage kfashionImage = new KfashionImage();
            kfashionImage.setImgData(file.getBytes());
            kfashionImageService.insertImgUpload(kfashionImage);
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

    @PostMapping("/uploadMultipleFiles")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam(value ="files", required = false) MultipartFile[] files)  throws IOException {
            System.out.println(files.length);

        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file))
                .collect(Collectors.toList());
    }

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

    @RequestMapping("/uploadFile")
    public void forGues() {
        logger.info("file==========================");
    }
}

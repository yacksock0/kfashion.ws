package io.aetherit.kfashion.ws.controller;


import io.aetherit.kfashion.ws.model.KfashionComment;
import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionWork;
import io.aetherit.kfashion.ws.model.KfashionWorkHistory;
import io.aetherit.kfashion.ws.service.*;
import io.aetherit.kfashion.ws.util.CommonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/kfashion/img")
public class KfashionImageController {

    private static final Logger logger = LoggerFactory.getLogger(KfashionImageController.class);

    private KfashionImageService kfashionImageService;
    private KfashionWorkService kfashionWorkService;
    private KfashionWorkHistoryService kfashionWorkHistoryService;
    private KfashionCommentService kfashionCommentService;
    private KfashionImageLocationPolygonService kfashionImageLocationPolygonService;
    private KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService;
    private KfashionImageLocationRectService kfashionImageLocationRectService;
    private KfashionLabelService kfashionLabelService;

    @Autowired
    private CommonUtil commonUtil;

    @Autowired
    public KfashionImageController(KfashionImageService kfashionImageService,
                                   KfashionWorkService kfashionWorkService,
                                   KfashionWorkHistoryService kfashionWorkHistoryService,
                                   KfashionCommentService kfashionCommentService,
                                   KfashionImageLocationPolygonService kfashionImageLocationPolygonService,
                                   KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService,
                                   KfashionImageLocationRectService kfashionImageLocationRectService,
                                   KfashionLabelService kfashionLabelService) {

        this.kfashionImageService = kfashionImageService;
        this.kfashionWorkService = kfashionWorkService;
        this.kfashionWorkHistoryService = kfashionWorkHistoryService;
        this.kfashionCommentService = kfashionCommentService;
        this.kfashionImageLocationPolygonService = kfashionImageLocationPolygonService;
        this.kfashionImageLocationPolygonPointService = kfashionImageLocationPolygonPointService;
        this.kfashionImageLocationRectService = kfashionImageLocationRectService;
        this.kfashionLabelService = kfashionLabelService;

    }

    @PostMapping("/uploadFileAll")
    public ResponseEntity<Object> uploadFileAll(@RequestParam(value = "userId", required = true) String userId,
                                             @RequestParam("files") MultipartFile[] files) {
        System.out.println("files.length"+ files.length);

        if(files.length > 0) {
            for(int i=0; i<files.length; i++) {
                int pos = files[i].getOriginalFilename().lastIndexOf(".");
                String fileType = files[i].getOriginalFilename().substring(pos + 1);
                String workName = files[i].getOriginalFilename();
                KfashionWork work = new KfashionWork();
                work.setWorkName(workName);
                kfashionWorkService.insertWork(work);
                Long no = work.getNo();
                try {
                    String mainPosition = "W";
                    int newWidth = 800;
                    double ratio;// 변경 할 넓이
                    int width = 0;
                    int height = 0;
                    BufferedImage image = ImageIO.read(files[i].getInputStream());
                    // 원본 이미지 사이즈 가져오기
                    int imageWidth = image.getWidth(null);
                    int imageHeight = image.getHeight(null);

                    if (mainPosition.equals("W")) {    // 넓이기준
                        ratio = (double) newWidth / (double) imageWidth;
                        width = (int) (imageWidth * ratio);
                        height = (int) (imageHeight * ratio);
                    }
                    // 이미지 리사이즈
                    // Image.SCALE_DEFAULT : 기본 이미지 스케일링 알고리즘 사용
                    // Image.SCALE_FAST    : 이미지 부드러움보다 속도 우선
                    // Image.SCALE_REPLICATE : ReplicateScaleFilter 클래스로 구체화 된 이미지 크기 조절 알고리즘
                    // Image.SCALE_SMOOTH  : 속도보다 이미지 부드러움을 우선
                    // Image.SCALE_AREA_AVERAGING  : 평균 알고리즘 사용
                    Image resizeImage = image.getScaledInstance(width, height, Image.SCALE_SMOOTH);
                    // 새 이미지  저장하기
                    BufferedImage newImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
                    Graphics g = newImage.getGraphics();
                    g.drawImage(resizeImage, 0, 0, null);
                    g.dispose();

                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                    ImageIO.write(newImage, fileType, baos);
                    byte[] imageInByte = baos.toByteArray();

                    KfashionImage kfashionImage = new KfashionImage();
                    kfashionImage.setWorkNo(no);
                    kfashionImage.setImgData(imageInByte);
                    kfashionImageService.insertImgUpload(kfashionImage);
                    KfashionWorkHistory workHistory = new KfashionWorkHistory();
                    workHistory.setCreatedId(userId);
                    workHistory.setWorkNo(no);
                    workHistory.setWorkStep(1);
                    kfashionWorkHistoryService.insertWorkHistory(workHistory);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return new ResponseEntity<Object>(HttpStatus.OK);
    }
    @GetMapping("/fileuploadCount")
    public ResponseEntity<Object> fileuploadCount(@RequestParam(value = "workNo", required = true) Long workNo) {

        Long count = kfashionWorkService.selectFileuploadCount(workNo);

        return new ResponseEntity<Object>(count, HttpStatus.OK);
    }




    /**
     * 단일 파일 업로드
     *
     * @param userId
     * @param file
     * @return UploadFileResponse
     * @throws IOException
     */

    @PostMapping("/uploadFile")
    public ResponseEntity<Object> uploadFile(@RequestParam(value = "userId", required = true) String userId,
                                             @RequestParam("file") MultipartFile file) {
        int pos = file.getOriginalFilename().lastIndexOf(".");
        String fileType = file.getOriginalFilename().substring(pos + 1);
        String workName = file.getOriginalFilename();
        KfashionWork work = new KfashionWork();
        work.setWorkName(workName);
        kfashionWorkService.insertWork(work);
        Long no = work.getNo();
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
            // 이미지 리사이즈
            // Image.SCALE_DEFAULT : 기본 이미지 스케일링 알고리즘 사용
            // Image.SCALE_FAST    : 이미지 부드러움보다 속도 우선
            // Image.SCALE_REPLICATE : ReplicateScaleFilter 클래스로 구체화 된 이미지 크기 조절 알고리즘
            // Image.SCALE_SMOOTH  : 속도보다 이미지 부드러움을 우선
            // Image.SCALE_AREA_AVERAGING  : 평균 알고리즘 사용
            Image resizeImage = image.getScaledInstance(width, height, Image.SCALE_SMOOTH);
            // 새 이미지  저장하기
            BufferedImage newImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            Graphics g = newImage.getGraphics();
            g.drawImage(resizeImage, 0, 0, null);
            g.dispose();

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(newImage, fileType, baos);
            byte[] imageInByte = baos.toByteArray();

            KfashionImage kfashionImage = new KfashionImage();
            kfashionImage.setWorkNo(no);
            kfashionImage.setImgData(imageInByte);
            kfashionImageService.insertImgUpload(kfashionImage);
            KfashionWorkHistory workHistory = new KfashionWorkHistory();
            workHistory.setCreatedId(userId);
            workHistory.setWorkNo(no);
            workHistory.setWorkStep(1);
            kfashionWorkHistoryService.insertWorkHistory(workHistory);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<Object>(file.getOriginalFilename(), HttpStatus.OK);
    }

    /**
     * 다중 파일 업로드
     *
     * @param userId
     * @param files
     * @return uploadFile
     * @throws IOException
     */

    @PostMapping("/uploadMultipleFiles")
    public List<ResponseEntity<Object>> uploadMultipleFiles(@RequestParam(value = "userId", required = true) String userId,
                                                            @RequestParam(value = "files", required = false) MultipartFile[] files) throws IOException {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(userId, file))
                .collect(Collectors.toList());
    }

    /**
     * 이미지업로드 리스트
     *
     * @param
     * @return ResponseEntity
     * @throws
     */

    @GetMapping(value = "/boundaryList")
    public ResponseEntity<Object> boundaryList(HttpServletRequest httpRequest) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        List<KfashionImage> boundaryList = kfashionImageService.selectBoundaryList();
        if (boundaryList != null) {
            for (int i = 0; i < boundaryList.size(); i++) {
                int workNameType = boundaryList.get(i).getWorkName().lastIndexOf(".");
                boundaryList.get(i).setWorkName(boundaryList.get(i).getWorkName().substring(0, workNameType));
            }
        }
//        for(int i=0; i< boundaryList.size(); i++) {
//            System.out.println("boudaryList"+boundaryList.get(i).getWorkNo()+boundaryList.get(i).getFileName()+")"+boundaryList.get(i).getCreatedDatetime().format(DateTimeFormatter.ISO_LOCAL_TIME));
//
//        }
        resultMap.put("boundaryList", boundaryList);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    /**
     * 이미지 화면
     *
     * @param workNo
     * @return ResponseEntity
     * @throws
     */
    @RequestMapping(value = "/getByteImage")
    public ResponseEntity<byte[]> getByteImage(@RequestParam(value = "workNo") Long workNo) {
        Map<String, Object> map = kfashionImageService.getByteImage(workNo);
        byte[] imageContent = (byte[]) map.get("img_data");

        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<byte[]>(imageContent, headers, HttpStatus.OK);
    }

    /**
     * 이미지 삭제
     *
     * @param workImage
     * @return ResponseEntity
     * @throws
     */

    @DeleteMapping(value = "/deleteImage/{workNo}")
    public ResponseEntity<Void> deleteImage(@RequestBody KfashionImage workImage) {
        kfashionWorkHistoryService.deleteWorkHistory(workImage);
        kfashionImageService.deleteImage(workImage);
        kfashionWorkService.deleteWork(workImage);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 전문가 작업리스트
     *
     * @param createdId
     * @return ResponseEntity
     * @throws
     */

    @GetMapping(value = "professionalList")
    public ResponseEntity<Object> professionalList(HttpServletRequest httpRequest,
                                                 @RequestParam(value = "createdId") String createdId,
                                                 @RequestParam(value = "page", required = true, defaultValue = "0") int page,
                                                 @RequestParam(value = "pageSize", required = true, defaultValue = "5") int pageSize,
                                                 @RequestParam(value = "keyword",required = true, defaultValue = "")String keyword) {
        int startPage = page * pageSize;
        HashMap<String, Object> pageMap = new HashMap<>();
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        pageMap.put("pageSize",pageSize);
        pageMap.put("startPage",startPage);
        pageMap.put("keyword", keyword);
        pageMap.put("createdId",createdId);
        List<KfashionImage> professionalList = kfashionImageService.selectProfessionalList(pageMap);
        Long totalCount = kfashionImageService.selectProfessionalListTotal(pageMap);
        resultMap.put("professionalList", professionalList);
        resultMap.put("page", page);
        resultMap.put("totalCount", totalCount);
        resultMap.put("pageSize", pageSize);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    /**
     * 최종검수 리스트
     *
     * @return ResponseEntity
     * @throws
     */

    @GetMapping(value = "inspectionList")
    public ResponseEntity<Object> inspectionList(HttpServletRequest httpRequest,
                                                 @RequestParam(value = "createdId") String createdId,
                                                 @RequestParam(value = "page", required = true, defaultValue = "0") int page,
                                                 @RequestParam(value = "pageSize", required = true, defaultValue = "5") int pageSize,
                                                 @RequestParam(value = "keyword",required = true, defaultValue = "")String keyword) {
        int startPage = page * pageSize;
        Map<String, Object> pageMap = new HashMap<>();
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        pageMap.put("pageSize",pageSize);
        pageMap.put("startPage",startPage);
        pageMap.put("keyword", keyword);
        pageMap.put("createdId",createdId);
        List<KfashionImage> inspectionList = kfashionImageService.selectInspectionList(pageMap);
        Long totalCount = kfashionImageService.selectInspectionListTotal(pageMap);
        resultMap.put("inspectionList", inspectionList);
        resultMap.put("page", page);
        resultMap.put("totalCount", totalCount);
        resultMap.put("pageSize", pageSize);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }


    /**
     * 최종검수 리스트
     *
     * @return ResponseEntity
     * @throws
     */

    @GetMapping(value = "professionalInspectionList")
    public ResponseEntity<Object> professionalInspectionList(HttpServletRequest httpRequest,
                                                 @RequestParam(value = "page", required = true, defaultValue = "0") int page,
                                                 @RequestParam(value = "pageSize", required = true, defaultValue = "5") int pageSize,
                                                 @RequestParam(value = "keyword",required = true, defaultValue = "")String keyword) {
        int startPage = page * pageSize;
        Map<String, Object> pageMap = new HashMap<>();
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        pageMap.put("pageSize",pageSize);
        pageMap.put("startPage",startPage);
        pageMap.put("keyword", keyword);
        List<KfashionImage> professionalInspectionList = kfashionImageService.selectProfessionalInspectionList(pageMap);
        Long totalCount = kfashionImageService.selectProfessionalInspectionListTotal(pageMap);
        resultMap.put("professionalInspectionList", professionalInspectionList);
        resultMap.put("page", page);
        resultMap.put("totalCount", totalCount);
        resultMap.put("pageSize", pageSize);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    /**
     * 고등학생 검수리스트
     *
     * @return ResponseEntity
     * @throws
     */

    @GetMapping(value = "inspectionHighList")
    public ResponseEntity<Object> inspectionHighList(HttpServletRequest httpRequest,
                                                     @RequestParam(value = "page", required = true, defaultValue = "0") int page,
                                                     @RequestParam(value = "pageSize", required = true, defaultValue = "5") int pageSize,
                                                     @RequestParam(value = "keyword",required = true, defaultValue = "")String keyword) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        List<Long> HistoryWorkNo = kfashionWorkHistoryService.selectWorkNoList();
        List<KfashionComment> commentWorkNoList = kfashionCommentService.selectCommentWorkNoList();


        List<Long> commentWorkNoStep3 = new ArrayList<>();
        List<Long> commentWorkNoStep4 = new ArrayList<>();
        Long workNo = null;
        for (int i = 0; i < commentWorkNoList.size(); i++) {
            if (commentWorkNoList.get(i).getCount() >= 2) {
                workNo = commentWorkNoList.get(i).getWorkNo();
                List<KfashionComment> commentComplete = kfashionCommentService.selectCommentComplete(workNo);
                for (int j = 0; j < commentComplete.size(); j++) {
                    if (commentComplete.get(j).getWorkStep() == 3) {
                        if (commentComplete.get(j).getWorkType() == 1) {
                            if (commentComplete.get(j).getComplete() == 'N') {
                                commentWorkNoStep3.addAll(Collections.singleton(commentComplete.get(j).getWorkNo()));
                            }
                        }
                        if (commentComplete.get(j).getWorkType() == 2) {
                            if (commentComplete.get(j).getComplete() == 'N') {
                                commentWorkNoStep3.addAll(Collections.singleton(commentComplete.get(j).getWorkNo()));
                            }
                        }
                        if (commentComplete.get(j).getWorkType() == 3) {
                            if (commentComplete.get(j).getComplete() == 'N') {
                                commentWorkNoStep3.addAll(Collections.singleton(commentComplete.get(j).getWorkNo()));
                            }
                        }
                        if (commentComplete.get(j).getWorkType() == 4) {
                            if (commentComplete.get(j).getComplete() == 'N') {
                                commentWorkNoStep3.addAll(Collections.singleton(commentComplete.get(j).getWorkNo()));
                            }
                        }

                    }
                    if (commentComplete.get(j).getWorkStep() == 4) {
                        if (commentComplete.get(j).getComplete() == 'N') {
                            commentWorkNoStep4.addAll(Collections.singleton(commentComplete.get(j).getWorkNo()));
                        }
                    }
                }
            }
            if (commentWorkNoList.get(i).getCount() == 1) {
                workNo = commentWorkNoList.get(i).getWorkNo();
                List<KfashionComment> commentComplete = kfashionCommentService.selectCommentComplete(workNo);
                for (int k = 0; k < commentComplete.size(); k++) {
                    if (commentComplete.get(k).getWorkStep() == 3) {
                        if (commentComplete.get(k).getWorkType() == 1) {
                            if (commentComplete.get(k).getComplete() == 'N') {
                                commentWorkNoStep3.addAll(Collections.singleton(commentComplete.get(k).getWorkNo()));
                            }
                        }
                        if (commentComplete.get(k).getWorkType() == 2) {
                            if (commentComplete.get(k).getComplete() == 'N') {
                                commentWorkNoStep3.addAll(Collections.singleton(commentComplete.get(k).getWorkNo()));
                            }
                        }
                        if (commentComplete.get(k).getWorkType() == 3) {
                            if (commentComplete.get(k).getComplete() == 'N') {
                                commentWorkNoStep3.addAll(Collections.singleton(commentComplete.get(k).getWorkNo()));
                            }
                        }
                        if (commentComplete.get(k).getWorkType() == 4) {
                            if (commentComplete.get(k).getComplete() == 'N') {
                                commentWorkNoStep3.addAll(Collections.singleton(commentComplete.get(k).getWorkNo()));
                            }
                        }
                    }
                    if (commentComplete.get(k).getWorkStep() == 4) {
                        if (commentComplete.get(k).getComplete() == 'N') {
                            commentWorkNoStep4.addAll(Collections.singleton(commentComplete.get(k).getWorkNo()));
                        }
                    }
                }
            }
        }
        HistoryWorkNo.removeAll(commentWorkNoStep3);
        HistoryWorkNo.removeAll(commentWorkNoStep4);

        int startPage = page * pageSize;
        HashMap<String, Object> pageMap = new HashMap<>();
        pageMap.put("HistoryWorkNo",HistoryWorkNo);
        pageMap.put("pageSize",pageSize);
        pageMap.put("startPage",startPage);
        pageMap.put("keyword", keyword);


        if(HistoryWorkNo.size() == 0 || HistoryWorkNo == null) {
//            List<KfashionImage> inspectionHighList = null;
//            resultMap.put("inspectionHighList", inspectionHighList);
            resultMap.put("page", page);
            resultMap.put("totalCount", 0);
            resultMap.put("pageSize", pageSize);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }else {
            List<KfashionImage> inspectionHighList = kfashionImageService.selectInspectionHighList(pageMap);
            Long totalCount = kfashionImageService.selectInspectionHighListTotal(pageMap);
            resultMap.put("inspectionHighList", inspectionHighList);
            resultMap.put("page", page);
            resultMap.put("totalCount", totalCount);
            resultMap.put("pageSize", pageSize);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }
    }

    /**
     * 최근작업 이미지 리스트
     *
     * @param
     * @return ResponseEntity
     * @throws
     */

    @GetMapping(value = "/recentlyImg")
    public ResponseEntity<Object> recentlyImg(HttpServletRequest httpRequest,
                                              @RequestParam(value = "createdId", required = true) String createdId) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        List<KfashionImage> recentlyImg = kfashionImageService.recentlyImg(createdId);
        resultMap.put("recentlyImg", recentlyImg);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }



    /**
     * 이미지 삭제
     *
     * @param workImage
     * @return ResponseEntity
     * @throws
     */

    @DeleteMapping(value = "/deleteCheckListImage/{workNo}")
    public ResponseEntity<Void> deleteCheckListImage(@RequestBody KfashionImage workImage) {
        kfashionLabelService.deleteLabelAll(workImage);
        kfashionCommentService.deleteCommentAll(workImage);
        kfashionImageLocationPolygonPointService.deletePolyPointAll(workImage);
        kfashionImageLocationPolygonService.deletePolyAll(workImage);
        kfashionImageLocationRectService.deleteRectAll(workImage);
        kfashionWorkHistoryService.deleteWorkHistory(workImage);
        kfashionImageService.deleteImage(workImage);
        kfashionWorkService.deleteWork(workImage);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    /**
     * 완료된 이미지 리스트
     *
     * @param
     * @return ResponseEntity
     * @throws
     */

    @GetMapping(value = "/successList")
    public ResponseEntity<Object> successList(HttpServletRequest httpRequest,
                                              @RequestParam(value = "page", required = true, defaultValue = "0") int page,
                                              @RequestParam(value = "pageSize", required = true, defaultValue = "5") int pageSize,
                                              @RequestParam(value = "keyword",required = true, defaultValue = "")String keyword) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        int startPage = page * pageSize;
        HashMap<String, Object> pageMap = new HashMap<>();
        pageMap.put("pageSize",pageSize);
        pageMap.put("startPage",startPage);
        pageMap.put("keyword", keyword);
        List<KfashionImage> successList = kfashionImageService.selectSuccessList(pageMap);
        Long totalCount = kfashionImageService.selectSuccessListTotal(pageMap);
        resultMap.put("page", page);
        resultMap.put("totalCount", totalCount);
        resultMap.put("pageSize", pageSize);
        resultMap.put("successList", successList);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }




}
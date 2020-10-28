package io.aetherit.kfashion.ws.controller.common;


import io.aetherit.kfashion.ws.service.common.ImageDataService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/kfashion/service/imagedata")
public class ImageDataController {
    private static final Logger logger = LoggerFactory.getLogger(ImageDataController.class);

    private ImageDataService imageDataService;
    private DownloadView downloadView;

    @Autowired
    public ImageDataController(ImageDataService imageDataService, DownloadView downloadView) {
        this.imageDataService = imageDataService;
        this.downloadView = downloadView;
    }

    @GetMapping("/filedownload.do")
    public ResponseEntity<String> imageDataRequest(HttpServletRequest httpRequest, HttpSession session, HttpServletResponse response) throws Throwable {
        String result = "";
        try {
            downloadView.fileDown(httpRequest, response, session);
            result = "ImageDownLoad Success";
        } catch (Exception e) {
            result = "ImageDownLoad Fail";
            e.printStackTrace();
            logger.error(e.toString());
        }
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }
}

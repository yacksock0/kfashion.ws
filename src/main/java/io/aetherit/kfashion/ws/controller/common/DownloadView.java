package io.aetherit.kfashion.ws.controller.common;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.service.common.ImageDataService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URLEncoder;
import java.util.List;

@Controller
public class DownloadView {
    Logger logger = LoggerFactory.getLogger(DownloadView.class);
    private ImageDataService imageDataService;

    @Autowired
    public DownloadView (ImageDataService imageDataService) {
        this.imageDataService = imageDataService;
    }
    public void fileDown(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws IOException {

        List<KfashionImage> allImageDataList = imageDataService.getAllImageData();

        logger.trace(" fileDown allImageDataList {} ", allImageDataList.size());
        for(KfashionImage data : allImageDataList) {
            byte[] imageContent = (byte[]) data.getImgData();
            String workName = imageDataService.getImageWorkName(data.getWorkNo());
            logger.debug( " workName {} ", workName);
            File imageFile = new File(workName);
            OutputStream os = new FileOutputStream(imageFile);
            os.write(imageContent);
            os.close();

            BufferedImage image = ImageIO.read(imageFile);

            logger.debug( " imageFile.exists() {} ", imageFile.exists());
            logger.debug( " imageFile.isFile() {} ", imageFile.isFile());
            if(imageFile.exists() && imageFile.isFile()) {
                response.setContentType("application/octet-stream; charset=utf-8");
                response.setContentLength((int) imageFile.length());
                String browser = getBrowser(request);
                logger.debug(" getBrowser {} ", browser);
                String disposition = getDisposition(workName, browser);
                logger.debug(" getDisposition {} ", disposition);
                response.setHeader("Content-Disposition", disposition);
                response.setHeader("Content-Transfer-Encoding", "binary");
                logger.debug(" getHeader {} ", response.getHeader("Content-Disposition"));
                logger.debug(" getHeader {} ", response.getHeader("Content-Transfer-Encoding"));
                OutputStream out = response.getOutputStream();
                FileInputStream fis = null;
                fis = new FileInputStream(imageFile);
                FileCopyUtils.copy(fis, out);
                if(fis != null)
                    fis.close();
                out.flush();
                out.close();
            }
        }

    }

    private String getBrowser(HttpServletRequest request) {
        String header = request.getHeader("User-Agent");
        if(header.indexOf("Trident/7.0") > -1 || header.indexOf("MSIE") > -1) {
            return "MSIE";
        } else if(header.indexOf("Chrome/") > -1) {
            return "Chrome";
        } else if(header.indexOf("Safari /") > -1) {
            return "Safari";
        } else if(header.indexOf("Opera") > -1) {
            return "Opera";
        } else if(header.indexOf("iPhone") > -1 && header.indexOf("Mobile") > -1) {
            return "iPhone";
        } else if(header.indexOf("Firefox/") > -1) {
            return "Firefox";
        } else if(header.indexOf("bingbot/") > -1 || header.indexOf("Googlebot/") > -1) {
            return "Robot";
        } else {
            return "기타";
        }
    }

    private String getDisposition(String filename, String browser) throws UnsupportedEncodingException {
        String dispositionPrefix = "attachment;filename=";
        String encodedFilename = null;
        if(browser.equals("MSIE")) {
            encodedFilename = URLEncoder.encode(filename, "UTF-8".replaceAll("\\+", "%20"));
        } else if (browser.equals("Firefox")) {
            encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
        } else if (browser.equals("Opera")) {
            encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
        } else if(browser.equals("Chrome")) {
            StringBuffer sb = new StringBuffer();
            for(int i = 0; i < filename.length(); i++ ) {
                char c = filename.charAt(i);
                if (c > '~') {
                    sb.append(URLEncoder.encode("" + c, "UTF-8"));
                } else {
                    sb.append(c);
                }
            }
            encodedFilename = sb.toString();
        }
        return dispositionPrefix + encodedFilename;
    }
}

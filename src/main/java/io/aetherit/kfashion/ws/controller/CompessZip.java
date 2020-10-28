package io.aetherit.kfashion.ws.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class CompessZip {
    /**
     * @description 압축 메소드
     * @param path 압축할 파일 경로
     * @param outputFileName 출력파일명
     */
    private Logger logger = LoggerFactory.getLogger(CompessZip.class);
    public boolean compress(String path, String outputPath, String outputFileName) throws Throwable {
        boolean isCheck = false;

        File file = new File(path);

        //파일이 .zip이 없는 경우, .zip을 붙여준다.
        int pos = outputFileName.lastIndexOf(".") == -1 ? outputFileName.length() : outputFileName.lastIndexOf(".");

        //outputFileName .zip이 없는 경우
        if(!outputFileName.substring(pos).equalsIgnoreCase(".zip")) {
            outputFileName += ".zip";
        }

        //압축경로체크
        if(!file.exists()) {
            throw new Exception("Not File!");
        }

        //출력 스트림
        FileOutputStream fos = null;
        //압축 스트림
        ZipOutputStream zos = null;

        try {
            fos = new FileOutputStream(new File(outputPath + outputFileName));
            zos = new ZipOutputStream(fos);

            logger.debug(" 출력스트림 {} ", fos);
            logger.debug(" 압축스트림 {} ", zos);
            //디렉토리 검색을 통한 하위 파일과 폴더 검색
            searchDirectory(file, file.getPath(), zos);

            //압축 성공.
            isCheck = true;
        } catch (Throwable e) {
            throw e;
        }finally {
            if(zos != null)
                zos.close();
            if(fos != null)
                fos.close();
        }
        return isCheck;
    }

    /**
     * @description 디렉토리 검색
     * @param file 현재파일
     * @param root 루트경로
     * @param zos 압축스트림
     */

    private void searchDirectory(File file, String root, ZipOutputStream zos) throws Exception {
        //지정된 파일이 디렉토리인지 파일인지 검색
        if (file.isDirectory()) {
            //디렉토리일 경우 재탐색(재귀)
            File[] files = file.listFiles();
            for(File f : files) {
                logger.debug("searchDirectory files {} ", f);
                searchDirectory(f, root, zos);
            }
        }else {
            //파일일 경우 압축을 한다
            try {
                    compressZip(file, root, zos);
            } catch (Throwable e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * @description 압축메소드
     * @param file
     * @param root
     * @param zos
     * @throws Throwable
     */

    private void compressZip(File file, String root, ZipOutputStream zos) throws Throwable {
        logger.debug(" compressZip file {} ", file);
        logger.debug(" compressZip file.getPath() {} ", file.getPath());
        logger.debug(" compressZip root {} ", root);
        logger.debug(" compressZip zos {} ", zos);
        FileInputStream fis = null;
        String[] filePath = file.getPath().split("/");
        int fileLength = filePath.length;
        try {
            String zipName = file.getPath().replace(root + "/", "");
            logger.debug(" compressZip zipName {} ", zipName);
            //파일을 읽어들임
            fis = new FileInputStream(file);
            //Zip엔트리 생성(한글 깨짐 버그)
            ZipEntry zipEntry = new ZipEntry(zipName);
            //스트림에 밀어넣기 (자동 오픈)
            zos.putNextEntry(zipEntry);
            int length = (int) file.length();
            byte[] buffer = new byte[length];
            //스트림 읽어들이기
            fis.read(buffer, 0, length);
            zos.write(buffer, 0, length);

            zos.closeEntry();
        }catch(Throwable e) {
            throw e;
        } finally {
            if(fis != null)
                fis.close();
        }
    }
}

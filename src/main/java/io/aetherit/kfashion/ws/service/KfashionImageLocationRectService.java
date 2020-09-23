package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.*;
import io.aetherit.kfashion.ws.repository.KfashionCommentRepository;
import io.aetherit.kfashion.ws.repository.KfashionImageLocationRectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class KfashionImageLocationRectService {
    private KfashionImageLocationRectRepository repository;
    private KfashionWorkHistoryService kfashionWorkHistoryService;
    private KfashionWorkService kfashionWorkService;
    private KfashionCommentRepository kfashionCommentRepository;

    @Autowired
    public KfashionImageLocationRectService(KfashionImageLocationRectRepository repository,
                                            KfashionWorkHistoryService kfashionWorkHistoryService,
                                            KfashionWorkService kfashionWorkService,
                                            KfashionCommentRepository kfashionCommentRepository) {
        this.repository = repository;
        this.kfashionWorkHistoryService = kfashionWorkHistoryService;
        this.kfashionWorkService = kfashionWorkService;
        this.kfashionCommentRepository = kfashionCommentRepository;
    }

    public String insertLocationRect(KfashionImageLocationRect rect) {
        String msg = "success";
        repository.insertLocationRect(rect);
        return msg;
    }

    public List<KfashionImageLocationRect> selectLocationRectList(KfashionImageLocationRect rect) {
        return repository.selectLocationRectList(rect);
    }

    public List<KfashionImageLocationRect> selectRectNoList(Long workNo) {
        return repository.selectRectNoList(workNo);
    }

    public void deleteRect(Map<String, Object> deleteMap) {
        repository.deleteRect(deleteMap);
    }

    public int[] selectRectNo(Long workNo) {
        return repository.selectRectNo(workNo);
    }

    public List<KfashionImageLocationRect> selectOuterRectList(Long workNo) {
        return repository.selectOuterRectList(workNo);
    }

    public List<KfashionImageLocationRect> selectTopRectList(Long workNo) {
        return repository.selectTopRectList(workNo);
    }

    public List<KfashionImageLocationRect> selectPantsRectList(Long workNo) {
        return repository.selectPantsRectList(workNo);
    }

    public List<KfashionImageLocationRect> selectOnePieceRectList(Long workNo) {
        return repository.selectOnePieceRectList(workNo);
    }

    public void deleteRectAll(KfashionImage workImage) {
        repository.deleteRectAll(workImage);
    }

    @Transactional(rollbackFor = {RuntimeException.class, SQLException.class, Exception.class})
    public void setLocationRect(List<KfashionRectList> rectList) {
        KfashionWork work = new KfashionWork();
        work.setNo(rectList.get(0).getWorkNo());
        work.setWorkState(rectList.get(0).getWorkStep());
        kfashionWorkService.updateWork(work);

        KfashionWorkHistory workHistory = new KfashionWorkHistory();
        workHistory.setWorkNo(rectList.get(0).getWorkNo());
        workHistory.setWorkStep(rectList.get(0).getWorkStep());
        workHistory.setCreatedId(rectList.get(0).getCreatedId());
        kfashionWorkHistoryService.insertWorkHistory(workHistory);


        KfashionImageLocationRect rect = new KfashionImageLocationRect();
        for (int i = 0; i < rectList.size(); i++) {
            rect.setWorkNo(rectList.get(i).getWorkNo());
            rect.setWorkStep(rectList.get(i).getWorkStep());
            rect.setRectNo(rectList.get(i).getId());
            rect.setLocationX(rectList.get(i).getLeft());
            rect.setLocationY(rectList.get(i).getTop());
            rect.setLocationWidth(rectList.get(i).getWidth());
            rect.setLocationHeight(rectList.get(i).getHeight());
            rect.setScaleX(rectList.get(i).getScaleX());
            rect.setScaleY(rectList.get(i).getScaleY());
            repository.insertLocationRect(rect);
        }
    }

    @Transactional(rollbackFor = {RuntimeException.class, SQLException.class, Exception.class})
    public void updateLocationRect(List<KfashionRectList> rectList) {
        KfashionImageLocationRect rect = new KfashionImageLocationRect();
        for (int i = 0; i < rectList.size(); i++) {
            Map<String, Object> updateMap = new HashMap<>();
            updateMap.put("workNo", rectList.get(i).getWorkNo());
            updateMap.put("workStep", 3);
            updateMap.put("workType", rectList.get(i).getId());
            kfashionCommentRepository.updatePolyComment(updateMap);

            rect.setWorkNo(rectList.get(i).getWorkNo());
            rect.setWorkStep(rectList.get(i).getWorkStep());
            rect.setRectNo(rectList.get(i).getId());
            rect.setLocationX(rectList.get(i).getLeft());
            rect.setLocationY(rectList.get(i).getTop());
            rect.setLocationWidth(rectList.get(i).getWidth());
            rect.setLocationHeight(rectList.get(i).getHeight());
            rect.setScaleX(rectList.get(i).getScaleX());
            rect.setScaleY(rectList.get(i).getScaleY());
            repository.insertLocationRect(rect);
        }
    }
}

package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.*;
import io.aetherit.kfashion.ws.repository.KfashionCommentRepository;
import io.aetherit.kfashion.ws.repository.KfashionLabelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class KfashionLabelService {
    private KfashionLabelRepository repository;
    private KfashionWorkHistoryService kfashionWorkHistoryService;
    private KfashionWorkService kfashionWorkService;
    private KfashionCommentRepository kfashionCommentRepository;

    @Autowired
    public KfashionLabelService(KfashionLabelRepository repository,
                                KfashionWorkHistoryService kfashionWorkHistoryService,
                                KfashionWorkService kfashionWorkService,
                                KfashionCommentRepository kfashionCommentRepository) {
        this.repository = repository;
        this.kfashionWorkHistoryService = kfashionWorkHistoryService;
        this.kfashionWorkService = kfashionWorkService;
        this.kfashionCommentRepository = kfashionCommentRepository;
    }

    public void insertBasicLabel(KfashionLabel basic) {
        repository.insertBasicLabel(basic);
    }

    public void insertProfessionalLabel(KfashionLabel professional) {
        repository.insertProfessionalLabel(professional);
    }

    public List<KfashionLabel> selectBasicLabelList(String createdId) {
        return repository.selectBasicLabelList(createdId);
    }

    public List<KfashionLabel> selectOuterReviewLabelList(Long workNo) {
        return repository.selectOuterReviewLabelList(workNo);
    }

    public List<KfashionLabel> selectTopReviewLabelList(Long workNo) {
        return repository.selectTopReviewLabelList(workNo);
    }

    public List<KfashionLabel> selectPantsReviewLabelList(Long workNo) {
        return repository.selectPantsReviewLabelList(workNo);
    }

    public List<KfashionLabel> selectOnePieceReviewLabelList(Long workNo) {
        return repository.selectOnePieceReviewLabelList(workNo);
    }

    public int[] selectLabelList(Long workNo) {
        return repository.selectLabelList(workNo);
    }

    public int[] selectHighLabelList(Long workNo) {
        return repository.selectHighLabelList(workNo);
    }

    public List<KfashionLabel> selectOuterReviewHighLabelList(Long workNo) {
        return repository.selectOuterReviewHighLabelList(workNo);
    }

    public List<KfashionLabel> selectTopReviewHighLabelList(Long workNo) {
        return repository.selectTopReviewHighLabelList(workNo);
    }

    public List<KfashionLabel> selectPantsReviewHighLabelList(Long workNo) {
        return repository.selectPantsReviewHighLabelList(workNo);
    }

    public List<KfashionLabel> selectOnePieceReviewHighLabelList(Long workNo) {
        return repository.selectOnePieceReviewHighLabelList(workNo);
    }

    public List<KfashionLabel> selectStyleReviewLabelList(Long workNo) {
        return repository.selectStyleReviewLabelList(workNo);
    }

    @Transactional(rollbackFor = {RuntimeException.class, SQLException.class, Exception.class})
    public void deleteProfessionalLabel(long workNo) {
        HashMap<String, Object> deleteMap = new HashMap<String, Object>();
        deleteMap.put("workNo", workNo);
        deleteMap.put("workStep", 6);
        repository.deleteProfessionalLabel(deleteMap);
        kfashionWorkHistoryService.deleteProfessionalLabelWorkHistory(deleteMap);
    }

    @Transactional(rollbackFor = {RuntimeException.class, SQLException.class, Exception.class})
    public void deleteBasicLabel(long workNo) {
        HashMap<String, Object> deleteMap = new HashMap<String, Object>();
        deleteMap.put("workNo", workNo);
        deleteMap.put("workStep", 4);
        repository.deleteBasicLabel(deleteMap);
    }

    public List<Integer> selectLabelNoList(Long workNo) {
        return repository.selectLabelNoList(workNo);
    }

    public void deleteLabelAll(KfashionImage workImage) {
        repository.deleteLabelAll(workImage);
    }

    @Transactional(rollbackFor = {RuntimeException.class, SQLException.class, Exception.class})
    public void setBasicLabel(BasicLabel basicLabel) {
        KfashionWork work = new KfashionWork();
        work.setNo(basicLabel.getWorkNo());
        work.setWorkState(basicLabel.getWorkStep());
        kfashionWorkService.updateWork(work);

        KfashionWorkHistory workHistory = new KfashionWorkHistory();
        workHistory.setWorkNo(basicLabel.getWorkNo());
        workHistory.setWorkStep(basicLabel.getWorkStep());
        workHistory.setCreatedId(basicLabel.getCreatedId());
        kfashionWorkHistoryService.insertWorkHistory(workHistory);

        if (basicLabel.getLabelNo1() == 1) {
            KfashionLabel basic1 = new KfashionLabel();
            basic1.setWorkNo(basicLabel.getWorkNo());
            basic1.setWorkStep(basicLabel.getWorkStep());
            basic1.setLabelNo(1);
            basic1.setNo(1);
            basic1.setCategoryNo(basicLabel.getColorCategoryNo1());
            basic1.setCategoryItemNo(basicLabel.getColor1());
            basic1.setCreatedId(basicLabel.getCreatedId());
            repository.insertBasicLabel(basic1);
            if (basicLabel.getSubColor1() != 0) {
                basic1.setNo(2);
                basic1.setCategoryNo(basicLabel.getSubColorCategoryNo1());
                basic1.setCategoryItemNo(basicLabel.getSubColor1());
                repository.insertBasicLabel(basic1);
            }
            basic1.setNo(3);
            basic1.setCategoryNo(basicLabel.getSleeveLengthCategoryNo1());
            basic1.setCategoryItemNo(basicLabel.getSleeveLength1());
            repository.insertBasicLabel(basic1);
        }
        if (basicLabel.getLabelNo2() == 2) {
            KfashionLabel basic2 = new KfashionLabel();
            basic2.setWorkNo(basicLabel.getWorkNo());
            basic2.setWorkStep(basicLabel.getWorkStep());
            basic2.setLabelNo(2);
            basic2.setNo(1);
            basic2.setCategoryNo(basicLabel.getColorCategoryNo2());
            basic2.setCategoryItemNo(basicLabel.getColor2());
            basic2.setCreatedId(basicLabel.getCreatedId());
            repository.insertBasicLabel(basic2);
            if (basicLabel.getSubColor2() != 0) {
                basic2.setNo(2);
                basic2.setCategoryNo(basicLabel.getSubColorCategoryNo2());
                basic2.setCategoryItemNo(basicLabel.getSubColor2());
                repository.insertBasicLabel(basic2);
            }
            basic2.setNo(3);
            basic2.setCategoryNo(basicLabel.getSleeveLengthCategoryNo2());
            basic2.setCategoryItemNo(basicLabel.getSleeveLength2());
            repository.insertBasicLabel(basic2);
        }
        if (basicLabel.getLabelNo3() == 3) {
            KfashionLabel basic3 = new KfashionLabel();
            basic3.setWorkNo(basicLabel.getWorkNo());
            basic3.setWorkStep(basicLabel.getWorkStep());
            basic3.setLabelNo(3);
            basic3.setNo(1);
            basic3.setCategoryNo(basicLabel.getColorCategoryNo3());
            basic3.setCategoryItemNo(basicLabel.getColor3());
            basic3.setCreatedId(basicLabel.getCreatedId());
            repository.insertBasicLabel(basic3);
            if (basicLabel.getSubColor3() != 0) {
                basic3.setNo(2);
                basic3.setCategoryNo(basicLabel.getSubColorCategoryNo3());
                basic3.setCategoryItemNo(basicLabel.getSubColor3());
                repository.insertBasicLabel(basic3);
            }
        }
        if (basicLabel.getLabelNo4() == 4) {
            KfashionLabel basic4 = new KfashionLabel();
            basic4.setWorkNo(basicLabel.getWorkNo());
            basic4.setWorkStep(basicLabel.getWorkStep());
            basic4.setLabelNo(4);
            basic4.setNo(1);
            basic4.setCategoryNo(basicLabel.getColorCategoryNo4());
            basic4.setCategoryItemNo(basicLabel.getColor4());
            basic4.setCreatedId(basicLabel.getCreatedId());
            repository.insertBasicLabel(basic4);
            if (basicLabel.getSubColor4() != 0) {
                basic4.setNo(2);
                basic4.setCategoryNo(basicLabel.getSubColorCategoryNo4());
                basic4.setCategoryItemNo(basicLabel.getSubColor4());
                repository.insertBasicLabel(basic4);
            }
            basic4.setNo(3);
            basic4.setCategoryNo(basicLabel.getSleeveLengthCategoryNo4());
            basic4.setCategoryItemNo(basicLabel.getSleeveLength4());
            repository.insertBasicLabel(basic4);
        }
    }

    @Transactional(rollbackFor = {RuntimeException.class, SQLException.class, Exception.class})
    public void setProfessionalLabel(ProfessionalLabel professionalLabel) {
        KfashionWork work = new KfashionWork();
        work.setNo(professionalLabel.getWorkNo());
        work.setWorkState(professionalLabel.getWorkStep());
        kfashionWorkService.updateWork(work);

        KfashionWorkHistory workHistory = new KfashionWorkHistory();
        workHistory.setWorkNo(professionalLabel.getWorkNo());
        workHistory.setWorkStep(professionalLabel.getWorkStep());
        workHistory.setCreatedId(professionalLabel.getCreatedId());
        kfashionWorkHistoryService.insertWorkHistory(workHistory);

        if (professionalLabel.getLabelNo5() == 5) {
            KfashionLabel professional5 = new KfashionLabel();
            professional5.setWorkNo(professionalLabel.getWorkNo());
            professional5.setWorkStep(professionalLabel.getWorkStep());
            professional5.setLabelNo(professionalLabel.getLabelNo5());
            if (professionalLabel.getStyleCategoryNo() != 0) {
                professional5.setCategoryNo(professionalLabel.getStyleCategoryNo());
                professional5.setCategoryItemNo(professionalLabel.getStyle());
                professional5.setCreatedId(professionalLabel.getCreatedId());
                repository.insertProfessionalLabel(professional5);
            }
            if (professionalLabel.getStyleSub() != 0) {
                professional5.setCategoryNo(professionalLabel.getStyleCategorySubNo());
                professional5.setCategoryItemNo(professionalLabel.getStyleSub());
                repository.insertProfessionalLabel(professional5);
            }
        }


        if (professionalLabel.getLabelNo1() == 1) {
            KfashionLabel professional1 = new KfashionLabel();
            professional1.setCreatedId(professionalLabel.getCreatedId());
            professional1.setWorkNo(professionalLabel.getWorkNo());
            professional1.setWorkStep(professionalLabel.getWorkStep());
            professional1.setLabelNo(professionalLabel.getLabelNo1());

            if (professionalLabel.getCategoryCategoryNo1() != 0) {
                professional1.setCategoryNo(professionalLabel.getCategoryCategoryNo1());
                professional1.setCategoryItemNo(professionalLabel.getCategory1());
                repository.insertProfessionalLabel(professional1);
            }

            if (professionalLabel.getDetailCategoryNo1().size() > 0) {
                for (int i = 0; i < professionalLabel.getDetail1().size(); i++) {
                    professional1.setCategoryNo(professionalLabel.getDetailCategoryNo1().get(i));
                    professional1.setCategoryItemNo(professionalLabel.getDetail1().get(i));
                    repository.insertProfessionalLabel(professional1);
                }
            }
            if (professionalLabel.getPrintCategoryNo1().size() > 0) {
                for (int i = 0; i < professionalLabel.getPrint1().size(); i++) {
                    professional1.setCategoryNo(professionalLabel.getPrintCategoryNo1().get(i));
                    professional1.setCategoryItemNo(professionalLabel.getPrint1().get(i));
                    repository.insertProfessionalLabel(professional1);
                }
            }
            if (professionalLabel.getTextureCategoryNo1().size() > 0) {
                for (int i = 0; i < professionalLabel.getTexture1().size(); i++) {
                    professional1.setCategoryNo(professionalLabel.getTextureCategoryNo1().get(i));
                    professional1.setCategoryItemNo(professionalLabel.getTexture1().get(i));
                    repository.insertProfessionalLabel(professional1);
                }
            }
            if (professionalLabel.getClothLengthCategoryNo1() != 0) {
                professional1.setCategoryNo(professionalLabel.getClothLengthCategoryNo1());
                professional1.setCategoryItemNo(professionalLabel.getClothLength1());
                repository.insertProfessionalLabel(professional1);
            }
            if (professionalLabel.getNeckLineCategoryNo1() != 0) {
                professional1.setCategoryNo(professionalLabel.getNeckLineCategoryNo1());
                professional1.setCategoryItemNo(professionalLabel.getNeckLine1());
                repository.insertProfessionalLabel(professional1);
            }
            if (professionalLabel.getKaraCategoryNo1() != 0) {
                professional1.setCategoryNo(professionalLabel.getKaraCategoryNo1());
                professional1.setCategoryItemNo(professionalLabel.getKara1());
                repository.insertProfessionalLabel(professional1);
            }
            if (professionalLabel.getFitCategoryNo1() != 0) {
                professional1.setCategoryNo(professionalLabel.getFitCategoryNo1());
                professional1.setCategoryItemNo(professionalLabel.getFit1());
                repository.insertProfessionalLabel(professional1);
            }
        }
        if (professionalLabel.getLabelNo2() == 2) {
            KfashionLabel professional2 = new KfashionLabel();
            professional2.setCreatedId(professionalLabel.getCreatedId());
            professional2.setWorkNo(professionalLabel.getWorkNo());
            professional2.setWorkStep(professionalLabel.getWorkStep());
            professional2.setLabelNo(professionalLabel.getLabelNo2());

            if (professionalLabel.getCategoryCategoryNo2() != 0) {
                professional2.setCategoryNo(professionalLabel.getCategoryCategoryNo2());
                professional2.setCategoryItemNo(professionalLabel.getCategory2());
                repository.insertProfessionalLabel(professional2);

            }
            if (professionalLabel.getDetailCategoryNo2().size() > 0) {
                for (int i = 0; i < professionalLabel.getDetail2().size(); i++) {
                    professional2.setCategoryNo(professionalLabel.getDetailCategoryNo2().get(i));
                    professional2.setCategoryItemNo(professionalLabel.getDetail2().get(i));
                    repository.insertProfessionalLabel(professional2);
                }
            }
            if (professionalLabel.getPrintCategoryNo2().size() > 0) {
                for (int i = 0; i < professionalLabel.getPrint2().size(); i++) {
                    professional2.setCategoryNo(professionalLabel.getPrintCategoryNo2().get(i));
                    professional2.setCategoryItemNo(professionalLabel.getPrint2().get(i));
                    repository.insertProfessionalLabel(professional2);
                }
            }
            if (professionalLabel.getTextureCategoryNo2().size() > 0) {
                for (int i = 0; i < professionalLabel.getTexture2().size(); i++) {
                    professional2.setCategoryNo(professionalLabel.getTextureCategoryNo2().get(i));
                    professional2.setCategoryItemNo(professionalLabel.getTexture2().get(i));
                    repository.insertProfessionalLabel(professional2);
                }
            }
            if (professionalLabel.getClothLengthCategoryNo2() != 0) {
                professional2.setCategoryNo(professionalLabel.getClothLengthCategoryNo2());
                professional2.setCategoryItemNo(professionalLabel.getClothLength2());
                repository.insertProfessionalLabel(professional2);
            }
            if (professionalLabel.getNeckLineCategoryNo2() != 0) {
                professional2.setCategoryNo(professionalLabel.getNeckLineCategoryNo2());
                professional2.setCategoryItemNo(professionalLabel.getNeckLine2());
                repository.insertProfessionalLabel(professional2);
            }
            if (professionalLabel.getKaraCategoryNo2() != 0) {
                professional2.setCategoryNo(professionalLabel.getKaraCategoryNo2());
                professional2.setCategoryItemNo(professionalLabel.getKara2());
                repository.insertProfessionalLabel(professional2);
            }
            if (professionalLabel.getFitCategoryNo2() != 0) {
                professional2.setCategoryNo(professionalLabel.getFitCategoryNo2());
                professional2.setCategoryItemNo(professionalLabel.getFit2());
                repository.insertProfessionalLabel(professional2);
            }
        }
        if (professionalLabel.getLabelNo3() == 3) {
            KfashionLabel professional3 = new KfashionLabel();
            professional3.setCreatedId(professionalLabel.getCreatedId());
            professional3.setWorkNo(professionalLabel.getWorkNo());
            professional3.setWorkStep(professionalLabel.getWorkStep());
            professional3.setLabelNo(professionalLabel.getLabelNo3());
            if (professionalLabel.getCategoryCategoryNo3() != 0) {
                professional3.setCategoryNo(professionalLabel.getCategoryCategoryNo3());
                professional3.setCategoryItemNo(professionalLabel.getCategory3());
                repository.insertProfessionalLabel(professional3);
            }
            if (professionalLabel.getDetailCategoryNo3().size() > 0) {
                for (int i = 0; i < professionalLabel.getDetailCategoryNo3().size(); i++) {
                    professional3.setCategoryNo(professionalLabel.getDetailCategoryNo3().get(i));
                    professional3.setCategoryItemNo(professionalLabel.getDetail3().get(i));
                    repository.insertProfessionalLabel(professional3);
                }
            }


            if (professionalLabel.getPrintCategoryNo3().size() > 0) {
                for (int i = 0; i < professionalLabel.getPrint3().size(); i++) {
                    professional3.setCategoryNo(professionalLabel.getPrintCategoryNo3().get(i));
                    professional3.setCategoryItemNo(professionalLabel.getPrint3().get(i));
                    repository.insertProfessionalLabel(professional3);
                }
            }
            if (professionalLabel.getTextureCategoryNo3().size() > 0) {
                for (int i = 0; i < professionalLabel.getTexture3().size(); i++) {
                    professional3.setCategoryNo(professionalLabel.getTextureCategoryNo3().get(i));
                    professional3.setCategoryItemNo(professionalLabel.getTexture3().get(i));
                    repository.insertProfessionalLabel(professional3);
                }
            }
            if (professionalLabel.getClothLengthCategoryNo3() != 0) {
                professional3.setCategoryNo(professionalLabel.getClothLengthCategoryNo3());
                professional3.setCategoryItemNo(professionalLabel.getClothLength3());
                repository.insertProfessionalLabel(professional3);
            }
            if (professionalLabel.getFitCategoryNo3() != 0) {
                professional3.setCategoryNo(professionalLabel.getFitCategoryNo3());
                professional3.setCategoryItemNo(professionalLabel.getFit3());
                repository.insertProfessionalLabel(professional3);
            }
        }
        if (professionalLabel.getLabelNo4() == 4) {
            KfashionLabel professional4 = new KfashionLabel();
            professional4.setCreatedId(professionalLabel.getCreatedId());
            professional4.setWorkNo(professionalLabel.getWorkNo());
            professional4.setWorkStep(professionalLabel.getWorkStep());
            professional4.setLabelNo(professionalLabel.getLabelNo4());

            if (professionalLabel.getCategoryCategoryNo4() != 0) {
                professional4.setCategoryNo(professionalLabel.getCategoryCategoryNo4());
                professional4.setCategoryItemNo(professionalLabel.getCategory4());
                repository.insertProfessionalLabel(professional4);
            }
            if (professionalLabel.getDetailCategoryNo4().size() > 0) {
                for (int i = 0; i < professionalLabel.getDetailCategoryNo4().size(); i++) {
                    professional4.setCategoryNo(professionalLabel.getDetailCategoryNo4().get(i));
                    professional4.setCategoryItemNo(professionalLabel.getDetail4().get(i));
                    repository.insertProfessionalLabel(professional4);
                }
            }
            if (professionalLabel.getPrintCategoryNo4().size() > 0) {
                for (int i = 0; i < professionalLabel.getPrint4().size(); i++) {
                    professional4.setCategoryNo(professionalLabel.getPrintCategoryNo4().get(i));
                    professional4.setCategoryItemNo(professionalLabel.getPrint4().get(i));
                    repository.insertProfessionalLabel(professional4);
                }
            }
            if (professionalLabel.getTextureCategoryNo4().size() > 0) {
                for (int i = 0; i < professionalLabel.getTexture4().size(); i++) {
                    professional4.setCategoryNo(professionalLabel.getTextureCategoryNo4().get(i));
                    professional4.setCategoryItemNo(professionalLabel.getTexture4().get(i));
                    repository.insertProfessionalLabel(professional4);
                }
            }
            if (professionalLabel.getClothLengthCategoryNo4() != 0) {
                professional4.setCategoryNo(professionalLabel.getClothLengthCategoryNo4());
                professional4.setCategoryItemNo(professionalLabel.getClothLength4());
                repository.insertProfessionalLabel(professional4);
            }
            if (professionalLabel.getNeckLineCategoryNo4() != 0) {
                professional4.setCategoryNo(professionalLabel.getNeckLineCategoryNo4());
                professional4.setCategoryItemNo(professionalLabel.getNeckLine4());
                repository.insertProfessionalLabel(professional4);
            }
            if (professionalLabel.getKaraCategoryNo4() != 0) {
                professional4.setCategoryNo(professionalLabel.getKaraCategoryNo4());
                professional4.setCategoryItemNo(professionalLabel.getKara4());
                repository.insertProfessionalLabel(professional4);
            }
            if (professionalLabel.getFitCategoryNo4() != 0) {
                professional4.setCategoryNo(professionalLabel.getFitCategoryNo4());
                professional4.setCategoryItemNo(professionalLabel.getFit4());
                repository.insertProfessionalLabel(professional4);
            }
        }
    }

    @Transactional(rollbackFor = {RuntimeException.class, SQLException.class, Exception.class})
    public void updateBasicLabel(BasicLabel basicLabel) {
        Map<String, Object> updateMap = new HashMap<>();
        updateMap.put("workNo", basicLabel.getWorkNo());
        updateMap.put("workStep", basicLabel.getWorkStep());
        kfashionCommentRepository.updateComment(updateMap);
        if (basicLabel.getLabelNo1() == 1) {
            KfashionLabel basic1 = new KfashionLabel();
            basic1.setWorkNo(basicLabel.getWorkNo());
            basic1.setWorkStep(basicLabel.getWorkStep());
            basic1.setLabelNo(1);
            basic1.setNo(1);
            basic1.setCategoryNo(basicLabel.getColorCategoryNo1());
            basic1.setCategoryItemNo(basicLabel.getColor1());
            basic1.setCreatedId(basicLabel.getCreatedId());
            repository.insertBasicLabel(basic1);
            if (basicLabel.getSubColor1() != 0) {
                basic1.setNo(2);
                basic1.setCategoryNo(basicLabel.getSubColorCategoryNo1());
                basic1.setCategoryItemNo(basicLabel.getSubColor1());
                repository.insertBasicLabel(basic1);
            }
            basic1.setNo(3);
            basic1.setCategoryNo(basicLabel.getSleeveLengthCategoryNo1());
            basic1.setCategoryItemNo(basicLabel.getSleeveLength1());
            repository.insertBasicLabel(basic1);
        }
        if (basicLabel.getLabelNo2() == 2) {
            KfashionLabel basic2 = new KfashionLabel();
            basic2.setWorkNo(basicLabel.getWorkNo());
            basic2.setWorkStep(basicLabel.getWorkStep());
            basic2.setLabelNo(2);
            basic2.setNo(1);
            basic2.setCategoryNo(basicLabel.getColorCategoryNo2());
            basic2.setCategoryItemNo(basicLabel.getColor2());
            basic2.setCreatedId(basicLabel.getCreatedId());
            repository.insertBasicLabel(basic2);
            if (basicLabel.getSubColor2() != 0) {
                basic2.setNo(2);
                basic2.setCategoryNo(basicLabel.getSubColorCategoryNo2());
                basic2.setCategoryItemNo(basicLabel.getSubColor2());
                repository.insertBasicLabel(basic2);
            }
            basic2.setNo(3);
            basic2.setCategoryNo(basicLabel.getSleeveLengthCategoryNo2());
            basic2.setCategoryItemNo(basicLabel.getSleeveLength2());
            repository.insertBasicLabel(basic2);
        }
        if (basicLabel.getLabelNo3() == 3) {
            KfashionLabel basic3 = new KfashionLabel();
            basic3.setWorkNo(basicLabel.getWorkNo());
            basic3.setWorkStep(basicLabel.getWorkStep());
            basic3.setLabelNo(3);
            basic3.setNo(1);
            basic3.setCategoryNo(basicLabel.getColorCategoryNo3());
            basic3.setCategoryItemNo(basicLabel.getColor3());
            basic3.setCreatedId(basicLabel.getCreatedId());
            repository.insertBasicLabel(basic3);
            if (basicLabel.getSubColor3() != 0) {
                basic3.setNo(2);
                basic3.setCategoryNo(basicLabel.getSubColorCategoryNo3());
                basic3.setCategoryItemNo(basicLabel.getSubColor3());
                repository.insertBasicLabel(basic3);
            }
        }
        if (basicLabel.getLabelNo4() == 4) {
            KfashionLabel basic4 = new KfashionLabel();
            basic4.setWorkNo(basicLabel.getWorkNo());
            basic4.setWorkStep(basicLabel.getWorkStep());
            basic4.setLabelNo(4);
            basic4.setNo(1);
            basic4.setCategoryNo(basicLabel.getColorCategoryNo4());
            basic4.setCategoryItemNo(basicLabel.getColor4());
            basic4.setCreatedId(basicLabel.getCreatedId());
            repository.insertBasicLabel(basic4);
            if (basicLabel.getSubColor3() != 0) {
                basic4.setNo(2);
                basic4.setCategoryNo(basicLabel.getSubColorCategoryNo4());
                basic4.setCategoryItemNo(basicLabel.getSubColor4());
                repository.insertBasicLabel(basic4);
            }
            basic4.setNo(3);
            basic4.setCategoryNo(basicLabel.getSleeveLengthCategoryNo4());
            basic4.setCategoryItemNo(basicLabel.getSleeveLength4());
            repository.insertBasicLabel(basic4);
        }
    }
}

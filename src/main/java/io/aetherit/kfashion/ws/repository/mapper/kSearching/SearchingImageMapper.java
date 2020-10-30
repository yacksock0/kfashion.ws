package io.aetherit.kfashion.ws.repository.mapper.kSearching;

import io.aetherit.kfashion.ws.model.kSearching.SearchingImage;
import io.aetherit.kfashion.ws.model.kSearching.SearchingLabel;

import java.util.List;

public interface SearchingImageMapper {

    List<SearchingImage> selectImageList(int style, int category, int color, int startPage, int endPage, int rowsPerPage);

    Long selectImageListTotalCount(int style, int category, int color);
}

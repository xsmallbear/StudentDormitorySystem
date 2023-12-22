package com.smallbear.studs.servlet;

import com.smallbear.studs.dao.BuildingDao;
import com.smallbear.studs.model.Building;
import com.smallbear.studs.model.DataResponse;
import com.smallbear.studs.util.ServletUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

public class GetBuildingCountServlet extends HttpServlet {
    BuildingDao buildingsDao = new BuildingDao();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        DataResponse dataResponse = new DataResponse();
        int buildingCount = buildingsDao.getCount();
        dataResponse.setCode(HttpServletResponse.SC_OK);
        dataResponse.setData(buildingCount);
        ServletUtil.sendJsonDataToResponse(resp, dataResponse);
    }
}

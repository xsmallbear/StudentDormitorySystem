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
import java.util.ArrayList;
import java.util.List;

public class GetBuildingsServlet extends HttpServlet {
    BuildingDao buildingsDao = new BuildingDao();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String limit = req.getParameter("limit");
        String offset = req.getParameter("offset");
        DataResponse dataResponse = new DataResponse();
        List<Building> buildingsList;
        if (limit != null && offset != null && !limit.isEmpty() && !offset.isEmpty()) {
            System.out.println("分页");
            buildingsList = buildingsDao.gets(Integer.parseInt(limit), Integer.parseInt(offset));
            System.out.println(buildingsList.size());
        } else {
            System.out.println("不分页");
            buildingsList = buildingsDao.gets();
            System.out.println(buildingsList.size());
        }
        dataResponse.setCode(HttpServletResponse.SC_OK);
        dataResponse.setData(buildingsList);
        ServletUtil.sendJsonDataToResponse(resp, dataResponse);
    }
}

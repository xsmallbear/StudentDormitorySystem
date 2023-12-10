package com.smallbear.studs.servlet;

import com.smallbear.studs.dao.BuildingDao;
import com.smallbear.studs.model.Building;
import com.smallbear.studs.util.ServletUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

public class GetBuildingsApi extends HttpServlet {
    BuildingDao buildingsDao = new BuildingDao();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Building> buildingsList = buildingsDao.getAllBuildings();
        ServletUtil.sendJsonDataToResponse(resp, buildingsList);
    }
}

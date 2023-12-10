package com.smallbear.studs.servlet;

import com.smallbear.studs.dao.BuildingsDao;
import com.smallbear.studs.model.Buildings;
import com.smallbear.studs.util.ServletUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class GetBuildingsApi extends HttpServlet {
    BuildingsDao buildingsDao = new BuildingsDao();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Buildings> buildingsList = buildingsDao.getAllBuilding();
        ServletUtil.sendJsonDataToResponse(resp, buildingsList);
    }
}

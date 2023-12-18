package com.smallbear.studs.servlet;

import com.fasterxml.jackson.databind.JsonNode;
import com.smallbear.studs.dao.DormitoryDao;
import com.smallbear.studs.model.DataResponse;
import com.smallbear.studs.model.Dormitory;
import com.smallbear.studs.util.ServletUtil;
import com.smallbear.studs.util.ValidatorUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

public class GetDormitoryServlet extends HttpServlet {
    DormitoryDao dormitoryDao = new DormitoryDao();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        DataResponse dataResponse = new DataResponse();
        try {
//            JsonNode jsonNode = ServletUtil.readRequestBody(req, false);
//
//            JsonNode nameNode = jsonNode.get("buildingId");
            String buildingId = req.getParameter("buildingId");

            if (buildingId == null || buildingId.isEmpty()) {
                //no exist buildingId get all
                List<Dormitory> dormitoryList = dormitoryDao.gets();
                dataResponse.setCode(HttpServletResponse.SC_OK);
                dataResponse.setData(dormitoryList);
                ServletUtil.sendJsonDataToResponse(resp, dataResponse);
            } else {
                //exist buildingId
                List<Dormitory> dormitoryList = dormitoryDao.getsByBuildingId(buildingId);
                dataResponse.setCode(HttpServletResponse.SC_OK);
                dataResponse.setData(dormitoryList);
                ServletUtil.sendJsonDataToResponse(resp, dataResponse);
            }
        } catch (IllegalArgumentException e) {
            dataResponse.setCode(HttpServletResponse.SC_BAD_REQUEST);
            dataResponse.setMessage(e.getMessage());
            ServletUtil.sendJsonDataToResponse(resp, dataResponse);
        } catch (Exception e) {
            dataResponse.setCode(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            dataResponse.setMessage("服务器内部错误");
            ServletUtil.sendJsonDataToResponse(resp, dataResponse);
        }
    }
}

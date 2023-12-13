package com.smallbear.studs.servlet;

import com.fasterxml.jackson.databind.JsonNode;
import com.smallbear.studs.dao.BuildingDao;
import com.smallbear.studs.model.Building;
import com.smallbear.studs.model.DataResponse;
import com.smallbear.studs.util.ServletUtil;
import com.smallbear.studs.util.ValidatorUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class AddBuildingServlet extends HttpServlet {

    BuildingDao buildingDao = new BuildingDao();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        DataResponse dataResponse = new DataResponse();
        try {
            JsonNode jsonNode = ServletUtil.readRequestBody(req, false);

            JsonNode nameNode = jsonNode.get("newBuildingName");
            if (nameNode == null || ValidatorUtil.isBlank(nameNode.asText())) {
                dataResponse.setCode(HttpServletResponse.SC_BAD_REQUEST);
                dataResponse.setMessage("参数错误");
                ServletUtil.sendJsonDataToResponse(resp, dataResponse);
                return;
            }

            String newBuildingName = nameNode.asText();
            Building existingBuilding = buildingDao.getByBuildingName(newBuildingName);
            if (existingBuilding != null) {
                dataResponse.setCode(HttpServletResponse.SC_BAD_REQUEST);
                dataResponse.setMessage("楼栋名已经存在");
                ServletUtil.sendJsonDataToResponse(resp, dataResponse);
                return;
            }

            // Add the new building
            Building newBuilding = new Building();
            newBuilding.setName(newBuildingName);
            boolean success = buildingDao.addBuilding(newBuildingName);
            if (success) {
                dataResponse.setCode(HttpServletResponse.SC_OK);
                dataResponse.setMessage("楼栋添加成功");
                ServletUtil.sendJsonDataToResponse(resp, dataResponse);
            } else {
                dataResponse.setCode(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                dataResponse.setMessage("楼栋添加失败");
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

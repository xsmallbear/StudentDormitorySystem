package com.smallbear.studs.servlet;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smallbear.studs.dao.ManagerDao;
import com.smallbear.studs.model.DataResponse;
import com.smallbear.studs.model.Manager;
import com.smallbear.studs.util.JwtUtil;
import com.smallbear.studs.util.PwdSecureUtil;
import com.smallbear.studs.util.ServletUtil;
import com.smallbear.studs.util.ValidatorUtil;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class LoginApi extends HttpServlet {

    ManagerDao managersDao = new ManagerDao();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String jsonString = ServletUtil.readRequestBody(req);
        DataResponse dataResponse = new DataResponse();

        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode jsonNode;
        try {
            jsonNode = objectMapper.readTree(jsonString);
        } catch (Exception e) {
            dataResponse.setMessage("json解析错误");
            ServletUtil.sendJsonDataToResponse(resp, dataResponse);
            return;
        }
        if (jsonNode == null || jsonNode.isNull() || !jsonNode.isObject()) {
            ServletUtil.sendJsonDataToResponse(resp, dataResponse);
            return;
        }

        JsonNode nameNode = jsonNode.get("userName");
        JsonNode passwordNode = jsonNode.get("password");

        if (nameNode == null || ValidatorUtil.isBlank(nameNode.asText())) {
            dataResponse.setMessage("用户名不能为空");
            ServletUtil.sendJsonDataToResponse(resp, dataResponse);
            return;
        }

        if (passwordNode == null || ValidatorUtil.isBlank(passwordNode.asText())) {
            dataResponse.setMessage("密码不能为空");
            ServletUtil.sendJsonDataToResponse(resp, dataResponse);
            return;
        }

        String userName = nameNode.asText();
        String password = passwordNode.asText();

        Manager manager = managersDao.getManagerByName(userName);
        if (manager != null) {
            String salt = manager.getSalt();
            String pwdHash = manager.getPasswordHash();
            boolean result = PwdSecureUtil.verifyPassword(password, pwdHash, salt);
            System.out.println(salt + ":" + pwdHash);
            System.out.println(password);
            if (result) {
                String token = JwtUtil.createToken(2000);
                dataResponse.setCode(1);
                dataResponse.setMessage("登入成功");
                dataResponse.setData(String.format("{`token`:`%s`}", token));
            } else {
                dataResponse.setMessage("密码错误");
            }
            ServletUtil.sendJsonDataToResponse(resp, dataResponse);
            return;
        }
        dataResponse.setMessage("用户名不存在");
        ServletUtil.sendJsonDataToResponse(resp, dataResponse);
    }


}

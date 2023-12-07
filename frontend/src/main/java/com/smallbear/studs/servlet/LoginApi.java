package com.smallbear.studs.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.smallbear.studs.dao.ManagerDao;
import com.smallbear.studs.model.Manager;
import com.smallbear.studs.util.PwdSecureUtil;
import com.smallbear.studs.util.ServletUtil;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class LoginApi extends HttpServlet {

    ManagerDao managersDao = new ManagerDao();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String jsonString = ServletUtil.readRequestBody(req);
        JsonObject jsonObject = new Gson().fromJson(jsonString, JsonElement.class).getAsJsonObject();
        String userName = jsonObject.get("userName").getAsString();
        String password = jsonObject.get("password").getAsString();

        Map<String, Object> secureResult = new HashMap<>();

        Manager manager = managersDao.getManagerByName(userName);
        if (manager != null) {
            String salt = manager.getManagerSalt();
            String pwdHash = manager.getManagerPasswordHash();
            boolean result = PwdSecureUtil.verifyPassword(password, pwdHash, salt);
            if (result) secureResult.put("status", true);
            else {
                secureResult.put("status", false);
                secureResult.put("message", "password Error");
            }
            ServletUtil.sendJsonDataToResponse(resp, secureResult);
            return;
        }
        secureResult.put("status", false);
        secureResult.put("message", "error");
        ServletUtil.sendJsonDataToResponse(resp, secureResult);
    }


}

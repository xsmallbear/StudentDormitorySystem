package com.smallbear.studs.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.smallbear.studs.dao.ManagerDao;
import com.smallbear.studs.model.Manager;
import com.smallbear.studs.util.PwdSecureUtil;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;

public class LoginApi extends HttpServlet {

    ManagerDao managersDao = new ManagerDao();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String jsonString = readRequestBody(req);
        JsonObject jsonObject = new Gson().fromJson(jsonString, JsonElement.class).getAsJsonObject();
        String userName = jsonObject.get("userName").getAsString();
        String password = jsonObject.get("password").getAsString();

        Manager manager = managersDao.getManagerByName(userName);
        String salt = manager.getManagerSalt();
        String pwdHash = manager.getManagerPasswordHash();
        boolean result =  PwdSecureUtil.verifyPassword(password, pwdHash, salt);
        System.out.println(result);
    }

    public String readRequestBody(HttpServletRequest request) throws IOException {
        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }
        reader.close();
        return stringBuilder.toString();
    }


}

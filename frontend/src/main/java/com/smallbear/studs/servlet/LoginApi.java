package com.smallbear.studs.servlet;


import com.smallbear.studs.dao.ManagerDao;
import com.smallbear.studs.model.Managers;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

public class LoginApi extends HttpServlet {

    ManagerDao managersDao = new ManagerDao();
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("CALL SERVER");
        List<Managers> managers =  managersDao.getAllManagers();
        managers.forEach(data->{
            System.out.println(data.toString());
        });

        resp.getWriter().write("这是一个数据" + managers.size());
    }
}

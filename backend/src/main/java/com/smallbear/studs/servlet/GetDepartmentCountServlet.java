package com.smallbear.studs.servlet;

import com.smallbear.studs.dao.DepartmentDao;
import com.smallbear.studs.model.DataResponse;
import com.smallbear.studs.util.ServletUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class GetDepartmentCountServlet extends HttpServlet {

    DepartmentDao departmentDao = new DepartmentDao();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setCode(HttpServletResponse.SC_OK);
        int departmentCount = departmentDao.getCount();
        dataResponse.setData(departmentCount);
        ServletUtil.sendJsonDataToResponse(resp, dataResponse);
    }
}

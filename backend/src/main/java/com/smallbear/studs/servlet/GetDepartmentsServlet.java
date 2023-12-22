package com.smallbear.studs.servlet;

import com.smallbear.studs.dao.DepartmentDao;
import com.smallbear.studs.model.Building;
import com.smallbear.studs.model.DataResponse;
import com.smallbear.studs.model.Department;
import com.smallbear.studs.util.ServletUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

public class GetDepartmentsServlet extends HttpServlet {

    DepartmentDao departmentDao = new DepartmentDao();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String limit = req.getParameter("limit");
        String offset = req.getParameter("offset");
        DataResponse dataResponse = new DataResponse();
        List<Department> departmentList;
        if (limit != null && offset != null && !limit.isEmpty() && !offset.isEmpty()) {
            departmentList = departmentDao.gets(Integer.parseInt(limit), Integer.parseInt(offset));
            System.out.println(departmentList.size());
        } else {
            departmentList = departmentDao.gets();
            System.out.println(departmentList.size());
        }
        dataResponse.setCode(HttpServletResponse.SC_OK);
        dataResponse.setData(departmentList);
        ServletUtil.sendJsonDataToResponse(resp, dataResponse);
    }
}

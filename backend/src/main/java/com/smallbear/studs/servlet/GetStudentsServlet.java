package com.smallbear.studs.servlet;

import com.smallbear.studs.dao.StudentDao;
import com.smallbear.studs.model.Building;
import com.smallbear.studs.model.DataResponse;
import com.smallbear.studs.model.Student;
import com.smallbear.studs.util.ServletUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

public class GetStudentsServlet extends HttpServlet {
    StudentDao studentDao = new StudentDao();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String limit = req.getParameter("limit");
        String offset = req.getParameter("offset");
        DataResponse dataResponse = new DataResponse();
        List<Student> studentList;
        if (limit != null && offset != null && !limit.isEmpty() && !offset.isEmpty()) {
            studentList = studentDao.gets(Integer.parseInt(limit), Integer.parseInt(offset));
        } else {
            studentList = studentDao.gets();
        }
        dataResponse.setCode(HttpServletResponse.SC_OK);
        dataResponse.setData(studentList);
        ServletUtil.sendJsonDataToResponse(resp, dataResponse);
    }
}

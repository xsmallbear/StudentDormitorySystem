package com.smallbear.studs.dao;

import com.smallbear.studs.model.Building;
import com.smallbear.studs.model.Student;
import com.smallbear.studs.util.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class StudentDao {
    public List<Student> gets() {
        int defaultLimit = 1000;
        int defaultOffSet = 0;
        return this.gets(defaultLimit, defaultOffSet);
    }

    public List<Student> gets(int limit, int offset) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "SELECT * FROM `Student` ORDER BY name ASC LIMIT ? OFFSET ?";
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, limit);
            preparedStatement.setInt(2, offset);
            resultSet = preparedStatement.executeQuery();
            List<Student> studentList = new ArrayList<>();
            while (resultSet.next()) {
                String id = resultSet.getString("id");
                String name = resultSet.getString("name");
                String sex = resultSet.getString("sex");
                String departmentId = resultSet.getString("departmentId");
                String createTime = resultSet.getString("createTime");
                String updateTime = resultSet.getString("updateTime");
                Student student = new Student(id, name, sex, departmentId, createTime, updateTime);
                studentList.add(student);
            }
            return studentList;
        } catch (SQLException e) {
            e.fillInStackTrace();
        } finally {
            DBUtil.closeResource(resultSet, preparedStatement, connection);
        }
        return null;
    }

    public Integer getCount() {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "SELECT COUNT(1) as `count` FROM `Student`";
            preparedStatement = connection.prepareStatement(sql);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getInt("count");
            }
        } catch (SQLException e) {
            e.fillInStackTrace();
        } finally {
            DBUtil.closeResource(resultSet, preparedStatement, connection);
        }
        return null;
    }
}

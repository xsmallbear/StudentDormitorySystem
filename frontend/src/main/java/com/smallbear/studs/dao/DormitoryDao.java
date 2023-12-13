package com.smallbear.studs.dao;

import com.smallbear.studs.model.Dormitory;
import com.smallbear.studs.util.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DormitoryDao {

    final static int DEFAULT_LIMIT = 1000;
    final static int DEFAULT_OFFSET = 0;

    public List<Dormitory> gets() {
        return gets(DEFAULT_LIMIT, DEFAULT_OFFSET);
    }

    public List<Dormitory> gets(int limit, int offset) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "SELECT * FROM `Dormitory` ";
            sql += "ORDER BY IF(LENGTH(`roomNumber`) < 4, INSERT(`roomNumber`, CEILING((LENGTH(`roomNumber`)+1)/2), 0, '0'), `roomNumber`) ";
            sql += " LIMIT ? OFFSET ? ";
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, limit);
            preparedStatement.setInt(2, offset);
            resultSet = preparedStatement.executeQuery();
            List<Dormitory> dormitoryList = new ArrayList<Dormitory>();
            while (resultSet.next()) {
                String id = resultSet.getString("id");
                String type = resultSet.getString("type");
                String buildingId = resultSet.getString("buildingId");
                String roomNumber = resultSet.getString("roomNumber");
                String floor = resultSet.getString("floor");
                String status = resultSet.getString("status");
                String createTime = resultSet.getString("createTime");
                String updateTime = resultSet.getString("updateTime");
                Dormitory dormitory = new Dormitory(id, type, buildingId, roomNumber, floor, status, createTime, updateTime);
                dormitoryList.add(dormitory);
            }
            return dormitoryList;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBUtil.closeResource(resultSet, preparedStatement, connection);
        }
        return null;
    }

    public List<Dormitory> getsByBuildingId(String buildingId) {
        return getsByBuildingId(buildingId, DEFAULT_LIMIT, DEFAULT_OFFSET);
    }

    public List<Dormitory> getsByBuildingId(String buildingIdParam, int limit, int offset) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "SELECT * FROM `Dormitory` ";
            sql += "WHERE `buildingId` = ? ";
            sql += "ORDER BY IF(LENGTH(`roomNumber`) < 4, INSERT(`roomNumber`, CEILING((LENGTH(`roomNumber`)+1)/2), 0, '0'), `roomNumber`) ";
            sql += " LIMIT ? OFFSET ? ";
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, buildingIdParam);
            preparedStatement.setInt(2, limit);
            preparedStatement.setInt(3, offset);
            resultSet = preparedStatement.executeQuery();
            List<Dormitory> dormitoryList = new ArrayList<Dormitory>();
            while (resultSet.next()) {
                String id = resultSet.getString("id");
                String type = resultSet.getString("type");
                String buildingId = resultSet.getString("buildingId");
                String roomNumber = resultSet.getString("roomNumber");
                String floor = resultSet.getString("floor");
                String status = resultSet.getString("status");
                String createTime = resultSet.getString("createTime");
                String updateTime = resultSet.getString("updateTime");
                Dormitory dormitory = new Dormitory(id, type, buildingId, roomNumber, floor, status, createTime, updateTime);
                dormitoryList.add(dormitory);
            }
            return dormitoryList;
        } catch (SQLException e) {
            e.fillInStackTrace();
        } finally {
            DBUtil.closeResource(resultSet, preparedStatement, connection);
        }
        return null;
    }
}

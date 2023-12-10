package com.smallbear.studs.dao;


import com.smallbear.studs.model.Buildings;
import com.smallbear.studs.model.Manager;
import com.smallbear.studs.util.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BuildingsDao {
    public List<Buildings> getAllBuilding(){
        int defaultLimit = 100;
        int defaultOffSet = 100;
        return this.getAllBuilding(defaultLimit, defaultOffSet);
    }

    public List<Buildings> getAllBuilding(int limit, int offset){
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "SELECT * FROM `Buildings` LIMIT ? OFFSET ?";
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, limit);
            preparedStatement.setInt(2, offset);
            resultSet = preparedStatement.executeQuery();
            List<Buildings> buildingsList = new ArrayList<>();
            while (resultSet.next()) {
                String id = resultSet.getString("id");
                String name = resultSet.getString("name");
                Buildings dataBuildings = new Buildings(id, name);
                buildingsList.add(dataBuildings);
            }
            return buildingsList;
        } catch (SQLException e) {
            e.fillInStackTrace();
        } finally {
            DBUtil.closeResource(resultSet, preparedStatement, connection);
        }
        return null;
    }

}

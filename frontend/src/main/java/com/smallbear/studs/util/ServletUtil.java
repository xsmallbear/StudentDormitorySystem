package com.smallbear.studs.util;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

public class ServletUtil {
    public static void sendJsonDataToResponse(HttpServletResponse response, Object data) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        PrintWriter out = response.getWriter();
        out.print(mapper.writeValueAsString(data));
        out.flush();
    }


    /**
     * 读取request中 body中的内容
     */
    public static JsonNode readRequestBody(HttpServletRequest request) throws IOException {

        String contentType = request.getHeader("Content-Type");
        if (contentType == null || !contentType.contains("application/json")) {
            throw new IllegalArgumentException("请求头不是JSON格式");
        }

        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }
        reader.close();
        JsonNode jsonNode = new ObjectMapper().readTree(stringBuilder.toString());
        if (jsonNode == null || jsonNode.isNull() || !jsonNode.isObject()) {
            //error
            throw new IllegalArgumentException("请求参数错误");
        }
        return jsonNode;
    }
}

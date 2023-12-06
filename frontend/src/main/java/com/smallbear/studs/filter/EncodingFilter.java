package com.smallbear.studs.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class EncodingFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        String encoding = "UTF-8";
        servletRequest.setCharacterEncoding(encoding);
        servletResponse.setCharacterEncoding(encoding);
        servletResponse.setContentType("application/json;charset=" + encoding);

        HttpServletResponse response = (HttpServletResponse) servletResponse;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Max-Age", "3600");
        filterChain.doFilter(servletRequest, servletResponse);
    }
}

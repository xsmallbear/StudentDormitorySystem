package com.smallbear.studs.middleware;

import jakarta.servlet.*;

import java.io.IOException;

public class EncodingFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        String encoding = "UTF-8";
        servletRequest.setCharacterEncoding(encoding);
        servletResponse.setCharacterEncoding(encoding);
        servletResponse.setContentType("text/html;charset=" + encoding);

        System.out.println("CALL FILTER");

        // 继续处理请求
        filterChain.doFilter(servletRequest, servletResponse);
    }
}

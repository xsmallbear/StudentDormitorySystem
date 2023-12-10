package com.smallbear.studs.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.logging.Logger;

public class LoggingFilter implements Filter {

    private static final Logger logger = Logger.getLogger(LoggingFilter.class.getName());

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String method = request.getMethod();
        String requestURI = request.getRequestURI();

        logger.info("REQUEST: " + method + " " + requestURI);

        filterChain.doFilter(servletRequest, servletResponse);
    }
}

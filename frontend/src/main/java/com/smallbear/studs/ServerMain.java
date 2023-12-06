package com.smallbear.studs;

import com.smallbear.studs.servlet.LoginApi;
import com.smallbear.studs.filter.EncodingFilter;
import jakarta.servlet.DispatcherType;
import org.eclipse.jetty.ee10.servlet.ServletContextHandler;
import org.eclipse.jetty.server.Connector;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;

import java.util.EnumSet;

public class ServerMain {
    public static void main(String[] args) throws Exception {
        Server server = new Server(8080);
        Connector connector = new ServerConnector(server);
        server.addConnector(connector);

        ServletContextHandler servletContext = new ServletContextHandler();
        servletContext.setContextPath("/api");

        servletContext.addServlet(LoginApi.class, "/login");

        servletContext.addFilter(EncodingFilter.class,"/*", EnumSet.of(DispatcherType.REQUEST));

        server.setHandler(servletContext);

        server.start();
        server.join();
    }
}